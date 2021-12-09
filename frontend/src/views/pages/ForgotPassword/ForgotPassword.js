import React, { useState } from 'react'
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

const ForgotPassword = (props) => {


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
            email: dataform.email
        }

        API.lupaPassword(requestBody).then(res => {
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
                        😊 {res.message}, Periksa email anda segera.
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
                                            <CInputGroup className="mb-3">
                                                <CInputGroupPrepend>
                                                    <CInputGroupText>
                                                        <CIcon name="cil-user" />
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                                <CInput
                                                    type="email"
                                                    onChange={handleInputChange}
                                                    name="email"
                                                    id="user"
                                                    required
                                                    placeholder="email Anda"
                                                    value={dataform.email}
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

export default ForgotPassword
