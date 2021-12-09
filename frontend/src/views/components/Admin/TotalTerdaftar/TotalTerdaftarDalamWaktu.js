import React, { useContext } from 'react'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CDataTable,
    CButton
} from '@coreui/react'
import SearchUMKMByPenyelia from '../Master/Master_UMKM/Search_UMKM_By_Penyelia'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../service/auth/UserProvider"

const TotalTerdaftarDalamWaktu = () => {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = roles.includes('admin_penyelia') ? state.user.ID_USER : '';
    }

    const {
        dataUMKM,
        // hasMore,
        // loading,
        // totalSemua,
        // error
    } = SearchUMKMByPenyelia('', 1, 7, id_user)

    const fieldsStep = [
        {
            key: 'Avatar',
            label: '',
            _style: { width: '8%' },
            sorter: false,
            filter: false
        },
        { key: 'NAMA_PERUSAHAAN', label: 'NAMA PERUSAHAAN' },
        { key: 'NOMOR_TELEPON', label: 'NOMOR TELEPON' },
        { key: 'ALAMAT', label: 'ALAMAT' },
        { key: 'CREATE_DATE', label: 'TERDAFTAR' },
        { key: 'PENYELIA', label: 'PENYELIA' },
        {
            key: 'Profil',
            label: '',
            _style: { width: '8%' },
            sorter: false,
            filter: false
        },
        {
            key: 'Produk',
            label: '',
            _style: { width: '8%' },
            sorter: false,
            filter: false
        },
    ];

    return (
        <>
            <CCard>
                <CCardHeader>
                    <strong>UMKM BARU TERDAFTAR</strong>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        items={dataUMKM}
                        fields={fieldsStep}
                        striped
                        responsive
                        hover
                        sorter
                        scopedSlots={{
                            'Profil':
                                (item, index) => {
                                    return (
                                        <td className="py-2">
                                            <Link to={{ pathname: `/master-umkm/produk/user?_key=${window.btoa(item.NAMA_PERUSAHAAN)}&_id=${window.btoa(item.ID_USER)}` }}>
                                                <CButton
                                                    color="info"
                                                    size="sm"
                                                >
                                                    Produk
                                                </CButton>
                                            </Link>
                                        </td>
                                    )
                                },
                            'Produk':
                                (item, index) => {
                                    return (
                                        <td className="py-2">
                                            <Link to={{ pathname: `/master-umkm/profil-umkm/profil?_key=${window.btoa(item.NAMA_PERUSAHAAN)}&_id=${window.btoa(item.ID_USER)}` }}>
                                                <CButton
                                                    color="success"
                                                    size="sm"
                                                >
                                                    Profil
                                                </CButton>
                                            </Link>
                                        </td>
                                    )
                                },
                            'Avatar':
                                (item, index) => {
                                    return (
                                        <td className="py-2 text-center">
                                            <svg fill="#acaeb3" width="30" height="30" viewBox="0 0 24 24"><path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" /></svg>
                                        </td>
                                    )
                                },
                        }}
                    />
                </CCardBody>
            </CCard>
        </>
    )
}

export default TotalTerdaftarDalamWaktu
