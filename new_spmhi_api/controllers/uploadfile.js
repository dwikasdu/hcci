var mysqlLib = require('../connection/mysql_connection');
var multer = require('multer');
const path = require("path");

const upload_bukti_pembayaran = (req, res) => {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/bukti-pembayaran");
        },
        filename: function (req, file, cb) {
            // console.log(req.body);
            console.log("file", file);
            var filetype = '';
            if (file.mimetype === 'image/gif') {
                filetype = 'gif';
            }
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            let nama_file = path.parse(file.originalname).name
            cb(
                null,
                "infaq-user-" + req.body.id_user +
                "-" + nama_file.replace(' ', '-') +
                "-" + Date.now() + '.' + filetype
            );
        },
    });

    var upload = multer({ storage: storage }).single('photo')
    upload(req, res, function (err) {
        // url gambar
        var finalImageURL = req.protocol + "://" + req.get("host") + "/images/bukti-pembayaran/" + req.file.filename;
        // var image = { image: finalImageURL };

        var obj = JSON.parse(JSON.stringify(req.body));
        var id_user = obj.id_user;
        var atas_nama = obj.atas_nama;
        var nominal = obj.nominal;
        var otorisator = obj.otorisator;
        var id_penyelia = obj.id_penyelia;
        var all_data = { id_user, atas_nama, nominal, otorisator, id_penyelia, image: finalImageURL }
        // console.log("", all_data);

        // update nomor kode m_produk
        mysqlLib.executeQuery("UPDATE m_produk SET KODE_BUKTI_TRANSFER = GET_KODE_UPLOAD() WHERE ID_USER = '" + id_user + "' AND KODE_BUKTI_TRANSFER = '';").then((d) => {
            var code = 200;
            //console.log("Bukti pembayaran terkirim", code);
        }).catch(e => {
            console.log(e.Stack, 500, e);
        });

        // insert bukti pembayaran
        mysqlLib.executeQuery("REPLACE INTO m_upload_bukti_transfer VALUES(NULL, '" + id_user + "', '" + atas_nama + "', '" + nominal + "', '" + finalImageURL + "', NOW(), '" + otorisator + "', GET_KODE_UPLOAD());").then((d) => {
            var code = 200;
            console.log("Bukti pembayaran terkirim", code);
        }).catch(e => {
            console.log(e.Stack, 500, e);
        });


        // insert log telah bayar
        mysqlLib.executeQuery("REPLACE INTO m_log VALUES(NULL, '" + id_user + "', '" + id_penyelia + "', 'PELAKU', 'Bukti pembayaran telah dikirim....', NOW());").then((d) => {
            var code = 200;
            console.log("Log bukti pembayaran", code);
        }).catch(e => {
            console.log(e.Stack, 500, e);
        });

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).json({ status: res.statusCode, message: "Sukses", data: all_data })
    })

}

const GET_Bukti_Pembayaran = (req, res) => {
    var IN_ID_USER = req.params.id_user;
    mysqlLib.executeQuery(`
        SELECT ID, ATAS_NAMA, NOMINAL, FILE, DATE_FORMAT(CREATE_DATE, '%d-%m-%Y, %H:%i:%s') AS DATE
        FROM m_upload_bukti_transfer 
        where ID_USER = '${IN_ID_USER}'
        ORDER BY CREATE_DATE DESC LIMIT 0,10;
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
    upload_bukti_pembayaran,
    GET_Bukti_Pembayaran
}