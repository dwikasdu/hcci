var mysqlLib = require('../connection/mysql_connection')

const GET_Produk_Halal = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT CONTENT, 
        KODE_SERTIFIKAT, NAMA_PRODUSEN, 
        DATE_FORMAT(EXPIRED_DATE, '%d-%m-%Y') AS EXPIRED_DATE 
        FROM m_bahan_baku 
        ORDER BY KODE_SERTIFIKAT DESC;
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

// Render Produk Positif list berdasarkan halaman dari jumlah index database
// @params /api/ProdukHalalMUI?page=1&numPerPage=10
const paginationProdukMUI = (req, res) => {

    let page
    let numPerPage
    var limitfirst
    //var numPerPage = 20;
    mysqlLib.executeQuery(`SELECT count(*) AS numRows FROM m_bahan_baku;`).then((d) => {
        if (d.length > 0) {
            var numRows = d[0].numRows;
            // console.log(numRows)
            // var numPages = Math.ceil(numRows / numPerPage);
            // console.log(numPages)
            if (page == '' || numPerPage == '') {
                page = 0;
                numPerPage = 10;
                limitfirst = page
            }
            else {
                page = parseInt(req.query.page)
                numPerPage = parseInt(req.query.numPerPage)
                limitfirst = (page - 1) * numPerPage;
            }
            var limit = limitfirst + ',' + numPerPage;
            let sql = `SELECT CONTENT, KODE_SERTIFIKAT, NAMA_PRODUSEN, 
                        DATE_FORMAT(EXPIRED_DATE, '%d-%m-%Y') AS EXPIRED_DATE
                        FROM m_bahan_baku 
                        ORDER BY EXPIRED_DATE DESC LIMIT ${limit}`
            mysqlLib.executeQuery(sql).then((results) => {
                res.status(200).json({
                    status: res.statusCode,
                    message: "Sukses",
                    page: page,
                    result: numRows,
                    data: results
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
    }).catch(e => {
        console.log(e);
        res.status(505).json({
            status: res.statusCode,
            authentication: false,
            message: e.stack
        })
    });
}



// Mencari Produk Positif list berdasarkan halaman dari jumlah index yang dicari
// @params /api/ProdukHalalMUI?search=KATA_YG_DICARI&page=1&numPerPage=10
const searchProdukMUI = (req, res) => {
    let querySearch = req.query.search;

    let page
    let numPerPage
    var limitfirst
    mysqlLib.executeQuery(`
        SELECT COUNT(*) AS numRows FROM m_bahan_baku 
        WHERE CONTENT LIKE '%${querySearch}%' OR 
        KODE_SERTIFIKAT LIKE '%${querySearch}%'
    `).then((d) => {
        if (d.length > 0) {
            var numRows = d[0].numRows;

            if (page == '' || numPerPage == '') {
                page = 0;
                numPerPage = 10;
                limitfirst = page
            }
            else {
                page = parseInt(req.query.page)
                numPerPage = parseInt(req.query.numPerPage)
                limitfirst = (page - 1) * numPerPage;
            }
            var limit = limitfirst + ',' + numPerPage;
            let sql = `SELECT CONTENT, KODE_SERTIFIKAT, NAMA_PRODUSEN, 
                        DATE_FORMAT(EXPIRED_DATE, '%d-%m-%Y') AS EXPIRED_DATE
                        FROM m_bahan_baku WHERE CONTENT LIKE '%${querySearch}%' 
                        OR KODE_SERTIFIKAT LIKE '%${querySearch}%' 
                        ORDER BY EXPIRED_DATE DESC LIMIT ${limit}`
            mysqlLib.executeQuery(sql).then((results) => {
                res.status(200).json({
                    status: res.statusCode,
                    message: "Sukses",
                    page: page,
                    result: numRows,
                    data: results
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
    GET_Produk_Halal,
    paginationProdukMUI,
    searchProdukMUI
}