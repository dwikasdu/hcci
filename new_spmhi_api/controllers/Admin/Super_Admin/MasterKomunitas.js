var mysqlLib = require('../../../connection/mysql_connection')
var multer = require('multer');
const path = require("path");

// READ SEMUA
const GetMasterKomunitas = (req, res) => {
    mysqlLib.executeQuery(`SELECT * FROM m_komunitas;`).then((data) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: data
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

//INSERT M_KOMUNITAS
const INS_MasterKomunitas = (req, res) => {

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/images/logo");
        },
        filename: function (req, file, cb) {
            // console.log("file", file);
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

            if (file.fieldname === 'logo1') {
                cb(
                    null,
                    "logo1-" + req.body.IN_NAMA_KOMUNITAS.replace(' ', '-') + "-" +
                    nama_file.replace(' ', '-') + "-" +
                    Date.now() + '.' + filetype
                );
            } else if (file.fieldname === 'logo2') {
                cb(
                    null,
                    "logo2-" + req.body.IN_NAMA_KOMUNITAS.replace(' ', '-') + "-" +
                    nama_file.replace(' ', '-') + "-" +
                    Date.now() + '.' + filetype
                );
            }
        },
    });

    var upload = multer({ storage: storage }).fields([{
        name: 'logo1', maxCount: 1
    }, {
        name: 'logo2', maxCount: 1
    }])
    upload(req, res, function (err) {
        // url gambar
        var Logo1 = req.protocol + "://" + req.get("host") + "/images/logo/" + req.files.logo1[0].filename;
        var Logo2 = req.protocol + "://" + req.get("host") + "/images/logo/" + req.files.logo2[0].filename;

        var obj = JSON.parse(JSON.stringify(req.body));
        var IN_ID = obj.IN_ID;
        var IN_NAMA_KOMUNITAS = obj.IN_NAMA_KOMUNITAS;
        var IN_KETERANGAN = obj.IN_KETERANGAN;
        var LOGO1 = Logo1;
        var LOGO2 = Logo2;
        var IN_KETERANGAN_KOP_SERTIFIKAT_1 = obj.IN_KETERANGAN_KOP_SERTIFIKAT_1;
        var IN_KETERANGAN_KOP_SERTIFIKAT_2 = obj.IN_KETERANGAN_KOP_SERTIFIKAT_2;
        var IN_IS_AKTIF = obj.IN_IS_AKTIF;
        var all_data = { IN_ID, IN_NAMA_KOMUNITAS, IN_KETERANGAN, LOGO1, LOGO2, IN_KETERANGAN_KOP_SERTIFIKAT_1, IN_KETERANGAN_KOP_SERTIFIKAT_2 }
        // console.log(all_data);

        // insert m_komunitas
        mysqlLib.executeQuery("REPLACE INTO m_komunitas VALUES('" + IN_ID + "','" + IN_NAMA_KOMUNITAS + "','" + IN_KETERANGAN + "','','" + LOGO1 + "','" + IN_KETERANGAN_KOP_SERTIFIKAT_1 + "','" + LOGO2 + "','" + IN_KETERANGAN_KOP_SERTIFIKAT_2 + "','0','" + IN_IS_AKTIF + "');")
            .then((d) => { }).catch(e => {
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

const DEL_MasterKomunitas = (req, res) => {
    var id_komunitas = req.query.id_komunitas;
    mysqlLib.executeQuery("DELETE FROM m_komunitas WHERE ID = '" + id_komunitas + "'")
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
    GetMasterKomunitas,
    INS_MasterKomunitas,
    DEL_MasterKomunitas
}