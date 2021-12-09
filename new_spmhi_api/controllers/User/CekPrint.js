var mysqlLib = require('../../connection/mysql_connection')

const GET_StatusPrint = (req, res) => {
    var IN_ID_USER = req.params.id_user;
    mysqlLib.executeQuery("SELECT CEK_PRINT_OUT_BY_ID_USER(" + IN_ID_USER + ") AS status;").then((d) => {
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

const GET_TampilanPrint = (req, res) => {
    var IN_ID_USER = req.params.id_user;
    mysqlLib.executeQuery("SELECT CEK_TAMPILAN_AWAL('" + IN_ID_USER + "') AS status;").then((d) => {
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
    GET_StatusPrint,
    GET_TampilanPrint
}