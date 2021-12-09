var mysqlLib = require('../../connection/mysql_connection')

const GET_Notification = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var in_id_pengirim = obj.id_pengirim;
    var in_id_penerima = obj.id_penerima;
    mysqlLib.executeQuery(`
    SELECT DATE_FORMAT(a.CREATE_DATE, '%d-%m-%Y, %H:%i:%s') AS CREATE_DATE,
    IF((SELECT NAMA_PERUSAHAAN FROM m_user WHERE ID_USER = a.ID_PENGIRIM)='-',(SELECT NAMA_PENANGGUNG_JAWAB FROM m_user WHERE ID_USER = a.ID_PENGIRIM),(SELECT NAMA_PERUSAHAAN FROM m_user WHERE ID_USER = a.ID_PENGIRIM)) AS PENGIRIM,
    IF((SELECT NAMA_PERUSAHAAN FROM m_user WHERE ID_USER = a.ID_PENERIMA)='-',(SELECT NAMA_PENANGGUNG_JAWAB FROM m_user WHERE ID_USER = a.ID_PENERIMA),(SELECT NAMA_PERUSAHAAN FROM m_user WHERE ID_USER = a.ID_PENERIMA)) AS PENERIMA,
    a.PENGIRIM AS SUBJECT,
    a.KETERANGAN
    FROM m_log a
    WHERE (a.ID_PENGIRIM = '${in_id_penerima}' OR a.ID_PENGIRIM = '${in_id_pengirim}') AND (a.ID_PENERIMA = '${in_id_pengirim}' OR a.ID_PENERIMA = '${in_id_penerima}')
    ORDER BY a.ID DESC LIMIT 0,20;
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

const INS_Notifications = (req, res) => {
    var obj = JSON.parse(JSON.stringify(req.body));
    var id_pengirim = obj.id_pengirim;
    var id_penerima = obj.id_penerima;
    var pengirim = obj.pengirim;
    var keterangan = obj.keterangan;
    // var create_date = obj.create_date;

    mysqlLib.executeQuery("REPLACE INTO m_log VALUES('', '" + id_pengirim + "', '" + id_penerima + "', '" + pengirim + "', '" + keterangan + "', NOW());")
        .then((d) => {
            console.log(d.affectedRows);
            if (d.affectedRows == 1) {
                res.status(200).json({
                    status: res.statusCode,
                    message: "Pesan Terkirim",
                    data: ""
                })
            }
            else {
                res.status(200).json({
                    status: res.statusCode,
                    message: "Pesan Tidak Terkirim",
                    data: ""
                })
            }

        }).catch(e => {
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: e.stack
            })
        });
}

module.exports = {
    GET_Notification,
    INS_Notifications
}