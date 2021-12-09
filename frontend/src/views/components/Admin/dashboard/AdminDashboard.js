import React, { lazy, useContext } from 'react'
import { AuthContext } from "../../../../service/auth/UserProvider"

const WidgetsDropdown = lazy(() => import('../widget/WidgetsDropdown'))
const TotalTerdaftar = lazy(() => import('../TotalTerdaftar/TotalTerdaftar'))
const JumlahStatusProduk = lazy(() => import('../Jumlah_Status_Produk'))
const GoogleMapsDashboard = lazy(() => import('./GoogleMapsDashboard'))
const TotalTerdaftarDalamWaktu = lazy(() => import('../TotalTerdaftar/TotalTerdaftarDalamWaktu'))


const OnlineUser = lazy(() => import('../OnlineUsers/OnlineUser'))

function AdminDashboard() {
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []


    return (
        <>
            <WidgetsDropdown />

            {roles.includes('super_admin') === true ? (
                <JumlahStatusProduk />
            ) : null}


            <OnlineUser />

            <TotalTerdaftar />

            <TotalTerdaftarDalamWaktu />

            <GoogleMapsDashboard />

        </>
    )
}

export default AdminDashboard