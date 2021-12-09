var mysqlLib = require('../../../connection/mysql_connection')

const INS_Kunjungan = (req, res) => {
    var id_user = req.body.id_user;
    var tanggal = req.body.tanggal;
    var kode_jabatan = req.body.kode_jabatan;
    var is_kunjungan = req.body.is_kunjungan;
    var otorisator = req.body.otorisator;
    var kode_barang = req.body.kode_barang;
    var content = req.body.content;
    mysqlLib.executeQuery(`SELECT GET_KODE_KUNJUNGAN('${id_user}','${tanggal}') AS KODE_KUNJUNGAN`)
        .then((data) => {
            if (data.length > 0) {
                var kode_kunjungan = data[0].KODE_KUNJUNGAN;
                mysqlLib.executeQuery(`INSERT INTO m_kunjungan VALUES('${kode_kunjungan}','${id_user}','${kode_jabatan}','${is_kunjungan}','${tanggal}',NOW(),'${otorisator}',NOW())`)
                    .then((d) => {
                        mysqlLib.executeQuery(`INSERT INTO m_kunjungan_detail VALUES(NULL,'${kode_kunjungan}','${kode_barang}','${content}')`)
                            .then((d) => {
                                var txt_pesan = `Kami akan melakukan kunjungan pada ${tanggal}`;
                                mysqlLib.executeQuery(`INSERT INTO m_log VALUES(NULL,'${kode_jabatan}','${id_user}','PENYELIA','${txt_pesan}',NOW())`)
                                    .then((d) => {
                                        res.status(200).json({
                                            status: res.statusCode,
                                            message: "Sukses"
                                        })
                                    }).catch(error => {
                                        console.log(error);
                                        res.status(505).json({
                                            status: res.statusCode,
                                            authentication: false,
                                            message: error.stack
                                        })
                                    })
                            }).catch(error => {
                                console.log(error);
                                res.status(505).json({
                                    status: res.statusCode,
                                    authentication: false,
                                    message: error.stack
                                })
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
        }).catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false,
                message: error.stack
            })
        })
}

const UPDATE_Kunjungan = (req, res) => {
    var TANGGAL = req.body.TANGGAL;
    var ID = req.body.ID;
    var ID_PENYELIA = req.body.ID_PENYELIA;
    var ID_USER = req.body.ID_USER;
    mysqlLib.executeQuery(`UPDATE m_kunjungan SET TANGGAL = DATE_FORMAT("${TANGGAL}", "%Y-%m-%d") WHERE ID = ${ID};`)
        .then((data) => {
            var txt_pesan = `Kami akan melakukan kunjungan pada ${TANGGAL}`;
            mysqlLib.executeQuery(`INSERT INTO m_log VALUES(NULL,'${ID_PENYELIA}','${ID_USER}','PENYELIA','${txt_pesan}',NOW())`)
                .then((d) => {
                    res.status(200).json({
                        status: res.statusCode,
                        message: "Sukses"
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(505).json({
                        status: res.statusCode,
                        authentication: false,
                        message: error.stack
                    })
                })
        }).catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false + " 1",
                message: error.stack
            })
        })
}

const DEL_M_Kunjungan = (req, res) => {
    var id_kunjungan = req.query.id_kunjungan;
    mysqlLib.executeQuery(`DELETE FROM m_kunjungan_detail where KODE_KUNJUNGAN = '${id_kunjungan}'`)
        .then((data) => {
            mysqlLib.executeQuery(`DELETE FROM m_kunjungan where ID = '${id_kunjungan}'`)
                .then((d) => {
                    res.status(200).json({
                        status: res.statusCode,
                        message: "Kunjungan Berhasil di Hapus"
                    })
                }).catch(error => {
                    console.log(error);
                    res.status(505).json({
                        status: res.statusCode,
                        authentication: false + " 2",
                        message: error.stack
                    })
                })
        }).catch(error => {
            console.log(error);
            res.status(505).json({
                status: res.statusCode,
                authentication: false + " 1",
                message: error.stack
            })
        })
}

