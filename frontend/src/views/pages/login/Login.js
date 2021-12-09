import React, { useState, useContext } from 'react'
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
import { useHistory } from "react-router";
import { AuthContext } from "../../../service/auth/UserProvider";
import API from "../../../service/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeaderFooter from '../header_footer/HeaderFooter'


const Login = (props) => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();


  const initialState = {
    isSubmitting: false,
    errorMessage: null,
    // isVerified: false
  }

  const stateForm = {
    username: "",
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

  const [loading, setLoading] = useState(false)
  const [alertError, setAlert] = useState(false)
  const handleFormSubmit = event => {
    event.preventDefault()
    setLoading(true)

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })

    const requestBody = {
      email_or_username: dataform.username,
      password: dataform.password
    }

    API.Login(requestBody).then(res => {
      if (res.authentication) {
        toast(`Selamat datang ${res.data.NAMA_PERUSAHAAN}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "success"
        });
        dispatch({
          type: "LOGIN",
          payload: res,
        });
        history.push("/dashboard");
      } else {
        setAlert(
          <CAlert color="danger">
            {res.message} 😞
          </CAlert>
        )
      }
      setLoading(false);
    })
  }
  return (
    <>
      <HeaderFooter>
        <section id="hero" className="hero d-flex align-items-center">
          <CContainer style={{ zIndex: "1" }}>
            <ToastContainer />
            <CRow className="justify-content-center">
              <CCol md="6">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={handleFormSubmit}>
                        <h1>Masuk</h1>
                        <p className="text-muted">Masuk ke akun anda</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            onChange={handleInputChange}
                            name="username"
                            id="user"
                            required
                            placeholder="Username atau Email"
                            value={dataform.username}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            onChange={handleInputChange}
                            name="password"
                            id="examplePassword"
                            required
                            placeholder="Password anda"
                            value={dataform.password}
                          />
                        </CInputGroup>
                        {alertError}
                        <CRow>
                          <CCol xs="6">
                            {loading ? (
                              <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </button>
                            ) : (
                              <CButton type="submit" color="primary" className="px-4">Masuk</CButton>
                            )}
                          </CCol>
                          <CCol xs="6" className="text-right">
                            <Link color="link" className="px-0" to="/lupa-password">Lupa password?</Link>
                          </CCol>
                        </CRow>
                      </CForm>
                      <br />
                      <p>Belum punya akun? <Link to="/register">Register</Link></p>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </section>
      </HeaderFooter>
    </>
  )
}

export default Login
