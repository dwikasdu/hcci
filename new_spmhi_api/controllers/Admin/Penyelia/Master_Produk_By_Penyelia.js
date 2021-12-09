var mysqlLib = require('../../../connection/mysql_connection')

// READ SEMUA
const Master_Produk_By_Penyelia = (req, res) => {
    mysqlLib.executeQuery(`
    SELECT b.NAMA_PERUSAHAAN, a.KODE_BARANG, a.CONTENT, 
        a.ID_USER, 
        GET_STATUS_BARANG(a.KODE_BARANG) AS STATUS, 
        a.KETERANGAN, 
        DATE_FORMAT(a.CREATE_DATE, '%d-%m-%Y') AS DATE
        FROM m_produk a 
        INNER JOIN m_user b ON a.ID_USER=b.ID_USER   
        WHERE b.ID_PENYELIA LIKE '%${req.params.id_penyelia}'
        ORDER BY a.CREATE_DATE DESC;
    `).then((data) => {
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

// Mencari Produk Positif list berdasarkan halaman dari jumlah index yang dicari
// @params /admin/search_Produk_By_Penyelia?id=21&search=KATA_YG_DICARI&page=1&numPerPage=10
const search_Produk_By_Penyelia = (req, res) => {
    let querySearch = req.query.search;
    let id_penyelia = req.query.id;

    let page
    let numPerPage
    var limitfirst
    mysqlLib.executeQuery(`
        SELECT COUNT(*) FROM m_produk a 
        INNER JOIN m_user b ON a.ID_USER=b.ID_USER   
        WHERE b.ID_PENYELIA LIKE '%${id_penyelia}'
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

            mysqlLib.executeQuery(`
                SELECT b.NAMA_PERUSAHAAN, a.KODE_BARANG, a.CONTENT, 
                a.ID_USER, 
                GET_STATUS_BARANG(a.KODE_BARANG) AS STATUS, 
                a.KETERANGAN, 
                DATE_FORMAT(a.CREATE_DATE, '%d-%m-%Y') AS DATE
                FROM m_produk a 
                INNER JOIN m_user b ON a.ID_USER=b.ID_USER   
                WHERE b.ID_PENYELIA LIKE '%${id_penyelia}' 
                AND
                (b.NAMA_PERUSAHAAN LIKE '%${querySearch}%' OR
                a.KODE_BARANG LIKE '%${querySearch}%' OR
                a.CONTENT LIKE '%${querySearch}%')
                ORDER BY a.CREATE_DATE DESC LIMIT ${limit}
            `).then((results) => {
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
                    authentication: "gagal",
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

const get_jumlah_semua_status_produk_by_penyelia = (req, res) => {
    mysqlLib.executeQuery(`
    SELECT GET_STATUS_BARANG(a.KODE_BARANG) AS STATUS
        FROM m_produk a 
        INNER JOIN m_user b ON a.ID_USER=b.ID_USER   
        WHERE b.ID_PENYELIA LIKE '%${req.query.id_penyelia}';
    `).then((data) => {
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

module.exports = {
    Master_Produk_By_Penyelia,
    search_Produk_By_Penyelia,
    get_jumlah_semua_status_produk_by_penyelia
}