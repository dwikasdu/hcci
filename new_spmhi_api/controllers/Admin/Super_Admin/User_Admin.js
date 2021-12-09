var mysqlLib = require('../../../connection/mysql_connection')
const bcrypt = require('bcryptjs')
const { welcomeEmailRegister } = require('../../../service/send_email')

// READ SEMUA
const UserAdmin = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT ID_USER, NAMA_PENANGGUNG_JAWAB, ALAMAT,
        NOMOR_TELEPON_PENANGGUNG_JAWAB, 
        USERNAME, EMAIL, PASSWORD,
        (CASE JABATAN WHEN '2' THEN 'PENYELIA' WHEN '3' THEN 'SUPER PENYELIA' ELSE 'USER' END) AS JABATAN
        FROM m_user WHERE JABATAN NOT LIKE '1'
    `).then((data) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: data
        })
    }).catch(error => {
        console.log(error);
        res.status(505).json({
            status: res.statusCode,
            authentication: false,
            message: error.stack
        })
    })
}

const Update_user_penyelia = async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var ID_USER = obj.ID_USER;
    var USERNAME = obj.USERNAME.replace("'", "");
    var PASSWORD = obj.PASSWORD;
    var ALAMAT = obj.ALAMAT.replace("'", "");
    var EMAIL = obj.EMAIL;
    var NAMA_PENANGGUNG_JAWAB = obj.NAMA_PENANGGUNG_JAWAB.replace("'", "");
    var NOMOR_TELEPON_PENANGGUNG_JAWAB = obj.NOMOR_TELEPON_PENANGGUNG_JAWAB;
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(PASSWORD, salt)
    mysqlLib.executeQuery(`
    SELECT (SELECT 1 AS PASSWORD FROM m_user WHERE PASSWORD = '${PASSWORD}') AS PASSWORD
    FROM m_user LIMIT 0,1;
    `).then((pwd) => {
        if (pwd.length > 0) {
            if (pwd[0].PASSWORD === 1) {
                mysqlLib.executeQuery(`
                UPDATE m_user SET 
                USERNAME = '${USERNAME}',
                ALAMAT = '${ALAMAT}',
                EMAIL = '${EMAIL}',
                NAMA_PENANGGUNG_JAWAB = '${NAMA_PENANGGUNG_JAWAB}',
                NOMOR_TELEPON_PENANGGUNG_JAWAB = '${NOMOR_TELEPON_PENANGGUNG_JAWAB}'
                WHERE ID_USER = '${ID_USER}';
            `).then((data) => {
                    res.status(200).json({
                        status: res.statusCode,
                        authentication: true,
                        message: "Sukses",
                        data: data
                    })
                })
            } else {
                mysqlLib.executeQuery(`
                UPDATE m_user SET 
                USERNAME = '${USERNAME}',
                PASSWORD = '${hashPassword}',
                ALAMAT = '${ALAMAT}',
                EMAIL = '${EMAIL}',
                NAMA_PENANGGUNG_JAWAB = '${NAMA_PENANGGUNG_JAWAB}',
                NOMOR_TELEPON_PENANGGUNG_JAWAB = '${NOMOR_TELEPON_PENANGGUNG_JAWAB}'
                WHERE ID_USER = '${ID_USER}';
            `).then((data) => {
                    res.status(200).json({
                        status: res.statusCode,
                        ubahPassword: true,
                        message: "Sukses",
                        data: data
                    })
                })
            }
        }
    })
}

const register_penyelia = async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    // var ID_USER = obj.ID_USER;
    var USERNAME = obj.USERNAME.replace("'", "");
    var PASSWORD = obj.PASSWORD;
    // var NAMA_PERUSAHAAN = obj.NAMA_PERUSAHAAN.replace("'", "");
    var ALAMAT = obj.ALAMAT.replace("'", "");
    // var PROVINSI = obj.PROVINSI.replace("'", "");
    // var KABUPATEN_KOTA = obj.KABUPATEN_KOTA.replace("'", "");
    // var NOMOR_TELEPON = obj.NOMOR_TELEPON.replace("'", "");
    var EMAIL = obj.EMAIL;
    var NAMA_PENANGGUNG_JAWAB = obj.NAMA_PENANGGUNG_JAWAB.replace("'", "");
    var NOMOR_TELEPON_PENANGGUNG_JAWAB = obj.NOMOR_TELEPON_PENANGGUNG_JAWAB;
    // var EMAIL_PENANGGUNG_JAWAB = obj.EMAIL_PENANGGUNG_JAWAB.replace("'", "");
    // var JABATAN = obj.JABATAN;
    // var IS_STAFF = obj.IS_STAFF;
    // var IS_AKTIF = obj.IS_AKTIF;
    // var CREATE_DATE = obj.CREATE_DATE;
    // var CREATE_DATE = obj.CREATE_DATE;
    // var LAST_UPDATE = obj.LAST_UPDATE;
    // var OTORISATOR = obj.OTORISATOR;
    // var LATTITUDE = obj.LATTITUDE;
    // var LONGITUDE = obj.LONGITUDE;
    // var ID_PENYELIA = obj.ID_PENYELIA;
    // var NAMA_KOMUNITAS = obj.NAMA_KOMUNITAS.replace("'", "");
    // var INFORMASI_DARI = obj.INFORMASI_DARI.replace("'", "");
    // var INFORMASI_LAINNYA = obj.INFORMASI_LAINNYA.replace("'", "");
    // var NAMA_OR_MERK_PRODUK = obj.NAMA_OR_MERK_PRODUK.replace("'", "");
    // var JENIS_PRODUK = obj.JENIS_PRODUK.replace("'", "");
    // var NAMA_PEMILIK = obj.NAMA_PEMILIK.replace("'", "");
    // var ALAMAT_PEMILIK = obj.ALAMAT_PEMILIK.replace("'", "");
    // var NOMOR_HP_PEMILIK = obj.NOMOR_HP_PEMILIK;
    // var ALAMAT_PENANGGUNGJAWAB_HALAL = obj.ALAMAT_PENANGGUNGJAWAB_HALAL.replace("'", "");
    // var DAERAH_PEMASARAN = obj.DAERAH_PEMASARAN.replace("'", "");
    // var SISTEM_PEMASARAN = obj.SISTEM_PEMASARAN.replace("'", "");
    // var NOMOR_LAPAK = obj.NOMOR_LAPAK.replace("'", "");
    // var LOKASI_LAPAK = obj.LOKASI_LAPAK.replace("'", "");

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
                    '-',
                    '${ALAMAT}',
                    '-',
                    '-',
                    '${NOMOR_TELEPON_PENANGGUNG_JAWAB}',
                    '${EMAIL}',
                    '${NAMA_PENANGGUNG_JAWAB}',
                    '${NOMOR_TELEPON_PENANGGUNG_JAWAB}',
                    '-',
                    '2',
                    '1',
                    '1',
                    NOW(),
                    '-',
                    'SUPER ADMIN',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-',
                    '-'
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


module.exports = {
    UserAdmin,
    Update_user_penyelia,
    register_penyelia
}