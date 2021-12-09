import React, { Suspense, useContext, useEffect, useState } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade, CSpinner } from '@coreui/react'

import { useHistory } from 'react-router-dom'
import { AuthContext } from "../service/auth/UserProvider"
import axios from 'axios'
import API from '../service/api'

import SweetAlert from "react-bootstrap-sweetalert"

import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <CSpinner style={{ color: "#099f9f" }} />
  </div>
)

const TheContent = () => {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory()
  const getAuth = localStorage.getItem('accessToken');

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";
    if (condition === "offline") {
      setPageAuth(
        <SweetAlert
          confirmBtnText="OK"
          confirmBtnBsStyle="danger"
          title={<svg fill="#d43f3a" width="50" height="50" viewBox="0 0 24 24"><path d="M12 12C9.97 12 8.1 12.67 6.6 13.8L4.8 11.4C6.81 9.89 9.3 9 12 9S17.19 9.89 19.2 11.4L17.92 13.1C17.55 13.17 17.18 13.27 16.84 13.41C15.44 12.5 13.78 12 12 12M21 9L22.8 6.6C19.79 4.34 16.05 3 12 3S4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6S18.5 7.12 21 9M12 15C10.65 15 9.4 15.45 8.4 16.2L12 21L13.04 19.61C13 19.41 13 19.21 13 19C13 17.66 13.44 16.43 14.19 15.43C13.5 15.16 12.77 15 12 15M21.12 15.46L19 17.59L16.88 15.47L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88L21.12 15.46Z" /></svg>}
          onConfirm={() => {
            window.location.reload()
          }}
        >
          <h1>Internet Terputus!</h1><br /><p>Mohon hubungkan perangkat anda Kembali!</p>
        </SweetAlert>
      )
    } else if (condition === "online") {
      setPageAuth(null)
    }
  }


  if (state.isAuthenticated === true) {
    var token = localStorage.getItem('accessToken');
    if (state.data.token !== token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${state.data.token}`;
    }
  } else {
    history.push('/login');
  }



  const [authentication, stAuthentication] = useState(false)
  useEffect(() => {
    if (getAuth) {
      API.refreshToken(localStorage.getItem('refreshToken')).then(response => {
        localStorage.setItem("accessToken", response.accessToken);
        stAuthentication(response.success);
      });
      API.veryfyToken(localStorage.getItem('accessToken')).then((res) => {
        stAuthentication(res.authentication);
      });
    }
  }, [state, getAuth])

  const [pageAuth, setPageAuth] = useState(true)

  const [respon, setRespon] = useState(null)
  axios.interceptors.response.use(undefined, (error) => {
    setRespon(error.statusText)
    if (error.message === 'Network Error' && !error.response) {
      alert('Network error - Pastikan API berjalan!')
    }
    const { status, data } = error.response;
    if (status === 401 || status === 404 || data.message === 'Access token expired' || authentication === false || respon === "Unauthorized" || getAuth === undefined) {
      setPageAuth(
        <SweetAlert
          warning
          confirmBtnText="OK"
          confirmBtnBsStyle="danger"
          title="Maaf Sesi Anda Telah Habis"
          onConfirm={() => {
            dispatch({
              type: "LOGOUT"
            });
            console.clear()
            history.push('/login');
            localStorage.removeItem('accessToken')
            localStorage.removeItem('baseID')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('session')
          }}
        >
          Mohon Login Kembali!
        </SweetAlert>
      );
      setTimeout(() => {
        dispatch({
          type: "LOGOUT"
        });
        console.clear()
        window.location.replace('/login');
        localStorage.removeItem('accessToken')
        localStorage.removeItem('baseID')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('session')
      }, 1500);
    }
    if (status === 505) {
      alert("Server error")
    }
    throw error.response
  })

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          {pageAuth}
          <Switch>
            {routes.map((route, idx) => {
              return route.component && state && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props =>
                    getAuth !== null || getAuth !== undefined
                      ? (
                        <CFade>
                          <route.component {...props} />
                        </CFade>
                      ) : (
                        <Redirect to={{ pathname: "/home" }} />
                      )} />
              )
            })}
            {getAuth !== null && getAuth !== undefined ? (
              <Redirect from="/" to="/dashboard" />
            ) : (
              <Redirect from="/" to="/home" />
            )}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
