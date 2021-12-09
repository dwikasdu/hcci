var mysqlLib = require('../connection/mysql_connection')

const GoogleMapsLocationUMKM = (req, res) => {
    mysqlLib.executeQuery("SELECT ID_USER, NAMA_PERUSAHAAN, EMAIL, NOMOR_TELEPON, ALAMAT, LATTITUDE, LONGITUDE FROM m_user WHERE JABATAN = '1';").then((d) => {
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


const GoogleMapsLocationUMKMbyID = (req, res) => {
    mysqlLib.executeQuery(`SELECT ID_USER, NAMA_PERUSAHAAN, EMAIL, NOMOR_TELEPON, ALAMAT, LATTITUDE, LONGITUDE FROM m_user WHERE ID_USER = '${req.query.id_user}';`).then((d) => {
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
    GoogleMapsLocationUMKM,
    GoogleMapsLocationUMKMbyID
}