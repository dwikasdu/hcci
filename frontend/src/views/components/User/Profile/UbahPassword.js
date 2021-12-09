import React, { useContext, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CInput,
    CLabel,
    CFormGroup,
    CForm,
    CButton,
    CAlert
} from '@coreui/react'

import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from "react-bootstrap-sweetalert"
import API from '../../../../service/api'

function UbahPassword(props) {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('user')) history.push('/');

    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
    }

    const data = {
        last_password: "",
        new_password: "",
        re_password: ""
    }
    const [passwd, setPassword] = useState(data)

    const [loadingPassword, setLoadingSavePassword] = useState(false)
    const handleInputChange = event => {
        const { name, value } = event.target
        setPassword({ ...passwd, [name]: value })
    }

    const [emailHas, setEmailHas] = useState(null)
    const [alertSuccess, setAlsuccs] = useState(null)
    const onHendleSubmit = (event) => {
        event.preventDefault()
        setLoadingSavePassword(true)
        if (passwd.re_password === passwd.new_password) {
            API.ubahPassword(id_user, passwd).then(res => {
                if (res.isRegistered) {
                    setAlsuccs(
                        <SweetAlert
                            success
                            confirmBtnText="OK"
                            confirmBtnBsStyle="success"
                            title={res.message}
                            onConfirm={() => {
                                setAlsuccs(null)
                                window.location.reload()
                            }}
                        >
                        </SweetAlert>
                    );
                    toast(`${res.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: "success"
                    });
                    localStorage.setItem("refreshToken", undefined)
                    setEmailHas(
                        <CAlert color="success">
                            😊 {res.message}
                        </CAlert>
                    )
                } else {
                    toast(`${res.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: "warning"
                    });
                    setEmailHas(
                        <CAlert color="danger">
                            😞 {res.message}
                        </CAlert>
                    )
                }
                setLoadingSavePassword(false)
            })
        } else {
            setEmailHas(
                <CAlert color="danger">
                    😞 Password baru Tidak sama
                </CAlert>
            )
        }
    }

    return (
        <>
            {alertSuccess}
            <ToastContainer />
            <CCard>
                <CCardHeader>
                    <strong>Ubah Password</strong>
                </CCardHeader>
                <CCardBody>
                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="keterangan">Username</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput readOnly value={props.user} name="USERNAME" type="text" />
                        </CCol>
                    </CFormGroup>
                    <CForm onSubmit={onHendleSubmit} action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="keterangan">Password Sebelumnya</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput required value={passwd.last_password} onChange={handleInputChange} placeholder="Password sebelumnya..." name="last_password" type="password" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="keterangan">Password Baru</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput required value={passwd.new_password} onChange={handleInputChange} placeholder="Password Baru" name="new_password" type="password" />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="keterangan">Ulang Password Baru</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput required value={passwd.re_password} onChange={handleInputChange} placeholder="Ulang Password Baru..." name="re_password" type="password" />
                            </CCol>
                        </CFormGroup>
                        {emailHas}
                        <CFormGroup row style={{ float: "right" }}>
                            <CCol>
                                {loadingPassword ? (
                                    <span className="card-header-action" style={{ float: "right" }}>
                                        <button className="btn btn-success" type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    </span>
                                ) : (
                                    <CButton className="card-header-actions" type="submit" value="Submit" color="success">
                                        Simpan
                                    </CButton>
                                )}
                            </CCol>
                        </CFormGroup>
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    )
}

export default UbahPassword