const express = require('express');
const router = express.Router();

const { roleAkses } = require('../service/roleAkses')
const { verifyBearerToken, verifyToken } = require('../service/verifyToken');
router.post('/verifyToken', verifyToken);


// ======= DATA USER ========
const { users, userById, updateUser, deleteUserById } = require('../controllers/User/Users');
router.get('/users', users);
router.get('/users/:id', verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), userById);
router.post('/users/update/:id', verifyBearerToken, updateUser);
router.get('/users/delete/:id', verifyBearerToken, deleteUserById);


// ======= DATA USER ADMIN ========
const { UserAdmin, Update_user_penyelia, register_penyelia } = require('../controllers/Admin/Super_Admin/User_Admin');
router.get('/usersAdmin', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), UserAdmin);
router.post('/updateUserPenyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), Update_user_penyelia);
router.post('/registerPenyelia', register_penyelia);


// ======= TOTAL REGISTER UMKM ========
const { GET_Total_Umkm, GET_Jumlah_Umkm_per_bulan } = require('../controllers/Admin/Super_Admin/Get_total_umkm');
router.post('/getTotalUmkm', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), GET_Total_Umkm);
router.get('/getRecordUmkmByBulan/:tahun', GET_Jumlah_Umkm_per_bulan);


// ======= MASTER PRODUK ========
const { GET_Jumlah_Semua_Status_Produk } = require('../controllers/Admin/Super_Admin/Master_Produk_UMKM');
router.get('/get_jumlah_semua_status_produk', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), GET_Jumlah_Semua_Status_Produk);


// ======= UMKM BY ID PENYELIA ========
const { UMKM_BY_PENYELIA, Search_umkm_by_penyelia } = require('../controllers/Admin/Penyelia/Master_UMKM_By_Penyelia');
router.get('/umkm_by_penyelia/:id_penyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), UMKM_BY_PENYELIA);
router.get('/Search_umkm_by_penyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), Search_umkm_by_penyelia); // @params /admin/Search_umkm_by_penyelia?search=KATA_YG_DICARI&page=1&numPerPage=10


// ======= UMKM BY ID PENYELIA ========
const { Master_Produk_By_Penyelia, search_Produk_By_Penyelia, get_jumlah_semua_status_produk_by_penyelia } = require('../controllers/Admin/Penyelia/Master_Produk_By_Penyelia');
router.get('/Master_Produk_By_Penyelia/:id_penyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), Master_Produk_By_Penyelia);
router.get('/search_Produk_By_Penyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), search_Produk_By_Penyelia); // @params /admin/search_Produk_By_Penyelia?search=KATA_YG_DICARI&page=1&numPerPage=10
router.get('/get_jumlah_semua_status_produk_by_penyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), get_jumlah_semua_status_produk_by_penyelia);


// ======= KUNJUNGAN PENYELIA ========
const { INS_Kunjungan, UPDATE_Kunjungan, DEL_M_Kunjungan, search_kunjungan_by_penyelia, CekStatusKunjungan } = require('../controllers/Admin/Penyelia/Kujungan');
router.post('/insertKunjungan', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), INS_Kunjungan);
router.post('/updateKunjungan', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), UPDATE_Kunjungan);
router.get('/search_kunjungan_by_penyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), search_kunjungan_by_penyelia); // @params /admin/search_kunjungan_by_penyelia?id=21&search=KATA_YG_DICARI&page=1&numPerPage=10
router.post('/deleteKunjungan', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), DEL_M_Kunjungan); // @params /admin/deleteKunjungan?id_kunjungan=1
router.get('/CekStatusKunjungan', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), CekStatusKunjungan); // @params /admin/CekStatusKunjungan?kode_barang=20210049


// ======= NOTIFIKASI BY PENYELIA ========
const { Get_Notifikasi_Admin } = require('../controllers/Admin/Penyelia/Notifikasi');
router.get('/getNotifikasiByPenyelia', verifyBearerToken, roleAkses(["admin_penyelia"]), Get_Notifikasi_Admin); // @params /admin/getNotifikasiByPenyelia?id=ID_PENYELIA


// ======= EXPORT PRODUK UMKM ========
const { ExportDataProduk, ExportStepProduksi, GetDataPengajuanExport, INS_DataPengajuanExport, VerifikasiExportData, DEL_PengajuanExportData } = require('../controllers/Admin/Penyelia/ExportDataProduk')
router.get('/exportDataProduk', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), ExportDataProduk); // @params /admin/exportDataProduk?id_user=1
router.get('/exportStepProduksi', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), ExportStepProduksi); // @params /admin/exportStepProduksi?id_user=1
router.get('/getDataPengajuanExport', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), GetDataPengajuanExport); // @params /admin/getDataPengajuanExport?id_user=1
router.post('/insertDataPengajuanExport', verifyBearerToken, roleAkses(["admin_penyelia"]), INS_DataPengajuanExport); // @params /admin/insertDataPengajuanExport
router.post('/verifikasiExportData', verifyBearerToken, roleAkses(["super_admin"]), VerifikasiExportData); // @params /admin/verifikasiExportData?id=
router.post('/deletePengajuanExportData', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), DEL_PengajuanExportData); // @params /admin/deletePengajuanExportData?id=


// ======= PEMERIKSAAN PRODUK BY PENYELIA ========
const { Pemeriksaan_Produk_By_Penyelia, Pemeriksaan_Produk_Kunjungan } = require('../controllers/Admin/Penyelia/Pemeriksaan_Produk_By_Penyelia')
router.post('/pemeriksaanProdukByPenyelia', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), Pemeriksaan_Produk_By_Penyelia); // @params /admin/pemeriksaanProdukByPenyelia
router.post('/pemeriksaanProdukKunjungan', verifyBearerToken, roleAkses(["admin_penyelia", "super_admin"]), Pemeriksaan_Produk_Kunjungan); // @params /admin/pemeriksaanProdukKunjungan


// ======= MASTER KOMUNITAS ========
const { GetMasterKomunitas, INS_MasterKomunitas, DEL_MasterKomunitas } = require('../controllers/Admin/Super_Admin/MasterKomunitas')
router.get('/getMasterKomunitas', GetMasterKomunitas); // @params /admin/getMasterKomunitas
router.post('/insertMasterKomunitas', INS_MasterKomunitas); // @params /admin/insertMasterKomunitas
router.post('/deleteMasterKomunitas', DEL_MasterKomunitas); // @params /admin/deleteMasterKomunitas?id_komunitas=


module.exports = router