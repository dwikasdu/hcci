const express = require('express');
const router = express.Router();

const { roleAkses } = require('../service/roleAkses')
const { verifyBearerToken, verifyToken } = require('../service/verifyToken');
router.post('/verifyToken', verifyToken);

// ======= AUTH ROUTER =======
const { login, refresh } = require('../auth/Login');
router.post('/user/login', login);
router.post("/user/refresh", refresh);

// ======= REGISTER =======
const { register, verifikasiEmailToken } = require('../auth/Register');
router.post('/user/register', register);
router.post('/user/verifikasiEmail/:token', verifikasiEmailToken);

// ======= UBAH PASSWORD =======
const { ubahPassword } = require('../auth/GantiPassword');
router.post('/user/ubahPassword/:id', verifyBearerToken, ubahPassword);

// ======= LUPA PASSWORD =======
const { lupaPassword, cekExpiredUbahPassword, ubahLupaPassword } = require('../auth/FrogotPassword');
router.post('/user/lupaPassword', lupaPassword);
router.post('/user/ubahLupaPassword', ubahLupaPassword);
router.get('/user/cekExpiredUbahPassword/:token', cekExpiredUbahPassword);

// ======= DATA USER ========
const { users, userById, updateUser, deleteUserById } = require('../controllers/User/Users');
router.get('/users', verifyBearerToken, users);
router.get('/users/:id', userById);
router.post('/users/update', verifyBearerToken, roleAkses(["user", "super_admin"]), updateUser);
router.get('/users/delete/:id', verifyBearerToken, deleteUserById);

const { get_id_password, encrypt_password } = require('../controllers/User/Users');
router.get('/get_id_password', get_id_password);
router.post('/encrypt_password', encrypt_password);

// ======= WILAYAH ========
const { Provinsi, Kabupaten, Kecamatan, Kelurahan } = require('../controllers/Region');
router.get("/provinsi", Provinsi);
router.get("/kabupaten", Kabupaten);
router.get("/kecamatan", Kecamatan);
router.get("/kelurahan", Kelurahan);

// ======= MASTER PRODUK ========
const { GET_Produk_Halal, paginationProdukMUI, searchProdukMUI } = require('../controllers/Produk_Halal_MUI');
router.get("/getProdukHalal", GET_Produk_Halal);
router.get("/ProdukHalalMUI", paginationProdukMUI); // @params /api/ProdukHalalMUI?page=1&numPerPage=10
router.get("/searchProdukMUI", searchProdukMUI); // @params /api/ProdukHalalMUI?search=KATA_YG_DICARI&page=1&numPerPage=10

// ======= GOOGLE MAPS UMKM ========
const { GoogleMapsLocationUMKM, GoogleMapsLocationUMKMbyID } = require('../controllers/GoogleMaps');
router.get("/googleMapsLocationUMKM", GoogleMapsLocationUMKM);
router.get("/googleMapsLocationUMKMbyID", GoogleMapsLocationUMKMbyID); // @params /api/googleMapsLocationUMKMbyID?id_user=1

// ======= MASTER PRODUK ========
const { GET_MasterProduk, Search_MasterProduk, INS_MasterProduk, INS_MasterProdukBomStep, DEL_M_PRODUK_BY_KODE_BARANG } = require('../controllers/User/MasterProduk');
router.get("/produk/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_MasterProduk);
router.get("/SearchMasterProduk", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), Search_MasterProduk); // @params /api/SearchMasterProduk?id=1&search=KATA_YG_DICARI&page=1&numPerPage=6
router.post("/insertProduk", verifyBearerToken, roleAkses(["user"]), INS_MasterProduk);
router.post("/insertProdukBomStep", verifyBearerToken, roleAkses(["user"]), INS_MasterProdukBomStep);
router.post("/deleteProduk/:kode_barang", verifyBearerToken, roleAkses(["user"]), DEL_M_PRODUK_BY_KODE_BARANG);

// ======= MASTER BILL OF MATERIALS ========
const { GET_MasterBillOfMaterials, GET_MBOMByUserId, INS_MasterBillOfMaterials, UPDATE_MasterBillOfMaterials, DEL_MasterBillOfMaterials } = require('../controllers/User/MasterBillOfMaterials');
router.get("/billOfMaterials/:kode_barang", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_MasterBillOfMaterials);
router.get("/billOfMaterialsByUserId/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_MBOMByUserId);
router.post("/insertBillOfMaterials", verifyBearerToken, roleAkses(["user"]), INS_MasterBillOfMaterials);
router.post("/updateBillOfMaterials", verifyBearerToken, roleAkses(["user"]), UPDATE_MasterBillOfMaterials);
router.post("/deleteBillOfMaterials/:id_produk", verifyBearerToken, roleAkses(["user"]), DEL_MasterBillOfMaterials);

// ======= MASTER STEP PRODUKSI ========
const { GET_StepProduksi, GET_StepProduksiByUserId, INS_StepProduksi, UPDATE_StepProduksi, DEL_StepProduksi } = require('../controllers/User/MasterStepProduksi');
router.get("/stepProduksi/:kode_barang", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_StepProduksi);
router.get("/stepProduksiByUserId/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_StepProduksiByUserId);
router.post("/insertStepProduksi", verifyBearerToken, roleAkses(["user"]), INS_StepProduksi);
router.post("/updateStepProduksi", verifyBearerToken, roleAkses(["user"]), UPDATE_StepProduksi);
router.post("/deleteStepProduksi/:id_step", verifyBearerToken, roleAkses(["user"]), DEL_StepProduksi);

// ======= CEK PRINT ========
const { GET_StatusPrint, GET_TampilanPrint } = require('../controllers/User/CekPrint');
router.get("/statusPrint/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_StatusPrint);
router.get("/tampilanPrint/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_TampilanPrint);

// ======= CEK PRINT ========
const { INS_Pendampingan, CEK_Pendampingan } = require('../controllers/User/Pendampingan');
router.post("/insertPendampingan", verifyBearerToken, roleAkses(["user"]), INS_Pendampingan);
router.get("/cekPendampingan/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), CEK_Pendampingan);

// ======= CEK STEP PEROSES ========
const { CEK_StepProses } = require('../controllers/User/StepProses');
router.get("/cekStepProses/:id_user", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), CEK_StepProses);

// ======= NOTIFICATION ========
const { GET_Notification, INS_Notifications } = require('../controllers/User/Notification');
router.post("/getNotification", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), GET_Notification);
router.post("/insNotification", verifyBearerToken, roleAkses(["user", "admin_penyelia", "super_admin"]), INS_Notifications);

// ======= CEK QR CODE ========
const { CekProfileQRCode } = require('../controllers/User/CekProfileQRCode');
router.get("/CekProfileQRCode", CekProfileQRCode); // @params /api/CekProfileQRCode?id_user=20210065&kode_sertifikat=SPMHI21090020000051

// ======= UPLOAD INFQ ========
const { upload_bukti_pembayaran, GET_Bukti_Pembayaran } = require('../controllers/uploadfile');
router.post("/uploadBuktiPembayaran", upload_bukti_pembayaran);
router.get("/getBuktiPembayaran/:id_user", GET_Bukti_Pembayaran);

// ======= UPLOAD BUKTI HALAL ========
const { upload_bukti_halal, GET_Bukti_Halala } = require('../controllers/upload_bukti_halal');
router.post("/uploadBuktiHalal", upload_bukti_halal);
router.get("/getBuktiHalal/:id_user", GET_Bukti_Halala);

module.exports = router