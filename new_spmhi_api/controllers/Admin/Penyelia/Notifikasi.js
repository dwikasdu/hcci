var mysqlLib = require('../../../connection/mysql_connection')

// READ SEMUA
const Get_Notifikasi_Admin = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT  
        a.ID_PENGIRIM,
        IFNULL((SELECT NAMA_PERUSAHAAN FROM m_user WHERE ID_USER = a.ID_PENGIRIM), '') AS PENGIRIM,
        a.ID_PENERIMA,
        MAX(a.KETERANGAN) AS KETERANGAN,
        DATE_FORMAT(MAX(a.CREATE_DATE), '%d-%m-%Y, %H:%i:%s') AS TANGGAL
        FROM m_log a
        WHERE a.ID_PENERIMA LIKE '%${req.query.id}'
        GROUP BY a.ID_PENGIRIM
        ORDER BY MAX(a.CREATE_DATE) DESC LIMIT 0,50;
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
    Get_Notifikasi_Admin
}