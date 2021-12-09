var mysqlLib = require('../../../connection/mysql_connection')

const GET_Total_Umkm = (req, res) => {
    mysqlLib.executeQuery(`
    SELECT 
        GET_TOTAL_UMKM('%') AS TOTAL_SEMUA_UMKM,
        GET_TOTAL_UMKM('${req.body.id_penyelia}') AS TOTAL_UMKM,
        GET_TOTAL_PRODUK('${req.body.id_penyelia}') AS TOTAL_PRODUK,
        GET_TOTAL_KUNJUNGAN('${req.body.tahun}','${req.body.bulan}','${req.body.id_penyelia}') AS TOTAL_KUNJUNGAN,
        GET_TOTAL_REALISASI_KUNJUNGAN('${req.body.tahun}','${req.body.bulan}','${req.body.id_penyelia}') AS TOTAL_REALISASI_KUNJUNGAN;
    `).then((d) => {
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

const GET_Jumlah_Umkm_per_bulan = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT 
        IF(v.BULAN RLIKE '1','JANUARI',
        IF(v.BULAN RLIKE '2','FEBRUARI',
        IF(v.BULAN RLIKE '3','MARET',
        IF(v.BULAN RLIKE '4','APRIL',
        IF(v.BULAN RLIKE '5','MEI',
        IF(v.BULAN RLIKE '6','JUNI',
        IF(v.BULAN RLIKE '7','JULI',
        IF(v.BULAN RLIKE '8','AGUSTUS',
        IF(v.BULAN RLIKE '9','SEPTEMBER',
        IF(v.BULAN RLIKE '10','OKTOBER',
        IF(v.BULAN RLIKE '11','NOVEMBER',
        'DESEMBER'
        ))))))))))) AS MONTH,
        v.REGISTERED
        FROM
        (
        SELECT a.ID_USER,
        a.JABATAN, 
        a.CREATE_DATE,
        COUNT(*) AS REGISTERED,
        GROUP_CONCAT(MONTH(a.CREATE_DATE)) AS BULAN
        FROM m_user a
        WHERE a.JABATAN < 2
        GROUP BY MONTH(a.CREATE_DATE)
        ) v
        WHERE YEAR(CREATE_DATE) = '${req.params.tahun}';
    `).then((d) => {
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
    GET_Total_Umkm,
    GET_Jumlah_Umkm_per_bulan
}