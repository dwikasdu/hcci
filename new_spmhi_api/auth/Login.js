const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.json')
let refreshTokens = [];

var mysqlLib = require('../connection/mysql_connection')

const login = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT a.ID_USER, a.USERNAME, a.PASSWORD,
        (SELECT EMAIL FROM m_user WHERE ID_USER = a.ID_PENYELIA) AS EMAIL_PENYELIA,
        a.EMAIL, a.JABATAN, a.NAMA_PERUSAHAAN, a.ALAMAT, a.IS_AKTIF,
        a.NAMA_PENANGGUNG_JAWAB, a.ID_PENYELIA FROM m_user a
        WHERE a.EMAIL = '${req.body.email_or_username}'
        OR a.USERNAME = '${req.body.email_or_username}';
    `)
        .then(async (auth) => {
            if (auth.length > 0) {
                var password = auth[0].PASSWORD;
                var id_user = auth[0].ID_USER;
                var nama_perusahaan = auth[0].NAMA_PERUSAHAAN;
                var role = auth[0].JABATAN;
                var nama_penanggung_jawab = auth[0].NAMA_PENANGGUNG_JAWAB;
                var id_penyelia = auth[0].ID_PENYELIA;
                var alamat = auth[0].ALAMAT;
                var is_aktif = auth[0].IS_AKTIF;

                // if password exist
                const validPwd = await bcrypt.compare(req.body.password, password)
                if (!validPwd) return res.status(201).json({
                    status: res.statusCode,
                    authentication: false,
                    message: 'Gagal Login Cek Kembali username & password!'
                })

                const isAktif = (aktif) => {
                    switch (aktif) {
                        case 0:
                            return "tidak_aktif";
                        case 1:
                            return "aktif";
                        default:
                            return "tidak_aktif";
                    }
                }

                const inJabatan = (steps) => {
                    switch (steps) {
                        case 1:
                            return "user";
                        case 2:
                            return "admin_penyelia";
                        case 3:
                            return "super_admin";
                        default:
                            return 0;
                    }
                }

                var statusAktif = isAktif(is_aktif);
                let roleAkses = '';
                if (statusAktif !== 'aktif') {
                    roleAkses = statusAktif;
                } else {
                    roleAkses = inJabatan(role);
                }
                console.log("role", roleAkses);

                // if emai or username exist
                // if (auth[0].IS_VERIFIED !== 1) return res.status(200).json({
                //     authentication: false,
                //     message: 'Email anda belum terverifikasi. Silahkan verifikasi email anda terlebih dahulu!'
                // })

                // generate token menggunkan JWT
                let accessToken = jwt.sign({ nama_perusahaan: nama_perusahaan, id_user: id_user, roles: roleAkses, status: isAktif(is_aktif), alamat: alamat }, config.token.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "1d" });
                let refreshToken = jwt.sign({ nama_perusahaan: nama_perusahaan, id_user: id_user, roles: roleAkses, status: isAktif(is_aktif), alamat: alamat }, config.token.REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "1d" });
                refreshTokens.push(refreshToken);
                // =================================== //
                res.cookie('auth-token', accessToken, { maxAge: 86200 })
                res.cookie('refresh-token', refreshToken, { maxAge: 86200 * 7000 })
                res.status(200).json({
                    message: 'Sukses',
                    status: res.statusCode,
                    authentication: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    data: {
                        ID_USER: id_user,
                        NAMA_PERUSAHAAN: nama_perusahaan,
                        roles: roleAkses,
                        status: isAktif(is_aktif),
                        nama_penanggung_jawab: nama_penanggung_jawab,
                        id_penyelia: id_penyelia,
                        alamat: alamat,
                        email_penyelia: auth[0].EMAIL_PENYELIA
                    }
                })
            } else {
                res.status(201).json({
                    status: res.statusCode,
                    authentication: false,
                    message: "Gagal Login Cek Kembali username & password!"
                })
            }
        })
        .catch(e => {
            console.log(e);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: e.stack
            })
        });
}

const refresh = (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.json({ success: false, message: "Sesi anda telah habis silahkan login kembali." });
    }

    // ini jika tokennya valid maka akan membuat akses token baru ketika refresh halaman.
    jwt.verify(refreshToken, config.token.REFRESH_TOKEN_SECRET, (err, user) => {
        if (!err) {
            // console.log(user);
            const accessToken = jwt.sign({ nama_perusahaan: user.nama_perusahaan, id_user: user.id_user, roles: user.roles, status: user.status, alamat: user.alamat }, config.token.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256',
                expiresIn: "1d"
            });
            return res.json({ success: true, accessToken, data: user });
        } else {
            return res.json({
                success: false,
                message: "Invalid refresh token"
            });
        }
    });
}

module.exports = {
    login,
    refresh
}
// ============= Login =========== //
    // body row JSON
    // {
    //     "email_or_username": "hartomy@gmail.com",
    //     "password": "12345678"
    // }