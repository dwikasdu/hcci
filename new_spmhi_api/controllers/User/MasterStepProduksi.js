var mysqlLib = require('../../connection/mysql_connection')

const GET_StepProduksi = (req, res) => {
    var IN_KODE_BARANG = req.params.kode_barang;
    mysqlLib.executeQuery(`
        SELECT 
        b.ID_USER AS id_user, 
        a.ID AS id_in_step, 
        a.KODE_BARANG AS in_kode_barang, 
        a.STEP AS step_ke, 
        a.KETERANGAN AS step_keterangan 
        FROM m_produk b
        INNER JOIN
        m_step_produksi a
        ON b.KODE_BARANG=a.KODE_BARANG
        WHERE a.KODE_BARANG = '${IN_KODE_BARANG}'
        ORDER BY a.STEP
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

const GET_StepProduksiByUserId = (req, res) => {
    var IN_ID_USER = req.params.id_user;
    mysqlLib.executeQuery(`
        SELECT 
        b.ID_USER AS id_user, 
        a.ID AS id_in_step, 
        a.KODE_BARANG AS in_kode_barang, 
        a.STEP AS step_ke, 
        a.KETERANGAN AS step_keterangan 
        FROM m_produk b
        INNER JOIN
        m_step_produksi a
        ON b.KODE_BARANG=a.KODE_BARANG
        WHERE b.ID_USER = '${IN_ID_USER}'
        ORDER BY a.STEP
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

const INS_StepProduksi = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var IN_KODE_BARANG = obj.in_kode_barang;
    var INS_STEP_KE = obj.step_ke;
    var IN_KETERANGAN = obj.keterangan;
    var IN_OTORISATOR = obj.otorisator;

    mysqlLib.executeQuery("REPLACE INTO m_step_produksi VALUES('','" + IN_KODE_BARANG + "','" + INS_STEP_KE + "','" + IN_KETERANGAN + "',NOW(),'','" + IN_OTORISATOR + "')")
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

const UPDATE_StepProduksi = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var IN_ID = obj.id_in_step;
    var INS_STEP_KE = obj.step_ke;
    var IN_KETERANGAN = obj.step_keterangan;
    var IN_OTORISATOR = obj.otorisator;

    mysqlLib.executeQuery("UPDATE m_step_produksi SET STEP = '" + INS_STEP_KE + "', KETERANGAN = '" + IN_KETERANGAN + "', UPDATE_DATE = NOW(), OTORISATOR = '" + IN_OTORISATOR + "' WHERE ID = '" + IN_ID + "';")
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

const DEL_StepProduksi = (req, res) => {
    var id_step = req.params.id_step;
    mysqlLib.executeQuery("DELETE FROM m_step_produksi WHERE ID = '" + id_step + "'")
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
    GET_StepProduksi,
    GET_StepProduksiByUserId,
    INS_StepProduksi,
    UPDATE_StepProduksi,
    DEL_StepProduksi
}