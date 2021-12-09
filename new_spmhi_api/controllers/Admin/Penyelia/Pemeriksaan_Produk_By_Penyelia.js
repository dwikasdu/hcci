var mysqlLib = require('../../../connection/mysql_connection')

function excecuteTodatabas(keterangan, status, sertifikat_halal, id, res) {
    mysqlLib.executeQuery(`
        UPDATE bill_of_materials 
        SET KETERANGAN = '${keterangan}',
        STATUS = '${status}',
        SERTIFIKAT_HALAL = '${sertifikat_halal}' 
        WHERE ID = '${id}';
        `).then((d) => { });
}

const Pemeriksaan_Produk_By_Penyelia = async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    for (let i = 0; i < obj.data.length; i++) {
        var id = obj.data[i].id_bahan_baku;
        var status = obj.data[i].data_status;
        var keterangan = obj.data[i].keterangan;
        var sertifikat_halal = obj.data[i].sertifikat_halal;
        console.log({ "keterangan": keterangan, "sertifikat_halal": sertifikat_halal, "status": status, "id": id });
        await excecuteTodatabas(keterangan, status, sertifikat_halal, id, res)
    }

    res.status(200).json({
        status: res.statusCode,
        message: "Sukses"
    })
}

const Pemeriksaan_Produk_Kunjungan = async (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var id_pelaku_usaha = obj.id_pelaku_usaha;

    for (let i = 0; i < obj.data.length; i++) {
        var id = obj.data[i].id_bahan_baku;
        var status = obj.data[i].data_status;
        var keterangan = obj.data[i].keterangan;
        var sertifikat_halal = obj.data[i].sertifikat_halal;
        console.log({ "keterangan": keterangan, "sertifikat_halal": sertifikat_halal, "status": status, "id": id });
        await excecuteTodatabas(keterangan, status, sertifikat_halal, id, res)
    }
    await mysqlLib.executeQuery(`
    UPDATE m_kunjungan SET IS_KUNJUNGAN = '1',UPDATE_DATE = NOW() WHERE ID_USER = '${id_pelaku_usaha}';
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
    Pemeriksaan_Produk_By_Penyelia,
    Pemeriksaan_Produk_Kunjungan
}