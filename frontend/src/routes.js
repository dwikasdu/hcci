import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

// =============== USER ROUTES =============== //
const BuktiHalal = React.lazy(() => import('./views/components/User/Kirim_bukti_halal/BuktiHalal'));
const Infaq = React.lazy(() => import('./views/components/User/Infaq/Infaq'));
const CetakDokumen = React.lazy(() => import('./views/components/User/cetak_dokumen/CetakDokumen'));
const Notifikasi = React.lazy(() => import('./views/components/User/Notifikasi/Notifikasi'));
const Profile = React.lazy(() => import('./views/components/User/Profile/Profile'));
const Tambah_produk = React.lazy(() => import('./views/components/User/Tambah_produk/tambahProduk'));
const UpdateProduk = React.lazy(() => import('./views/components/User/update'));


// =============== ADMIN ROUTES =============== //
const ProdukHalal = React.lazy(() => import('./views/components/Admin/Produk_halal/Produk_halal'));
const Master_Produk = React.lazy(() => import('./views/components/Admin/Master/Master_Produk'));
const Produk_By_UMKM_Penyelia = React.lazy(() => import('./views/components/Admin/Master/Master_Produk/Produk_By_UMKM_Penyelia'));
const Master_UMKM = React.lazy(() => import('./views/components/Admin/Master/Master_UMKM'));
const ProfilUMKMByPenyelia = React.lazy(() => import('./views/components/Admin/Master/Master_UMKM/Profil_UMKM_By_Penyelia'));
const Master_User = React.lazy(() => import('./views/components/Admin/Master/Master_User'));
const Master_Komunitas = React.lazy(() => import('./views/components/Admin/Master/Master_Komunitas'));
const List_Kunjungan = React.lazy(() => import('./views/components/Admin/Kunjungan/List_Kunjungan'));
const Laporan_Registrasi_Produk = React.lazy(() => import('./views/components/Admin/Laporan/Laporan_Registrasi_Produk'));
const NotifikasiAdmin = React.lazy(() => import('./views/components/Admin/Laporan/Notifikasi'));
const Timeline_Notifikasi = React.lazy(() => import('./views/components/Admin/Laporan/Timeline_Notifikasi'));

const ExportDataByAdmin = React.lazy(() => import('./views/components/Admin/Export/ExportDataByAdmin'));
const PengajuanExportData = React.lazy(() => import('./views/components/Admin/Export/PengajuanExportData'));
const verifikasiPengajuan = React.lazy(() => import('./views/components/Admin/Export/verifikasiPengajuan'));


const PemeriksaanProduk = React.lazy(() => import('./views/components/Admin/PemeriksaanProduk'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // =============== USER ROUTES =============== //
  { path: '/user/kirim-bukti-halal', name: 'Kirim Bukti Halal', role: ['user'], component: BuktiHalal },
  { path: '/user/infq', name: 'Pembayaran INFQ', role: ['user'], component: Infaq },
  { path: '/user/cetak-dokumen', name: 'Cetak Dokumen', role: ['user'], component: CetakDokumen },
  { path: '/user/notifikasi', name: 'Notifikasi', role: ['user'], component: Notifikasi },
  { path: '/user/profile', name: 'Profile', role: ['user'], component: Profile },
  { path: '/user/tambah-produk', name: 'Tambah Produk', role: ['user'], component: Tambah_produk },
  { path: '/user/update-produk/:id', name: 'Tambah Produk', role: ['user'], component: UpdateProduk },

  { path: '/produk-halal', role: ['user', 'admin_penyelia', 'super_admin'], name: 'Daftar Produk Halal', component: ProdukHalal },

  // =============== ADMIN ROUTES =============== //
  { path: '/master-produk', role: ['admin_penyelia', 'super_admin'], name: 'Master Produk', component: Master_Produk },
  { path: '/master-umkm', exact: true, role: ['admin_penyelia', 'super_admin'], name: 'Master UMKM', component: Master_UMKM },
  { path: '/master-umkm/produk/:id', role: ['admin_penyelia', 'super_admin'], name: 'Produk UMKM', component: Produk_By_UMKM_Penyelia },
  { path: '/master-umkm/Pemeriksaan_Produk/:id', role: ['admin_penyelia', 'super_admin'], name: 'Pemeriksaan Produk', component: PemeriksaanProduk },
  { path: '/master-umkm/profil-umkm/:id', role: ['admin_penyelia', 'super_admin'], name: 'Perofil Perusahaan', component: ProfilUMKMByPenyelia },
  { path: '/master-user', role: ['admin_penyelia', 'super_admin'], name: 'Master user', component: Master_User },
  { path: '/master-komunitas', role: ['admin_penyelia', 'super_admin'], name: 'Master Komunitas', component: Master_Komunitas },
  { path: '/buat-kunjungan', role: ['admin_penyelia', 'super_admin'], name: 'Buat Kunjungan', component: List_Kunjungan },
  { path: '/laporan-registrasi-produk', role: ['admin_penyelia', 'super_admin'], name: 'Laporan Registrasi Produk', component: Laporan_Registrasi_Produk },
  { path: '/notifikasi-admin', exact: true, role: ['admin_penyelia'], name: 'Notifikasi Admin', component: NotifikasiAdmin },
  { path: '/notifikasi-admin/timeline-notifikasi/:id', role: ['admin_penyelia'], name: 'Timeline Notifikasi', component: Timeline_Notifikasi },
  { path: '/export-data-admin', exact: true, role: ['super_admin'], name: 'Export Data', component: ExportDataByAdmin },
  { path: '/pengajuan-export-data', exact: true, role: ['admin_penyelia'], name: 'Pengajuan Export Data', component: PengajuanExportData },
  { path: '/verifikasi-export-data', exact: true, role: ['super_admin'], name: 'Verifikasi Export Data', component: verifikasiPengajuan },





  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', role: ['admin_penyelia', 'super_admin'], component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
