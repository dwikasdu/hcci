const bcrypt = require('bcryptjs')
const { notifEmailUbahPassword } = require('../service/send_email')

var mysqlLib = require('../connection/mysql_connection')

const ubahPassword = (req, res) => {
    var id_user = req.params.id;
    var last_password = req.body.last_password;
    var new_password = req.body.new_password;
    try {
        mysqlLib.executeQuery("SELECT PASSWORD, EMAIL, NAMA_PERUSAHAAN, NAMA_PENANGGUNG_JAWAB, NAMA_PEMILIK FROM m_user WHERE ID_USER = '" + id_user + "';").then(async (user) => {
            var password = '';
            var email = '';
            var nama_perusahaan = '';
            var nama_penanggung_jawab = '';
            var nama_pemilik = '';
            if (user[0] !== undefined) {
                password = user[0].PASSWORD
                email = user[0].EMAIL
                nama_perusahaan = user[0].NAMA_PERUSAHAAN
                nama_penanggung_jawab = user[0].NAMA_PENANGGUNG_JAWAB
                nama_pemilik = user[0].NAMA_PEMILIK
            }
            // if password exist
            const validPwd = await bcrypt.compare(last_password, password)
            if (!validPwd) return res.status(200).json({
                status: res.statusCode,
                message: 'Password Sebelumnya Tidak Sesuai!',
                isRegistered: false
            })
            // Hash Password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(new_password, salt)

            mysqlLib.executeQuery("UPDATE `m_user` SET PASSWORD = '" + hashPassword + "' WHERE ID_USER = '" + id_user + "';")
                .then((d) => {
                    notifEmailUbahPassword(email, {
                        nama_perusahaan: user[0].NAMA_PERUSAHAAN,
                        nama_penanggung_jawab: user[0].NAMA_PENANGGUNG_JAWAB,
                        nama_pemilik: user[0].NAMA_PEMILIK
                    }, res)
                }).catch(error => {
                    console.log(error);
                    res.status(505).json({
                        status: res.statusCode,
                        isRegistered: false,
                        message: error.stack
                    })
                })
        })
    } catch (error) {
        res.status(200).json({ status: res.statusCode, message: 'Invalid Token !' })
    }
}

module.exports = {
    ubahPassword
}