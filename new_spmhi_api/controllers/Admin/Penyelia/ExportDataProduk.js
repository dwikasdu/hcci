var mysqlLib = require('../../../connection/mysql_connection')

// READ SEMUA
const ExportDataProduk = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT
        d.ID_USER,

        -- IF(ROW_NUMBER() OVER (PARTITION BY a.KODE_BARANG) = 1, d.NAMA_PERUSAHAAN, '') AS NAMA_PERUSAHAAN,
        -- IF(ROW_NUMBER() OVER (PARTITION BY a.KODE_BARANG) = 1, a.KODE_BARANG, '') AS KODE_BARANG,
        -- IF(ROW_NUMBER() OVER (PARTITION BY a.KODE_BARANG) = 1, a.CONTENT, '') AS NAMA_PRODUK,

        d.NAMA_PERUSAHAAN,
        a.KODE_BARANG,
        a.CONTENT AS NAMA_PRODUK,

        b.BAHAN_BAKU AS NAMA_BAHAN,
        IFNULL(b.PRODUSEN, '-') AS PRODUSEN,
        b.PEMASOK,
        IFNULL(b.ALAMAT_PEMASOK, '-') AS ALAMAT_PEMASOK,
        IFNULL(b.SERTIFIKAT_HALAL, '-') AS KODE_SERTIFIKAT,
        IFNULL(b.EXPIRED_DATE_SERTIFIKAT, '-') AS EXPIRED_DATE_SERTIFIKAT,
        IFNULL(b.MERK, '-') AS MERK,
        IFNULL(b.PRODUSEN, '-') AS PRODUSEN,
        IFNULL(b.LEMBAGA_PENERBIT, '-') AS LEMBAGA_PENERBIT,
        IFNULL(b.KETERANGAN, '-') AS KETERANGAN,
        (SELECT IF(v.STATUS_BAHAN_BAKU RLIKE '3','HARAM',IF(v.STATUS_BAHAN_BAKU RLIKE '0','-',IF(v.STATUS_BAHAN_BAKU RLIKE '2','RAGU-RAGU','HALAL'))) AS STATUS_BARANG FROM (SELECT a.KODE_BARANG, a.NAMA_BARANG, GROUP_CONCAT(a.STATUS) AS STATUS_BAHAN_BAKU FROM bill_of_materials a WHERE a.KODE_BARANG = a.KODE_BARANG GROUP BY a.KODE_BARANG) v WHERE v.KODE_BARANG = a.KODE_BARANG ) AS STATUS

        FROM m_produk a
        INNER JOIN bill_of_materials b ON a.KODE_BARANG=b.KODE_BARANG
        INNER JOIN m_user d ON a.ID_USER=d.ID_USER
        WHERE d.ID_USER = '${req.query.id_user}'
        `).then((m_produk) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: m_produk
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

const ExportStepProduksi = (req, res) => {

    mysqlLib.executeQuery(`
        SELECT
        d.ID_USER,

        -- IF(ROW_NUMBER() OVER (PARTITION BY a.KODE_BARANG) = 1, d.NAMA_PERUSAHAAN, '') AS NAMA_PERUSAHAAN,
        -- IF(ROW_NUMBER() OVER (PARTITION BY a.KODE_BARANG) = 1, a.KODE_BARANG, '') AS KODE_BARANG,
        -- IF(ROW_NUMBER() OVER (PARTITION BY a.KODE_BARANG) = 1, a.CONTENT, '') AS NAMA_PRODUK,

        d.NAMA_PERUSAHAAN,
        a.KODE_BARANG,
        a.CONTENT AS NAMA_PRODUK,

        c.STEP AS STEP_KE,
        c.KETERANGAN AS TAHAPAN_PEROSES
        FROM m_produk a
        INNER JOIN m_user d ON a.ID_USER = d.ID_USER
        INNER JOIN m_step_produksi c ON a.KODE_BARANG = c.KODE_BARANG
        WHERE d.ID_USER = '${req.query.id_user}'
        `).then((m_step_produksi) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: m_step_produksi
        })
    })
        .catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: error.stack
            })
        })
}

const GetDataPengajuanExport = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT * FROM m_pengajuan_export_data WHERE ID_PENYELIA LIKE '%${req.query.id_user}' ORDER BY NAMA_PENYELIA,ID DESC
        `).then((d) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: d
        })
    })
        .catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: error.stack
            })
        })
}

const INS_DataPengajuanExport = (req, res) => {
    for (let i = 0; i < req.body.data.length; i++) {
        const item = req.body.data[i];
        mysqlLib.executeQuery(`
        REPLACE INTO m_pengajuan_export_data
        VALUES(
        NULL,
        '${item.ID_PENYELIA}',
        '${item.NAMA_PENYELIA}',
        '${item.ID_USER}',
        '${item.NAMA_PERUSAHAAN}',
        '${item.IS_AKTIF}',
        '${item.CONTENT}',
        NOW()
        )
        `)
            .then((d) => { })
            .catch(error => {
                console.log(error);
                res.status(505).json({
                    status: res.statusCode,
                    authentication: false,
                    message: error.stack
                })
            })
    }
    res.status(200).json({
        status: res.statusCode,
        message: "Sukses"
    })
}

const VerifikasiExportData = (req, res) => {
    mysqlLib.executeQuery(`
        UPDATE m_pengajuan_export_data SET IS_AKTIF = '1' WHERE ID = '${req.query.id}'
        `).then((d) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses"
        })
    })
        .catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: error.stack
            })
        })
}

const DEL_PengajuanExportData = (req, res) => {
    mysqlLib.executeQuery(`
        DELETE FROM m_pengajuan_export_data WHERE ID = '${req.query.id}'
        `).then((d) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses"
        })
    })
        .catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: error.stack
            })
        })
}

module.exports = {
    ExportDataProduk,
    ExportStepProduksi,
    GetDataPengajuanExport,
    INS_DataPengajuanExport,
    VerifikasiExportData,
    DEL_PengajuanExportData
}