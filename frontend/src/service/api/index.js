import Get from './Get'
import Post from './Post'

// ========= API SESSION ========= //
var token = localStorage.getItem('accessToken');

const API = {
    // ========== ADMIN API ========== //
    // ========== GET ========== //
    getAdminUser: () => Get(`admin/usersAdmin`),
    getTotalUmkm: (body) => Post(`admin/getTotalUmkm`, body),
    getTerdaftarTiapBulan: (body) => Get(`admin/getRecordUmkmByBulan/${body}`),
    umkm_by_penyelia: (id_user) => Get(`admin/umkm_by_penyelia/${id_user}`),
    get_jumlah_semua_status_produk: () => Get(`admin/get_jumlah_semua_status_produk`),
    get_jumlah_semua_status_produk_by_penyelia: (id_penyelia) => Get(`admin/get_jumlah_semua_status_produk_by_penyelia?id_penyelia=${id_penyelia}`),
    Master_Produk_By_Penyelia: (id_user) => Get(`admin/Master_Produk_By_Penyelia/${id_user}`),
    getNotifikasiByPenyelia: (id_user) => Get(`admin/getNotifikasiByPenyelia?id=${id_user}`),
    CekStatusKunjungan: (kode_barang) => Get(`admin/CekStatusKunjungan?kode_barang=${kode_barang}`),
    exportDataProduk: (id_user) => Get(`admin/exportDataProduk?id_user=${id_user}`),
    exportStepProduksi: (id_user) => Get(`admin/exportStepProduksi?id_user=${id_user}`),
    getDataPengajuanExport: (id_user) => Get(`admin/getDataPengajuanExport?id_user=${id_user}`),
    getMasterKomunitas: () => Get(`admin/getMasterKomunitas`),


    // ========== POST ========== //
    insertKunjungan: (body) => Post(`admin/insertKunjungan`, body),
    updateKunjungan: (body) => Post(`admin/updateKunjungan`, body),
    deleteKunjungan: (id_kunjungan) => Post(`admin/deleteKunjungan?id_kunjungan=${id_kunjungan}`),
    pemeriksaanProdukByPenyelia: (body) => Post(`admin/pemeriksaanProdukByPenyelia`, body),
    pemeriksaanProdukKunjungan: (body) => Post(`admin/pemeriksaanProdukKunjungan`, body),
    insertDataPengajuanExport: (body) => Post(`admin/insertDataPengajuanExport`, body),
    verifikasiExportData: (id) => Post(`admin/verifikasiExportData?id=${id}`),
    deletePengajuanExportData: (id) => Post(`admin/deletePengajuanExportData?id=${id}`),
    updateUserPenyelia: (body) => Post(`admin/updateUserPenyelia`, body),
    registerPenyelia: (body) => Post(`admin/registerPenyelia`, body),
    insertMasterKomunitas: (body) => Post(`admin/insertMasterKomunitas`, body),


    // ========== USER ========== //
    // ========== GET ========== //
    getProvinsi: () => Get(`api/provinsi`),
    getKabupaten: () => Get(`api/kabupaten`),
    getKecamatan: () => Get(`api/kecamatan`),
    getKelurahan: () => Get(`api/kelurahan`),

    getProdukHalal: () => Get(`api/getProdukHalal`),
    googleMapsLocationUMKM: () => Get(`api/googleMapsLocationUMKM`),
    googleMapsLocationUMKMbyID: (id_user) => Get(`api/googleMapsLocationUMKMbyID?id_user=${id_user}`),
    getNotification: (body) => Post(`api/getNotification`, body),
    cekExpiredUbahPassword: (token) => Get(`api/user/cekExpiredUbahPassword/${token}`),
    getUserPrifile: (id_user, body) => Get(`api/users/${id_user}`, body),
    getStatusPrint: (id_user, body) => Get(`api/statusPrint/${id_user}`, body),
    getTampilPrint: (id_user, body) => Get(`api/tampilanPrint/${id_user}`, body),
    getCekPendampingan: (id_user, body) => Get(`api/cekPendampingan/${id_user}`, body),
    getProduk: (id_user, body) => Get(`api/produk/${id_user}`, body),
    getbillOfMaterials: (kode) => Get(`api/billOfMaterials/${kode}`),
    getBOMByUserId: (id) => Get(`api/billOfMaterialsByUserId/${id}`),
    getStepProduksi: (kode) => Get(`api/stepProduksi/${kode}`),
    getBstepProduksiByUserId: (id) => Get(`api/stepProduksiByUserId/${id}`),
    getCekStepProses: (id_user, body) => Get(`api/cekStepProses/${id_user}`, body),


    // ========== POST ========== //
    Register: (body) => Post(`api/user/register`, body),
    userUpdate: (body) => Post(`api/users/update`, body),
    ubahPassword: (id_user, body) => Post(`api/user/ubahPassword/${id_user}`, body),
    insNotification: (body) => Post(`api/insNotification`, body),
    veryfyToken: (body) => Post(`api/verifyToken`, { accessToken: body || token }),
    refreshToken: (refreshToken) => Post(`api/user/refresh`, { token: refreshToken }),
    Login: (data) => Post(`api/user/login`, data),
    lupaPassword: (data) => Post(`api/user/lupaPassword`, data),
    ubahLupaPassword: (data) => Post(`api/user/ubahLupaPassword`, data),
    insertProdukBomStep: (body) => Post(`api/insertProdukBomStep`, body),
    insertProduk: (body) => Post(`api/insertProduk`, body),
    deleteProduk: (id_produk) => Post(`api/deleteProduk/${id_produk}`),
    insertBillOfMaterials: (body) => Post(`api/insertBillOfMaterials`, body),
    updateBillOfMaterials: (body) => Post(`api/updateBillOfMaterials`, body),
    deleteBillOfMaterials: (id_produk) => Post(`api/deleteBillOfMaterials/${id_produk}`),
    insertStepProduksi: (body) => Post(`api/insertStepProduksi`, body),
    updateStepProduksi: (body) => Post(`api/updateStepProduksi`, body),
    deleteStepProduksi: (id_step) => Post(`api/deleteStepProduksi/${id_step}`),
    insertPendampingan: (body) => Post(`api/insertPendampingan`, body),

    CekProfileQRCode: (id_user, kode_sertifikat) => Get(`api/CekProfileQRCode?id_user=${id_user}&kode_sertifikat=${kode_sertifikat}`),

    // ========= UPLOAD DATA ======== //
    uploadBuktiPembayaran: (body) => Post(`api/uploadBuktiPembayaran`, body),
    getBuktiPembayaran: (id_user) => Get(`api/getBuktiPembayaran/${id_user}`),
    uploadBuktiHalal: (body) => Post(`api/uploadBuktiHalal`, body),
    getBuktiHalal: (id_user) => Get(`api/getBuktiHalal/${id_user}`),
}

export default API;