const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.json')

const { welcomeEmailRegister } = require('../service/send_email')

var mysqlLib = require('../connection/mysql_connection')


const register = async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var ID_USER = obj.id_user;
    var USERNAME = obj.username.replace("'", "");
    var PASSWORD = obj.password.replace("'", "");
    var NAMA_PERUSAHAAN = obj.nama_perusahaan.replace("'", "");
    var ALAMAT = obj.alamat.replace("'", "");
    var PROVINSI = obj.provinsi.replace("'", "");
    var KABUPATEN_KOTA = obj.kabupaten.replace("'", "");
    var NOMOR_TELEPON = obj.no_telpon.replace("'", "");
    var EMAIL = obj.email;
    var NAMA_PENANGGUNG_JAWAB = obj.nama_penanggungjawab.replace("'", "");
    var NOMOR_TELEPON_PENANGGUNG_JAWAB = obj.nomor_telpon_penanggungjawab;
    var EMAIL_PENANGGUNG_JAWAB = obj.email_penanggungjawab.replace("'", "");
    var JABATAN = obj.jabatan;
    var IS_STAFF = obj.is_staff;
    var IS_AKTIF = obj.is_aktif;
    var CREATE_DATE = obj.create_date;
    var CREATE_DATE = obj.create_date;
    var LAST_UPDATE = obj.last_update;
    var OTORISATOR = obj.otorisator;
    var LATTITUDE = obj.lattitude;
    var LONGITUDE = obj.longitude;
    var ID_PENYELIA = obj.id_penyelia;
    var NAMA_KOMUNITAS = obj.komunitas.replace("'", "");
    var INFORMASI_DARI = obj.informasi_dari.replace("'", "");
    var INFORMASI_LAINNYA = obj.informasi_lainnya.replace("'", "");
    var NAMA_OR_MERK_PRODUK = obj.nama_or_merk_produk.replace("'", "");
    var JENIS_PRODUK = obj.jenis_produk.replace("'", "");
    var NAMA_PEMILIK = obj.nama_pemilik.replace("'", "");
    var ALAMAT_PEMILIK = obj.alamat_pemilik.replace("'", "");
    var NOMOR_HP_PEMILIK = obj.nomor_hp_pemilik;
    var ALAMAT_PENANGGUNGJAWAB_HALAL = obj.alamat_penanggungjawab_halal.replace("'", "");
    var DAERAH_PEMASARAN = obj.daerah_pemasaran.replace("'", "");
    var SISTEM_PEMASARAN = obj.sistem_pemasaran.replace("'", "");
    var NOMOR_LAPAK = obj.nomor_lapak.replace("'", "");
    var LOKASI_LAPAK = obj.lokasi_lapak.replace("'", "");

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(PASSWORD, salt)


    mysqlLib.executeQuery(`
    SELECT (SELECT 1 AS USERNAME FROM m_user WHERE USERNAME = '${USERNAME}') AS USERNAME,
    (SELECT 1 AS EMAIL FROM m_user WHERE EMAIL = '${EMAIL}') AS EMAIL
    FROM m_user LIMIT 0,1;
    `).then((user) => {
        if (user.length > 0) {

            if (user[0].USERNAME === 1) return res.status(201).json({
                status: res.statusCode,
                isRegistered: false,
                message: 'Username Yang Anda Gunakan Sudah Terdaftar !'
            })

            if (user[0].EMAIL === 1) return res.status(201).json({
                status: res.statusCode,
                isRegistered: false,
                message: 'Email Yang Anda Gunakan Sudah Terdaftar !'
            })
            // Eksekusi Register
            mysqlLib.executeQuery(`
                REPLACE INTO m_user VALUES (
                    'GET_ID_USER()',
                    '${USERNAME}',
                    '${hashPassword}',
                    '${NAMA_PERUSAHAAN}',
                    '${ALAMAT}',
                    '${PROVINSI}',
                    '${KABUPATEN_KOTA}',
                    '${NOMOR_TELEPON}',
                    '${EMAIL}',
                    '${NAMA_PENANGGUNG_JAWAB}',
                    '${NOMOR_TELEPON_PENANGGUNG_JAWAB}',
                    '${EMAIL_PENANGGUNG_JAWAB}',
                    '1',
                    '0',
                    '1',
                    NOW(),
                    '${LAST_UPDATE}',
                    '${OTORISATOR}',
                    '${LATTITUDE}',
                    '${LONGITUDE}',
                    GET_PENYELIA(),
                    '${NAMA_KOMUNITAS}',
                    '${INFORMASI_DARI}',
                    '${INFORMASI_LAINNYA}',
                    '${NAMA_OR_MERK_PRODUK}',
                    '${JENIS_PRODUK}',
                    '${NAMA_PEMILIK}',
                    '${ALAMAT_PEMILIK}',
                    '${NOMOR_HP_PEMILIK}',
                    '${ALAMAT_PENANGGUNGJAWAB_HALAL}',
                    '${DAERAH_PEMASARAN}',
                    '${SISTEM_PEMASARAN}',
                    '${NOMOR_LAPAK}',
                    '${LOKASI_LAPAK}'
                )
            `)
                .then((d) => {
                    if (d.affectedRows == 1) {
                        res.status(200).json({
                            status: res.statusCode,
                            isRegistered: true,
                            message: 'Data Berhasi Disimpan!'
                        })
                        setTimeout(() => {
                            welcomeEmailRegister(EMAIL, res)
                        }, 2000);
                    }
                    else {
                        res.status(200).json({
                            status: res.statusCode,
                            isRegistered: false,
                            message: 'Data gagal disimpan'
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.status(505).json({
                        status: res.statusCode,
                        isRegistered: false,
                        message: error.stack
                    })
                })
        }
    })
}

const verifikasiEmailToken = (req, res) => {
    try {
        const validMail = jwt.verify(req.params.token, config.token.VERIFY_TOKEN_SECRET)
        mysqlLib.executeQuery("SELECT EMAIL FROM `m_user` WHERE EMAIL = '" + validMail.email + "';")
            .then((verify) => {
                if (verify.length == 1) {
                    mysqlLib.executeQuery("UPDATE `m_user` SET IS_VERIFIED = '1' WHERE EMAIL = '" + validMail.email + "';")
                        .then((d) => {
                            res.status(200).json({
                                status: res.statusCode,
                                message: 'Email Telah di verifikasi!',
                                isVerified: true,
                                data: verify
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(505).json({
                                status: res.statusCode,
                                isVerified: false,
                                message: error.stack
                            })
                        })
                } else {
                    res.status(200).json({
                        status: res.statusCode,
                        isVerified: false,
                        message: 'Email Anda Salah!'
                    })
                }
            })
    } catch (error) {
        res.status(200).json({
            status: res.statusCode,
            isVerified: false,
            message: 'Email Anda Salah!'
        })
    }
}

module.exports = {
    register,
    verifikasiEmailToken
}
// ============= Register =========== //
    // body row JSON
    // {
    //     "username": "hartomy",
    //     "email": "hartomy@gmail.com",
    //     "password": "12345678",
    //     "nama": "tomy",
    //     "website": "www.hartomy.com",
    //     "lattitude": "",
    //     "longitude": ""
    // }