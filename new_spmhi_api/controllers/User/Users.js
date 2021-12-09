var mysqlLib = require('../../connection/mysql_connection')
const bcrypt = require('bcryptjs')

// READ SEMUA
const users = (req, res) => {
    mysqlLib.executeQuery("SELECT * FROM `m_user`")
        .then((data) => {
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

// READ DENGAN ID
const userById = (req, res) => {
    mysqlLib.executeQuery(`
    SELECT
    IFNULL((SELECT NAMA_PENANGGUNG_JAWAB FROM m_user WHERE ID_USER = a.ID_PENYELIA),'-') AS PENYELIA,
    a.*
    FROM m_user a
    WHERE ID_USER = '${req.params.id}'
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

// UPDATE DENGAN ID
const updateUser = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var ID_USER = obj.ID_USER;
    var USERNAME = obj.USERNAME;
    var PASSWORD = obj.PASSWORD;
    var NAMA_PERUSAHAAN = obj.NAMA_PERUSAHAAN;
    var NAMA_PEMILIK = obj.NAMA_PEMILIK;
    var ALAMAT_PEMILIK = obj.ALAMAT_PEMILIK;
    var NOMOR_HP_PEMILIK = obj.NOMOR_HP_PEMILIK;
    var ALAMAT = obj.ALAMAT;
    var PROVINSI = obj.PROVINSI;
    var KABUPATEN_KOTA = obj.KABUPATEN_KOTA;
    var NOMOR_TELEPON = obj.NOMOR_TELEPON;
    var EMAIL = obj.EMAIL;
    var NAMA_PENANGGUNG_JAWAB = obj.NAMA_PENANGGUNG_JAWAB;
    var NOMOR_TELEPON_PENANGGUNG_JAWAB = obj.NOMOR_TELEPON_PENANGGUNG_JAWAB;
    var EMAIL_PENANGGUNG_JAWAB = obj.EMAIL_PENANGGUNG_JAWAB;
    var ALAMAT_PENANGGUNGJAWAB_HALAL = obj.ALAMAT_PENANGGUNGJAWAB_HALAL;
    var JABATAN = obj.JABATAN;
    var IS_STAFF = obj.IS_STAFF;
    var IS_AKTIF = obj.IS_AKTIF;
    var CREATE_DATE = obj.CREATE_DATE;
    var LAST_UPDATE = obj.LAST_UPDATE;
    var OTORISATOR = obj.OTORISATOR;
    var LATTITUDE = obj.LATTITUDE;
    var LONGITUDE = obj.LONGITUDE;
    var ID_PENYELIA = obj.ID_PENYELIA;
    var NAMA_KOMUNITAS = obj.NAMA_KOMUNITAS;
    var INFORMASI_DARI = obj.INFORMASI_DARI;
    var INFORMASI_LAINNYA = obj.INFORMASI_LAINNYA;
    var NAMA_OR_MERK_PRODUK = obj.NAMA_OR_MERK_PRODUK;
    var JENIS_PRODUK = obj.JENIS_PRODUK;
    var DAERAH_PEMASARAN = obj.DAERAH_PEMASARAN;
    var SISTEM_PEMASARAN = obj.SISTEM_PEMASARAN;
    var NOMOR_LAPAK = obj.NOMOR_LAPAK;
    var LOKASI_LAPAK = obj.LOKASI_LAPAK;

    // Eksekusi Register
    mysqlLib.executeQuery(`
                UPDATE m_user SET
                NAMA_PERUSAHAAN = '${NAMA_PERUSAHAAN}',
                NAMA_PEMILIK = '${NAMA_PEMILIK}',
                ALAMAT_PEMILIK = '${ALAMAT_PEMILIK}',
                NOMOR_HP_PEMILIK = '${NOMOR_HP_PEMILIK}',
                ALAMAT = '${ALAMAT}',
                NOMOR_TELEPON = '${NOMOR_TELEPON}',
                EMAIL = '${EMAIL}',
                NAMA_PENANGGUNG_JAWAB = '${NAMA_PENANGGUNG_JAWAB}',
                NOMOR_TELEPON_PENANGGUNG_JAWAB = '${NOMOR_TELEPON_PENANGGUNG_JAWAB}',
                EMAIL_PENANGGUNG_JAWAB = '${EMAIL_PENANGGUNG_JAWAB}',
                ALAMAT_PENANGGUNGJAWAB_HALAL = '${ALAMAT_PENANGGUNGJAWAB_HALAL}',
                LAST_UPDATE = NOW(),
                NAMA_KOMUNITAS = '${NAMA_KOMUNITAS}',
                NAMA_OR_MERK_PRODUK = '${NAMA_OR_MERK_PRODUK}',
                JENIS_PRODUK = '${JENIS_PRODUK}',
                DAERAH_PEMASARAN = '${DAERAH_PEMASARAN}',
                SISTEM_PEMASARAN = '${SISTEM_PEMASARAN}',
                NOMOR_LAPAK = '${NOMOR_LAPAK}',
                LOKASI_LAPAK = '${LOKASI_LAPAK}'
                WHERE ID_USER = '${ID_USER}';
            `).then((data) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Update Sukses",
            data: ""
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

// DELETE DENGAN ID
const deleteUserById = (req, res) => {
    mysqlLib.executeQuery("DELETE FROM `m_user` WHERE ID_USER = '" + req.params.id + "'")
        .then((data) => {
            res.status(200).json({
                status: res.statusCode,
                message: "Sukses"
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

const get_id_password = (req, res) => {
    mysqlLib.executeQuery("SELECT ID_USER, PASSWORD FROM `m_user`").then((data) => {
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

const encrypt_password = async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var jumlah_data = obj.data.length;
    for (var i = 0; i < jumlah_data; i++) {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        var ID_USER = obj.data[i].ID_USER;
        var PASSWORD = await bcrypt.hash(obj.data[i].PASSWORD, salt);

        mysqlLib.executeQuery("UPDATE `m_user` SET PASSWORD = '" + PASSWORD + "' WHERE ID_USER = '" + ID_USER + "';")
            .then((data) => {
                res.status(200).json({
                    status: res.statusCode,
                    message: "Data Berhasil Disimpan",
                    data: ""
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
}

module.exports = {
    users,
    userById,
    updateUser,
    deleteUserById,
    get_id_password,
    encrypt_password
}