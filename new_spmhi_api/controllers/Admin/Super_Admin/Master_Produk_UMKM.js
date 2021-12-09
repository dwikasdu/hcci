var mysqlLib = require('../../../connection/mysql_connection')

// READ SEMUA
const GET_Jumlah_Semua_Status_Produk = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT 
        v.JUMLAH,
        v.STATUS,
        IF(v.STATUS_BAHAN_BAKU RLIKE '3','HARAM',
        IF(v.STATUS_BAHAN_BAKU RLIKE '0','SEDANG PROSES',
        IF(v.STATUS_BAHAN_BAKU RLIKE '2','RAGU-RAGU','HALAL'))) AS STATUS_BARANG
        FROM (
            SELECT 
            a.KODE_BARANG,
            a.STATUS,
            COUNT(a.STATUS) AS JUMLAH,
            GROUP_CONCAT(a.STATUS) AS STATUS_BAHAN_BAKU
            FROM bill_of_materials a
            GROUP BY a.STATUS
        ) v
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


module.exports = {
    GET_Jumlah_Semua_Status_Produk
}