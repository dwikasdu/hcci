var mysqlLib = require('../../connection/mysql_connection')

const GET_MasterProduk = (req, res) => {
    var id_user = req.params.id_user;
    mysqlLib.executeQuery(`
        SELECT a.KODE_BARANG, a.CONTENT, a.ID_USER, 
        GET_STATUS_BARANG(a.KODE_BARANG) AS STATUS, 
        a.KETERANGAN, DATE_FORMAT(a.CREATE_DATE, '%d-%m-%Y') AS DATE 
        FROM m_produk a WHERE a.ID_USER = '${id_user}'
    `)
        .then((data) => {
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
// @params /api/SearchMasterProduk?id=1&search=KATA_YG_DICARI&page=1&numPerPage=6
const Search_MasterProduk = (req, res) => {
    let querySearch = req.query.search;
    let id_user = req.query.id;

    let page
    let numPerPage
    var limitfirst
    mysqlLib.executeQuery(`
        SELECT COUNT(*) AS numRows FROM m_produk a WHERE a.ID_USER = '${id_user}' AND
        (CONTENT LIKE '%${querySearch}%' OR GET_STATUS_BARANG(a.KODE_BARANG) LIKE '%${querySearch}%')
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
                SELECT a.ID_USER, a.KODE_BARANG, a.CONTENT, 
                GET_STATUS_BARANG(a.KODE_BARANG) AS STATUS, 
                a.KETERANGAN, DATE_FORMAT(a.CREATE_DATE, '%d-%m-%Y') AS DATE 
                FROM m_produk a WHERE a.ID_USER = '${id_user}' AND
                (CONTENT LIKE '%${querySearch}%' OR GET_STATUS_BARANG(a.KODE_BARANG) LIKE '%${querySearch}%')
                ORDER BY CREATE_DATE DESC LIMIT ${limit}
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

const INS_MasterProduk = (req, res) => {
    let generate_kode_barang = "";
    let generate = "";
    mysqlLib.executeQuery("CALL GET_KODE_BARANG();").then((d) => {
        var b = JSON.stringify(d[0]);
        generate_kode_barang = JSON.parse(b);
        generate = generate_kode_barang[0].GENERATE;
        var obj = JSON.parse(JSON.stringify(req.body));
        var jumlah_data = obj.data.length;
        for (var i = 0; i < jumlah_data; i++) {
            var ID = obj.data[i].id;
            var IN_KODE_BARANG = generate;
            var IN_CONTENT = obj.data[i].kontent;
            var IN_ID_USER = obj.data[i].id_user;
            var IN_STATUS = obj.data[i].status;
            var IN_KETERANGAN = obj.data[i].keterangan;
            var IN_CREATE_DATE = obj.data[i].create_date; // useless
            var IN_OTORISATOR = obj.data[i].otorisator;
            var IN_BAHAN_BAKU = obj.data[i].bahan_baku;
            var IN_PEMASOK = obj.data[i].pemasok;
            var IN_ALAMAT_PEMASOK = obj.data[i].alamat_pemasok;
            var IN_KETERANGAN_BOM = obj.data[i].keterangan_bom;
            var IN_STATUS_BAHAN_BAKU = obj.data[i].status_bahan_baku;
            var IN_SERTIFIKAT_HALAL = obj.data[i].sertifikat_halal;

            mysqlLib.executeQuery(`
            CALL INS_M_PRODUK_BOM( 
                '${IN_KODE_BARANG}', 
                '${IN_CONTENT}', 
                '${IN_ID_USER}', 
                '${IN_STATUS}', 
                '${IN_KETERANGAN}', 
                NOW(), 
                '${IN_OTORISATOR}', 
                '', 
                '${IN_BAHAN_BAKU}', 
                '${IN_PEMASOK}', 
                '${IN_ALAMAT_PEMASOK}', 
                '${IN_KETERANGAN_BOM}', 
                '${IN_STATUS_BAHAN_BAKU}', 
                '${IN_SERTIFIKAT_HALAL}',
                '0');
                `).then((d) => {
                console.log(d.affectedRows);
                if (d.affectedRows == 1) {
                    res.status(200).json({
                        status: res.statusCode,
                        message: "Data Gagal disimpan",
                        data: data
                    })
                }
                else {
                    res.status(200).json({
                        status: res.statusCode,
                        message: "Data Berhasil disimpan",
                        data: data
                    })
                }

            }).catch(error => {
                console.log(error);
                res.status(505).json({
                    status: res.statusCode,
                    authentication: false,
                    message: error.stack
                })
            });

        }
    }).catch(error => {
        console.log(error);
        res.status(505).json({
            status: res.statusCode,
            authentication: false,
            message: error.stack
        })
    });
}

const INS_MasterProdukBomStep = (req, res) => {
    let generate_kode_barang = "";
    let generate = "";
    mysqlLib.executeQuery("CALL GET_KODE_BARANG();").then((d) => {
        var b = JSON.stringify(d[0]);
        generate_kode_barang = JSON.parse(b);
        generate = generate_kode_barang[0].GENERATE;
        var obj = JSON.parse(JSON.stringify(req.body));
        var jumlah_data = obj.data.length;
        for (var i = 0; i < jumlah_data; i++) {
            var ID = obj.data[i].id;
            var ID_STEP = obj.data[i].id_in_step;

            var IN_KODE_BARANG = generate; // tidak masuk aplikasi
            var IN_CONTENT = obj.data[i].kontent;
            var IN_ID_USER = obj.data[i].id_user;
            var IN_STATUS = obj.data[i].status;
            var IN_KETERANGAN = obj.data[i].keterangan;
            // var IN_CREATE_DATE = obj.data[i].create_date; // tidak dipakai
            var IN_OTORISATOR = obj.data[i].otorisator;
            var IN_ID = obj.data[i].id_bahan_baku;
            var IN_BAHAN_BAKU = obj.data[i].bahan_baku;
            var IN_PEMASOK = obj.data[i].pemasok;
            var IN_ALAMAT_PEMASOK = obj.data[i].alamat_pemasok;
            var IN_KETERANGAN_BOM = obj.data[i].keterangan_bom;
            var IN_STATUS_BAHAN_BAKU = obj.data[i].status_bahan_baku;
            var IN_SERTIFIKAT_HALAL = obj.data[i].sertifikat_halal;
            var IN_LOCKED = obj.data[i].locked;
            var IN_STEP_ID = obj.data[i].step_id;
            var IN_STEP = obj.data[i].step_ke;
            var IN_STEP_KETERANGAN = obj.data[i].step_keterangan;
            var IN_MERK = obj.data[i].merk;
            var IN_PRODUSEN = obj.data[i].produsen;
            var IN_LEMBAGA_PENERBIT = obj.data[i].lembaga_penerbit;
            var IN_EXPIRED_DATE_SERTIFIKAT = obj.data[i].expired_date_sertifikat;

            mysqlLib.executeQuery(`
            CALL INS_M_PRODUK_BOM_STEP(
                '${IN_KODE_BARANG}',
                '${IN_CONTENT}',
                '${IN_ID_USER}',
                '${IN_STATUS}',
                '${IN_KETERANGAN}',
                NOW(),
                '${IN_OTORISATOR}',
                '${IN_ID}',
                '${IN_BAHAN_BAKU}',
                '${IN_PEMASOK}',
                '${IN_ALAMAT_PEMASOK}',
                '${IN_KETERANGAN_BOM}',
                '${IN_STATUS_BAHAN_BAKU}',
                '${IN_SERTIFIKAT_HALAL}', 
                '${IN_LOCKED}',
                '${IN_STEP_ID}', 
                '${IN_STEP}', 
                '${IN_STEP_KETERANGAN}', 
                '${IN_MERK}', 
                '${IN_PRODUSEN}', 
                '${IN_LEMBAGA_PENERBIT}', 
                '${IN_EXPIRED_DATE_SERTIFIKAT}'
                );`)
                .then((data) => { })
        }

        res.status(200).json({
            status: res.statusCode,
            message: "Data Berhasil disimpan"
        })
    }).catch(error => {
        console.log(error);
        res.status(505).json({
            status: res.statusCode,
            authentication: false,
            message: error.stack
        })
    });
}

const DEL_M_PRODUK_BY_KODE_BARANG = (req, res) => {
    var kode_barang = req.params.kode_barang;
    mysqlLib.executeQuery(`CALL DEL_M_PRODUK_BY_KODE_BARANG('${kode_barang}');`).then((d) => {
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
    GET_MasterProduk,
    Search_MasterProduk,
    INS_MasterProduk,
    INS_MasterProdukBomStep,
    DEL_M_PRODUK_BY_KODE_BARANG
}