// Mencari Produk Positif list berdasarkan halaman dari jumlah index yang dicari
// @params /admin/search_kunjungan_by_penyelia?id=21&search=KATA_YG_DICARI&page=1&numPerPage=10
const search_kunjungan_by_penyelia = (req, res) => {
    let querySearch = req.query.search;
    let id_penyelia = req.query.id;

    let page
    let numPerPage
    var limitfirst

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
    SELECT * FROM (SELECT a.ID,
        a.TANGGAL,
        a.ID_USER AS ID_PELAKU_USAHA,
        (SELECT NAMA_PERUSAHAAN FROM m_user WHERE ID_USER = a.ID_USER) AS NAMA_PERUSAHAAN,
        UPPER((SELECT GROUP_CONCAT(CONTENT) FROM m_kunjungan_detail WHERE KODE_KUNJUNGAN = a.ID)) AS PRODUK,
        (SELECT KODE_BARANG FROM m_kunjungan_detail WHERE KODE_KUNJUNGAN = a.ID) AS KODE_BARANG,
        GET_STATUS_BARANG((SELECT KODE_BARANG FROM m_kunjungan_detail WHERE KODE_KUNJUNGAN = a.ID)) AS STATUS_BARANG,
        a.ID_PENYELIA,
        b.NAMA_PENANGGUNG_JAWAB AS NAMA_PENYELIA,
        UPPER((SELECT ALAMAT FROM m_user WHERE ID_USER = a.ID_USER)) AS ALAMAT,
        b.LATTITUDE,
        b.LONGITUDE,
        UPPER((SELECT NOMOR_TELEPON FROM m_user WHERE ID_USER = a.ID_USER)) AS NOMOR_TELEPON,
        IF(a.IS_KUNJUNGAN='0',DATEDIFF(NOW(),a.TANGGAL),'0') AS REMINDER, 
        IF(a.IS_KUNJUNGAN='0','BELUM KUNJUNGAN','SUDAH KUNJUNGAN') AS STATUS,
        DATE_FORMAT(a.TANGGAL, '%d-%m-%Y') AS TANGGAL_KUNJUNGAN,
        DATE_FORMAT(a.TANGGAL, '%Y-%m-%d') AS DATE_FORMAT
    
        FROM m_kunjungan a INNER JOIN m_user b ON b.ID_USER=a.ID_PENYELIA		
    
        WHERE a.ID_PENYELIA LIKE '%${id_penyelia}%') v 
        
        WHERE v.NAMA_PERUSAHAAN LIKE '%${querySearch}%' OR
        v.STATUS_BARANG LIKE '%${querySearch}%' OR
        v.ALAMAT LIKE '%${querySearch}%' OR
        v.STATUS LIKE '%${querySearch}%'
        ORDER BY v.TANGGAL DESC LIMIT ${limit}
    `).then((results) => {
        res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            page: page,
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

// READ SEMUA
const CekStatusKunjungan = (req, res) => {
    mysqlLib.executeQuery(`
        SELECT
        a.CONTENT,
        GET_STATUS_BARANG(a.KODE_BARANG) AS STATUS,
        (SELECT IS_KUNJUNGAN FROM m_kunjungan WHERE ID = a.KODE_KUNJUNGAN) AS IS_KUNJUNGAN,
        (SELECT IF(IS_KUNJUNGAN='0',DATEDIFF(NOW(),TANGGAL),'0') FROM m_kunjungan WHERE ID = a.KODE_KUNJUNGAN) AS REMINDER
        FROM m_kunjungan_detail a
        WHERE KODE_BARANG = '${req.query.kode_barang}';
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
    INS_Kunjungan,
    UPDATE_Kunjungan,
    DEL_M_Kunjungan,
    search_kunjungan_by_penyelia,
    CekStatusKunjungan
}