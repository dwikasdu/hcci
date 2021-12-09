const jwt = require('jsonwebtoken')
const config = require('../config.json')

const roleAkses = (permissions) => {
    return (req, res, next) => {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        jwt.verify(token, config.token.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (user) {
                req.user = user;
                const jabatan = user.roles;
                if (permissions.includes(jabatan)) {
                    next()
                } else {
                    console.log("Upps.. Role Anda tidak memiliki akses di halaman ini!");
                    return res.status(401).json({
                        status: res.statusCode,
                        roleAkses: false,
                        message: "Anda tidak memiliki akses di halaman ini!"
                    })
                }
            }
        });
    }
}

module.exports = {
    roleAkses
}