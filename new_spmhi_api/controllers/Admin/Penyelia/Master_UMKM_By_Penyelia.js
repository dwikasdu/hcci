var mysqlLib = require('../../../connection/mysql_connection')

// READ SEMUA
const UMKM_BY_PENYELIA = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT ID_USER, NAMA_PERUSAHAAN, 
        DATE_FORMAT(CREATE_DATE, '%d-%m-%Y') AS CREATE_DATE,
        CEK_STEP_PEROSES(ID_USER) AS PROSES,
        NOMOR_TELEPON FROM m_user 
        WHERE ID_PENYELIA LIKE '%${req.params.id_penyelia}'
        ORDER BY CREATE_DATE ASC
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
// @params /admin/Search_umkm_by_penyelia?id=21&search=KATA_YG_DICARI&page=1&numPerPage=10
const Search_umkm_by_penyelia = (req, res) => {
    let querySearch = req.query.search;
    let id_penyelia = req.query.id;

    let page
    let numPerPage
    var limitfirst
    mysqlLib.executeQuery(`
        SELECT COUNT(*) AS numRows FROM m_user 
        WHERE ID_PENYELIA LIKE '%${id_penyelia}'
        AND (NAMA_PERUSAHAAN LIKE '%${querySearch}%')
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
                SELECT ID_USER, NAMA_PERUSAHAAN, NAMA_PENANGGUNG_JAWAB, EMAIL, ALAMAT,
                DATE_FORMAT(CREATE_DATE, '%d-%m-%Y') AS CREATE_DATE,
                CEK_STEP_PEROSES(ID_USER) AS PROSES,
                (SELECT NAMA_PENANGGUNG_JAWAB FROM m_user WHERE ID_USER = a.ID_PENYELIA) AS PENYELIA,
                NOMOR_TELEPON FROM m_user a
                WHERE ID_PENYELIA LIKE '%${id_penyelia}' AND JABATAN = 1
                AND (NAMA_PERUSAHAAN LIKE '%${querySearch}%' OR ALAMAT LIKE '%${querySearch}%')
                ORDER BY ID_USER DESC LIMIT ${limit}
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

module.exports = {
    UMKM_BY_PENYELIA,
    Search_umkm_by_penyelia
}