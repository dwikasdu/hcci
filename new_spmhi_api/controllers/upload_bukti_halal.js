
var mysqlLib = require('../connection/mysql_connection');
var multer = require('multer');
const path = require("path");

const upload_bukti_halal = (req, res) => {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/bukti-halal");
        },
        filename: function (req, file, cb) {
            // console.log(req);
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
                "bahan-baku-user-" + req.body.id_user +
                "-" + nama_file.replace(' ', '-') +
                "-" + Date.now() + '.' + filetype
            );
        },
    });

    var upload = multer({ storage: storage }).single('photo_bahan')
    upload(req, res, function (err) {
        // url gambar
        var finalImageURL = req.protocol + "://" + req.get("host") + "/images/bukti-halal/" + req.file.filename;
        // var image = { image: finalImageURL };

        var obj = JSON.parse(JSON.stringify(req.body));
        var id_user = obj.id_user;
        var nama_barang = obj.nama_barang;
        var kode_barang = obj.kode_barang;
        var otorisator = obj.otorisator;
        var id_penyelia = obj.id_penyelia;
        var all_data = { id_user, nama_barang, kode_barang, otorisator, id_penyelia, image: finalImageURL }

        // insert bukti pembayaran
        mysqlLib.executeQuery("REPLACE INTO `m_upload_bukti_bahan_baku` VALUES('','" + id_user + "','" + kode_barang + "','" + nama_barang + "','" + finalImageURL + "',NOW(),'" + otorisator + "');").then((d) => {
            var code = 200;
            console.log("Bukti pembayaran terkirim", code);
        }).catch(e => {
            console.log(e.Stack, 500, e);
        });

        // insert log telah bayar
        mysqlLib.executeQuery("REPLACE INTO m_log VALUES('', '" + id_user + "', '" + id_penyelia + "', 'PELAKU', 'Gambar Bahan baku " + nama_barang + " sudah dikirim...', NOW());").then((d) => {
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

const GET_Bukti_Halala = (req, res) => {
    var IN_ID_USER = req.params.id_user;
    mysqlLib.executeQuery(`
        SELECT ID, KODE_BARANG, NAMA_BARANG, FILE, DATE_FORMAT(CREATE_DATE, '%d-%m-%Y, %H:%i:%s') AS DATE
        FROM m_upload_bukti_bahan_baku
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
    upload_bukti_halal,
    GET_Bukti_Halala
}