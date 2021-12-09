var mysqlLib = require('../../connection/mysql_connection')

// READ SEMUA
const CekProfileQRCode = (req, res) => {
    mysqlLib.executeQuery(`
    SELECT a.NOMOR_SERTIFIKAT, a.KODE_USER, b.NAMA_PERUSAHAAN as NAMA_USAHA, KODE_BARANG,
    IF(a.IS_TOKO = 1,"-",IF(a.IS_TAMPILKAN_PRODUK = 1, a.NAMA_BARANG, a.JENIS_PRODUK)) as NAMA_BARANG, 
    IS_TOKO, IS_TAMPILKAN_PRODUK, b.NAMA_PENANGGUNG_JAWAB, b.NAMA_PEMILIK
    FROM cetak_sertifikat a INNER JOIN m_user b ON a.KODE_USER = b.ID_USER 
    WHERE a.KODE_USER = '${req.query.id_user}' AND a.NOMOR_SERTIFIKAT = '${req.query.kode_sertifikat}';
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
    CekProfileQRCode
}