var mysqlLib = require('../../connection/mysql_connection')

const CEK_StepProses = (req, res) => {
    var ID_USER = req.params.id_user;
    mysqlLib.executeQuery("CALL CEK_STEP_PROSES('" + ID_USER + "');").then((d) => {
        res.status(200).json({
            message: "Sukses",
            status: res.statusCode,
            data: parseInt(d[0][0].STEP)
        });
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
    CEK_StepProses
}