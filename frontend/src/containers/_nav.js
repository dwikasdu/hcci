import React from 'react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Kirim Bukti Halal',
    to: '/user/kirim-bukti-halal',
    icon: <CIcon content={freeSet.cilImage} customClasses="c-sidebar-nav-icon" />,
    role: ['user'],
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Infaq',
  //   to: '/user/infq',
  //   icon: <CIcon content={freeSet.cilBank} customClasses="c-sidebar-nav-icon" />,
  //   role: ['user'],
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Upload Berkas',
    to: '/',
    icon: <CIcon content={freeSet.cilBook} customClasses="c-sidebar-nav-icon" />,
    role: ['user'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cetak Dokumen',
    to: '/user/cetak-dokumen',
    icon: 'cil-print',
    role: ['user'],
    // badge: {
    //   color: 'info',
    //   text: 'Active',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Notifikasi',
    to: '/user/notifikasi',
    icon: 'cil-speech',
    role: ['user'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Profil',
    to: '/user/profile',
    icon: 'cil-user',
    role: ['user'],
  },





  {
    _tag: 'CSidebarNavTitle',
    role: ['user', 'admin_penyelia', 'super_admin'],
    _children: ['Master']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'UMKM',
    to: '/master-umkm',
    icon: <CIcon content={freeSet.cilBuilding} customClasses="c-sidebar-nav-icon" />,
    role: ['admin_penyelia', 'super_admin'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Produk UMKM',
    to: '/master-produk',
    icon: <CIcon content={freeSet.cilDinner} customClasses="c-sidebar-nav-icon" />,
    role: ['admin_penyelia', 'super_admin'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'User',
    to: '/master-user',
    icon: 'cil-user',
    role: ['admin_penyelia', 'super_admin'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Komunitas',
    to: '/master-komunitas',
    icon: 'cil-people',
    role: ['admin_penyelia', 'super_admin'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Daftar Produk Halal',
    to: '/produk-halal',
    icon: <CIcon content={freeSet.cilDinner} customClasses="c-sidebar-nav-icon" />,
    role: ['user', 'admin_penyelia', 'super_admin'],
    badge: {
      color: 'info',
      text: 'Baru',
    }
  },





  {
    _tag: 'CSidebarNavTitle',
    role: ['admin_penyelia', 'super_admin'],
    _children: ['Export']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Export Data',
    to: '/export-data-admin',
    icon: <CIcon content={freeSet.cilCloudDownload} customClasses="c-sidebar-nav-icon" />,
    role: ['super_admin'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pengajuan Export Data',
    to: '/pengajuan-export-data',
    icon: <CIcon content={freeSet.cilCloudDownload} customClasses="c-sidebar-nav-icon" />,
    role: ['admin_penyelia'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Verifikasi Export Data',
    to: '/verifikasi-export-data',
    icon: <CIcon content={freeSet.cilListHighPriority} customClasses="c-sidebar-nav-icon" />,
    role: ['super_admin'],
  },



  {
    _tag: 'CSidebarNavTitle',
    role: ['admin_penyelia', 'super_admin'],
    _children: ['Kunjungan']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kunjungan',
    to: '/buat-kunjungan',
    icon: <CIcon content={freeSet.cilTruck} customClasses="c-sidebar-nav-icon" />,
    role: ['admin_penyelia', 'super_admin'],
  },



  {
    _tag: 'CSidebarNavTitle',
    role: ['admin_penyelia'],
    _children: ['Laporan']
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Laporan Registrasi Produk',
  //   to: '/laporan-registrasi-produk',
  //   icon: <CIcon content={freeSet.cilCloudUpload} customClasses="c-sidebar-nav-icon" />,
  //   role: ['admin_penyelia', 'super_admin'],
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Notifikasi',
    to: '/notifikasi-admin',
    icon: 'cil-bell',
    role: ['admin_penyelia'],
  },


  // {
  //   _tag: 'CSidebarNavItem',
  //   role: ['admin_penyelia', 'super_admin'],
  //   name: 'Disabled',
  //   icon: 'cil-ban',
  //   badge: {
  //     color: 'secondary',
  //     // text: 'NEW',
  //   },
  //   addLinkClass: 'c-disabled',
  //   'disabled': true
  // },

]

export default _nav
