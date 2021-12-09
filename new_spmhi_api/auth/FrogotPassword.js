
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { verifikasiEmailLupaPassword, notifEmailUbahPassword } = require('../service/send_email')
const config = require('../config.json')

var mysqlLib = require('../connection/mysql_connection')


const lupaPassword = (req, res) => {
    mysqlLib.executeQuery("SELECT NAMA_PERUSAHAAN, NAMA_PENANGGUNG_JAWAB, NAMA_PEMILIK, 1 AS exist FROM m_user WHERE EMAIL = '" + req.body.email + "';")
        .then((auth) => {
            if (auth.length > 0) {
                verifikasiEmailLupaPassword(req.body.email, auth, res)
            }
        })
}

const cekExpiredUbahPassword = (req, res) => {
    var cek_token = req.params.token; // token diambil dari parameter url dari kiriman email 
    try {
        jwt.verify(cek_token, config.token.VERIFY_TOKEN_SECRET, async (err, user) => {
            if (user) {
                req.user = user;
                res.status(200).json({
                    status: res.statusCode,
                    message: 'Kode Autentikasi terhubung!',
                    isVerified: true
                })
            } else if (err.message === "jwt expired") {
                return res.status(200).json({
                    status: res.statusCode,
                    isVerified: false,
                    message: 'Kode Autentikasi Expired!',
                });
            } else {
                return res.status(200).json({
                    status: res.statusCode,
                    isVerified: false,
                    message: 'Invalid Token 2!',
                })
            }
        });
    } catch (error) {
        return res.status(200).json({
            status: res.statusCode,
            isVerified: false,
            message: 'Invalid Token !',
        })
    }
}

const ubahLupaPassword = async (req, res) => {
    var param_token = req.body.param_token; // token diambil dari parameter url dari kiriman email 
    var token = req.body.token; // token diambil dari data cek lupa password
    var password = req.body.password;
    try {
        const validMail = jwt.verify(param_token, config.token.VERIFY_TOKEN_SECRET)
        const getEmail = jwt.verify(token, config.token.UBAH_PWD_SECRET)
        if (getEmail.email == validMail.email) {
            // Hash Password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            mysqlLib.executeQuery("UPDATE `m_user` SET PASSWORD = '" + hashPassword + "' WHERE EMAIL = '" + validMail.email + "';")
                .then((d) => {
                    notifEmailUbahPassword(validMail.email, getEmail, res)
                })
                .catch(error => {
                    console.log(error);
                    res.status(505).json({
                        status: res.statusCode,
                        isRegistered: false,
                        message: error.stack
                    })
                })
        } else {
            res.status(200).json({
                status: res.statusCode,
                message: 'Kode Autentikasi Expired!',
                isVerified: false
            })
        }
    } catch (error) {
        res.status(200).json({
            status: res.statusCode,
            message: 'Kode Autentikasi Tidak Sesuai!',
            isVerified: false
        })
    }
}

module.exports = {
    lupaPassword,
    cekExpiredUbahPassword,
    ubahLupaPassword
}
