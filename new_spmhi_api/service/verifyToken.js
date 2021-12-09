const jwt = require('jsonwebtoken')
const config = require('../config.json')

const verifyBearerToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        token = token.split(" ")[1];
        jwt.verify(token, config.token.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (user) {
                req.user = user;
                next();
            } else if (err.message === "jwt expired") {
                console.log("Masa aktif jwt telah habis.");
                return res.status(401).json({
                    status: res.statusCode,
                    success: false,
                    authentication: false,
                    message: "Masa aktif jwt telah habis.",
                });
            } else {
                console.log("JWT tidak ditemukan");
                return res.status(401).json({
                    status: res.statusCode,
                    authentication: false,
                    message: 'JWT tidak ditemukan!',
                })
            }
        });
    } catch (error) {
        return res.status(401).json({
            status: res.statusCode,
            authentication: false,
            message: 'Invalid Token Error!',
        })
    }
}

const verifyToken = (req, res, next) => {
    var token = req.body.accessToken;
    jwt.verify(token, config.token.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (user) {
            req.user = user;
            return res.json({
                status: res.statusCode,
                authentication: true
            });
        } else if (err.message === "jwt expired") {
            return res.status(401).json({
                status: res.statusCode,
                authentication: false,
                message: "Access token expired"
            });
        } else {
            return res.status(401).json({
                status: res.statusCode,
                authentication: false,
            })
        }
    });
}

module.exports = {
    verifyBearerToken,
    verifyToken
}