import React, { useContext, useState, useEffect } from 'react'
import { CForm, CFormGroup, CCol, CLabel, CInput, CTextarea, CButton } from '@coreui/react'
import API from '../../../../../service/api'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../../service/auth/UserProvider"

const Edit_User = (props) => {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    const initData = {
        ID_USER: '',
        USERNAME: '',
        PASSWORD: '',
        ALAMAT: '',
        NOMOR_TELEPON_PENANGGUNG_JAWAB: '',
        EMAIL: '',
        NAMA_PENANGGUNG_JAWAB: '',
    }
    const [data, setData] = useState(initData)

    useEffect(() => {
        setData(props.item)
        document.getElementById("passwordKlik").disabled = true;
    }, [props])

    const hendleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const klikAktif = () => {
        document.getElementById("passwordKlik").disabled = false;
        document.getElementById("passwordKlik").focus();
    }

    const hendleSubmit = (e) => {
        e.preventDefault()
        API.updateUserPenyelia(data).then(res => {
            if (res.authentication) {
                window.location.reload()
            }
            if (roles.includes('admin_penyelia')) {
                if (res.ubahPassword) {
                    console.clear()
                    history.push('/login');
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('baseID')
                    localStorage.removeItem('refreshToken')
                    localStorage.removeItem('session')
                }
            }
        })
    }

    return (
        <CForm onSubmit={hendleSubmit} action="" method="post" encType="multipart/form-data" className="form-horizontal">

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="nama_penanggungjawab">Nama Penyelia</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput value={data.NAMA_PENANGGUNG_JAWAB} onChange={hendleChange} required name="NAMA_PENANGGUNG_JAWAB" placeholder="Nama penyelia" type="text" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="username">Username</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput disabled value={data.USERNAME} onChange={hendleChange} required name="USERNAME" placeholder="Username" type="username" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="email">Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput value={data.EMAIL} onChange={hendleChange} required name="EMAIL" placeholder="Email" type="email" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="NOMOR_TELEPON_PENANGGUNG_JAWAB">Nomor HP</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput value={data.NOMOR_TELEPON_PENANGGUNG_JAWAB} onChange={hendleChange} required name="NOMOR_TELEPON_PENANGGUNG_JAWAB" placeholder="Nomor HP" type="number" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="alamat">Alamat</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CTextarea value={data.ALAMAT} onChange={hendleChange} required name="ALAMAT" row="2" placeholder="Alamat" type="text" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="password">Password</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    {roles.includes('admin_penyelia') && (
                        <CButton color="info" size="sm" className="mb-2" onClick={klikAktif}>
                            Ubah Password
                        </CButton>
                    )}
                    <CInput id="passwordKlik" onChange={hendleChange} name="PASSWORD" placeholder={roles.includes('admin_penyelia') ? "Klik untuk ubah password" : "********"} type="password" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>

            <div className="card-header-actions float-right mt-2">
                <CButton color="primary" size="sm" type="submit">
                    Simpan
                </CButton>
            </div>
        </CForm>
    )
}

export default Edit_User
