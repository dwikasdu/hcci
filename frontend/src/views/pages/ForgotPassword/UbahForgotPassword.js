import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CAlert,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import API from "../../../service/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeaderFooter from '../header_footer/HeaderFooter'

const UbahForgotPassword = (props) => {

    const querySearch = new URLSearchParams(window.location.search).get('_key');

    const [getExpired, cekExpired] = useState(false)
    useEffect(() => {
        API.cekExpiredUbahPassword(querySearch).then(res => {
            cekExpired(res.isVerified)
        })
    }, [querySearch])


    const initialState = {
        isSubmitting: false,
        errorMessage: null,
        // isVerified: false
    }

    const stateForm = {
        email: "",
        password: ""
    }


    const [data, setData] = useState(initialState)
    const [dataform, setDataForm] = useState(stateForm)

    const handleInputChange = event => {
        setDataForm({
            ...dataform,
            [event.target.name]: event.target.value,
        })

    }

    const [showMsg, setMsg] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFormSubmit = event => {
        event.preventDefault()
        setLoading(true)

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        })

        const requestBody = {
            param_token: querySearch,
            token: dataform.token,
            password: dataform.password
        }

        if (dataform.password !== dataform.repassword) {
            setMsg(
                <CAlert color="danger">
                    Pastikan password yang anda tulis sesuai! 😞
                </CAlert>
            )
        } else {
            API.ubahLupaPassword(requestBody).then(res => {
                if (res.isRegistered) {
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
                    setMsg(
                        <CAlert color="success">
                            😊 {res.message}
                        </CAlert>
                    );
                } else {
                    toast(res.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        type: "error"
                    });
                    setMsg(
                        <CAlert color="danger">
                            😞 {res.message}
                        </CAlert>
                    )
                }
                setLoading(false)
            })
        }

    }
    return (
        <HeaderFooter>
            <section id="hero" className="hero d-flex align-items-center">
                <CContainer>
                    <ToastContainer />
                    <CRow className="justify-content-center">
                        <CCol md="6" xs="4" sm="4">
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm onSubmit={handleFormSubmit}>
                                            <h1>Lupa Password?</h1>
                                            <p className="text-muted">Gunakan email akun anda untuk mereset ulang password!</p>
                                            {getExpired ? (
                                                <>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupPrepend>
                                                            <CInputGroupText>
                                                                <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M22 17V16.5C22 15.12 20.88 14 19.5 14S17 15.12 17 16.5V17C16.45 17 16 17.45 16 18V22C16 22.55 16.45 23 17 23H22C22.55 23 23 22.55 23 22V18C23 17.45 22.55 17 22 17M21 17H18V16.5C18 15.67 18.67 15 19.5 15S21 15.67 21 16.5V17M8 8C8 5.79 9.79 4 12 4S16 5.79 16 8 14.21 12 12 12 8 10.21 8 8M14 20H4V18C4 15.79 7.58 14 12 14C13.27 14 14.46 14.15 15.53 14.41C15.32 14.82 15.15 15.25 15.07 15.71C14.42 16.26 14 17.08 14 18V20Z" /></svg>
                                                            </CInputGroupText>
                                                        </CInputGroupPrepend>
                                                        <CInput
                                                            type="text"
                                                            onChange={handleInputChange}
                                                            name="token"
                                                            id="token"
                                                            required
                                                            placeholder="Token Anda"
                                                            value={dataform.token}
                                                        />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupPrepend>
                                                            <CInputGroupText>
                                                                <CIcon name="cil-lock-locked" />
                                                            </CInputGroupText>
                                                        </CInputGroupPrepend>
                                                        <CInput
                                                            type="password"
                                                            onChange={handleInputChange}
                                                            name="password"
                                                            id="password"
                                                            required
                                                            placeholder="password Anda"
                                                            value={dataform.password}
                                                        />
                                                    </CInputGroup>
                                                    <CInputGroup className="mb-3">
                                                        <CInputGroupPrepend>
                                                            <CInputGroupText>
                                                                <CIcon name="cil-lock-locked" />
                                                            </CInputGroupText>
                                                        </CInputGroupPrepend>
                                                        <CInput
                                                            type="password"
                                                            onChange={handleInputChange}
                                                            name="repassword"
                                                            id="repassword"
                                                            required
                                                            placeholder="Tulis ulang password Anda"
                                                            value={dataform.repassword}
                                                        />
                                                    </CInputGroup>
                                                    {showMsg}
                                                    <CRow>
                                                        <CCol xs="6">
                                                            {loading ? (
                                                                <button className="btn btn-primary" type="button" disabled>
                                                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                                    Loading...
                                                                </button>
                                                            ) : (
                                                                <CButton type="submit" color="primary" className="px-4">Kirim</CButton>
                                                            )}
                                                        </CCol>
                                                        <CCol xs="6" className="text-right">
                                                            <Link color="link" className="px-0" to="/login">Login?</Link>
                                                        </CCol>
                                                    </CRow>
                                                </>
                                            ) : (
                                                <CAlert color="danger">
                                                    URL ubah password Expired! 😞
                                                </CAlert>
                                            )}
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </section>
        </HeaderFooter>
    )
}

export default UbahForgotPassword
