var mysqlLib = require('../../connection/mysql_connection')

const GET_MasterBillOfMaterials = (req, res) => {
    var IN_KODE_BARANG = req.params.kode_barang;
    mysqlLib.executeQuery(`
    SELECT 
    b.ID_USER AS id_user,
    (SELECT d.FILE FROM m_upload_bukti_bahan_baku d WHERE d.KODE_BARANG = a.ID ORDER BY d.CREATE_DATE DESC LIMIT 0,1) AS gambar_bukti_halal,
    b.CONTENT AS kontent,
    a.ID AS id_bahan_baku, 
    a.KODE_BARANG AS in_kode_barang,
    a.BAHAN_BAKU AS bahan_baku, 
    IFNULL(a.MERK,'-') AS merk, 
    IFNULL(a.PRODUSEN,'-') AS produsen,
    a.PEMASOK AS pemasok,
    a.ALAMAT_PEMASOK AS alamat_pemasok, 
    IFNULL(a.LEMBAGA_PENERBIT,'-') AS lembaga_penerbit, 
    IF(a.SERTIFIKAT_HALAL RLIKE 'undefined', '-',  IFNULL(a.SERTIFIKAT_HALAL,'-')) AS sertifikat_halal, 
    IF(a.EXPIRED_DATE_SERTIFIKAT RLIKE '0000-00-00', '-',  IFNULL(a.EXPIRED_DATE_SERTIFIKAT,'-')) AS expired_date_sertifikat,
    (CASE a.STATUS WHEN '0' THEN 'SEDANG PROSES' WHEN '1' THEN 'HALAL' WHEN '2' THEN 'RAGU-RAGU' ELSE 'HARAM' END) AS STATUS,
    a.STATUS AS data_status,
    a.KETERANGAN AS keterangan
    FROM m_produk b
    INNER JOIN
    bill_of_materials a
    ON b.KODE_BARANG=a.KODE_BARANG
    WHERE a.KODE_BARANG = '${IN_KODE_BARANG}'
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

const GET_MBOMByUserId = (req, res) => {
    var IN_ID_USER = req.params.id_user;
    mysqlLib.executeQuery(`
    SELECT 
    b.ID_USER AS id_user,
    (SELECT d.FILE FROM m_upload_bukti_bahan_baku d WHERE d.KODE_BARANG = a.ID ORDER BY d.CREATE_DATE DESC LIMIT 0,1) AS gambar_bukti_halal,
    b.CONTENT AS kontent,
    a.ID AS id_bahan_baku, 
    a.KODE_BARANG AS in_kode_barang,
    a.BAHAN_BAKU AS bahan_baku, 
    IFNULL(a.MERK,'-') AS merk, 
    IFNULL(a.PRODUSEN,'-') AS produsen,
    a.PEMASOK AS pemasok,
    a.ALAMAT_PEMASOK AS alamat_pemasok, 
    IFNULL(a.LEMBAGA_PENERBIT,'-') AS lembaga_penerbit, 
    IF(a.SERTIFIKAT_HALAL RLIKE 'undefined', '-',  IFNULL(a.SERTIFIKAT_HALAL,'-')) AS sertifikat_halal, 
    IF(a.EXPIRED_DATE_SERTIFIKAT RLIKE '0000-00-00', '-',  IFNULL(a.EXPIRED_DATE_SERTIFIKAT,'-')) AS expired_date_sertifikat,
    (CASE a.STATUS WHEN '0' THEN 'SEDANG PROSES' WHEN '1' THEN 'HALAL' WHEN '2' THEN 'RAGU-RAGU' ELSE 'HARAM' END) AS STATUS
    FROM m_produk b
    INNER JOIN
    bill_of_materials a
    ON b.KODE_BARANG=a.KODE_BARANG
    WHERE b.ID_USER = '${IN_ID_USER}'
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

const INS_MasterBillOfMaterials = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var ID = obj.id;
    var IN_KODE_BARANG = obj.in_kode_barang;
    var IN_CONTENT = obj.kontent;
    var IN_ID_USER = obj.id_user;
    var IN_STATUS = obj.status;
    var IN_KETERANGAN = obj.keterangan;
    //  var IN_CREATE_DATE = obj.create_date;
    var IN_OTORISATOR = obj.otorisator;
    var IN_ID = obj.id_bahan_baku;
    var IN_BAHAN_BAKU = obj.bahan_baku;
    var IN_PEMASOK = obj.pemasok;
    var IN_ALAMAT_PEMASOK = obj.alamat_pemasok;
    var IN_KETERANGAN_BOM = obj.keterangan_bom;
    var IN_STATUS_BAHAN_BAKU = obj.status_bahan_baku;
    var IN_SERTIFIKAT_HALAL = obj.sertifikat_halal;
    var IS_LOCKED = obj.is_locked;
    var IN_MERK = obj.merk;
    var IN_PRODUSEN = obj.produsen;
    var IN_LEMBAGA_PENERBIT = obj.lembaga_penerbit;
    var IN_EXPIRED_DATE_SERTIFIKAT = obj.expired_date_sertifikat;

    mysqlLib.executeQuery(`
    CALL INS_M_PRODUK_BOM( 
        '${IN_KODE_BARANG}', 
        '${IN_CONTENT}', 
        '${IN_ID_USER}', 
        '${IN_STATUS}', 
        '${IN_KETERANGAN}', 
        NOW(), 
        '${IN_OTORISATOR}', 
        '${IN_ID}', 
        '${IN_BAHAN_BAKU}', 
        '${IN_PEMASOK}', 
        '${IN_ALAMAT_PEMASOK}', 
        '${IN_KETERANGAN_BOM}', 
        '${IN_STATUS_BAHAN_BAKU}', 
        '${IN_SERTIFIKAT_HALAL}',
        '${IS_LOCKED}', 
        '${IN_MERK}', 
        '${IN_PRODUSEN}', 
        '${IN_LEMBAGA_PENERBIT}', 
        '${IN_EXPIRED_DATE_SERTIFIKAT}'
    );`).then((d) => {
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

const UPDATE_MasterBillOfMaterials = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var IN_ID = obj.id_bahan_baku,
        BAHAN_BAKU = obj.bahan_baku,
        PEMASOK = obj.pemasok,
        ALAMAT_PEMASOK = obj.alamat_pemasok,
        SERTIFIKAT_HALAL = obj.sertifikat_halal,
        MERK = obj.merk,
        PRODUSEN = obj.produsen,
        LEMBAGA_PENERBIT = obj.lembaga_penerbit,
        EXPIRED_DATE_SERTIFIKAT = obj.expired_date_sertifikat;

    mysqlLib.executeQuery(`
        UPDATE bill_of_materials 
        SET 
        BAHAN_BAKU = '${BAHAN_BAKU}', 
        PEMASOK = '${PEMASOK}',
        ALAMAT_PEMASOK = '${ALAMAT_PEMASOK}', 
        KETERANGAN = '',
        STATUS = '0', 
        SERTIFIKAT_HALAL = '${SERTIFIKAT_HALAL}',
        MERK = '${MERK}', 
        PRODUSEN = '${PRODUSEN}',
        LEMBAGA_PENERBIT = '${LEMBAGA_PENERBIT}', 
        EXPIRED_DATE_SERTIFIKAT = '${EXPIRED_DATE_SERTIFIKAT}'
        WHERE ID = '${IN_ID}';
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

const DEL_MasterBillOfMaterials = (req, res) => {
    var id_produk = req.params.id_produk;
    mysqlLib.executeQuery(`DELETE FROM bill_of_materials WHERE ID = '${id_produk}'`).then((d) => {
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
    GET_MasterBillOfMaterials,
    GET_MBOMByUserId,
    INS_MasterBillOfMaterials,
    UPDATE_MasterBillOfMaterials,
    DEL_MasterBillOfMaterials
}