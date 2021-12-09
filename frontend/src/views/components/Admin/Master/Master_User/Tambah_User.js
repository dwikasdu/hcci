import { CForm, CFormGroup, CCol, CLabel, CInput, CTextarea, CButton, CAlert } from '@coreui/react'
import React, { useState } from 'react'
import API from '../../../../../service/api'

const Tambah_User = () => {
    const initData = {
        USERNAME: '',
        PASSWORD: '',
        ALAMAT: '',
        NOMOR_TELEPON_PENANGGUNG_JAWAB: '',
        EMAIL: '',
        NAMA_PENANGGUNG_JAWAB: '',
    }
    const [data, setData] = useState(initData)

    const hendleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const [msgAlert, setAlert] = useState(null)
    const hendleSubmit = (e) => {
        e.preventDefault()
        API.registerPenyelia(data).then(res => {
            if (res.isRegistered) {
                setAlert(
                    <CAlert color="success">
                        {res.message}
                    </CAlert>
                )
                window.location.reload()
                setData(initData)
            } else {
                setAlert(
                    <CAlert color="danger">
                        {res.message}
                    </CAlert>
                )
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
                    <CInput value={data.USERNAME} onChange={hendleChange} required name="USERNAME" placeholder="Username" type="username" style={{ fontWeight: "bolder" }} />
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
                    <CInput value={data.PASSWORD} onChange={hendleChange} required name="PASSWORD" placeholder="password" type="password" style={{ fontWeight: "bolder" }} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                </CCol>
                <CCol xs="12" md="9">
                    {msgAlert}
                </CCol>
            </CFormGroup>
            <div className="card-header-actions float-right mt-2">
                <CButton color="info" size="sm" type="submit">
                    Tambah User
                </CButton>
            </div>
        </CForm>
    )
}

export default Tambah_User
