var mysqlLib = require('../../connection/mysql_connection')

const INS_Pendampingan = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var ID_USER = obj.id_user;
    var KODE_BARANG = obj.kode_barang;
    var NAMA_PRODUK = obj.nama_produk;
    var FLAG = obj.flag;
    var OTORISATOR = obj.otorisator;
    var KETERANGAN = obj.keterangan;
    mysqlLib.executeQuery("REPLACE INTO m_pendampingan VALUE('','" + ID_USER + "','" + KODE_BARANG + "','" + NAMA_PRODUK + "','" + FLAG + "',NOW(),'" + OTORISATOR + "','" + KETERANGAN + "');")
        .then((d) => {
            res.status(200).json({
                status: res.statusCode,
                message: "Sukses",
                data: d
            })
        }).catch(e => {
            console.log(e);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: e.stack
            })
        });
}

const CEK_Pendampingan = (req, res) => {
    var ID_USER = req.params.id_user;
    mysqlLib.executeQuery("CALL CEK_PENDAMPINGAN_BY_ID_USER('" + ID_USER + "');")
        .then((d) => {
            res.status(200).json({
                status: res.statusCode,
                message: "Sukses",
                data: d
            })
        }).catch(e => {
            console.log(e);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: e.stack
            })
        });
}

module.exports = {
    INS_Pendampingan,
    CEK_Pendampingan
}