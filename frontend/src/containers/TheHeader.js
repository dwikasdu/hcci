import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  // CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  // CLink
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'
import { AuthContext } from "../service/auth/UserProvider"

import {
  // TheHeaderDropdownMssg,
  // TheHeaderDropdownNotif,
  // TheHeaderDropdownTasks,
  TheHeaderDropdown
} from './index'
import Darkmode from '../service/DarkMode/dark-mode-toggle'
import useDarkMode from '../service/DarkMode/use-dark-mode'

const TheHeader = () => {
  const { state } = useContext(AuthContext);
  let roles = []
  state.isAuthenticated ? roles = state.user.roles : roles = []

  const auth = localStorage.getItem('session') ? JSON.parse(window.atob(localStorage.getItem('session'))) : null;

  const dispatch = useDispatch()


  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let res_month = "";
  if (month < 10) {
    res_month = "0" + month;
  } else {
    res_month = "" + month;
  }
  let year = newDate.getFullYear();
  let hari = newDate.getDay();
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  var dayName = days[hari];


  const [darkMode, setDarkMode] = useDarkMode(false);

  return (
    <CHeader withSubheader>
      <button inHeader className="c-header-toggler ml-md-3 d-lg-none" onClick={toggleSidebarMobile}>
        <svg fill={darkMode ? '#bdc1c6' : '#3c4b64bf'} width="24" height="24" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
      </button>
      <button inHeader className="c-header-toggler ml-3 d-md-down-none" onClick={toggleSidebar}>
        <svg fill={darkMode ? '#bdc1c6' : '#3c4b64bf'} width="24" height="24" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
      </button>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <h4><strong>{roles.includes('user') ? 'HCCI UMKM' : 'HCCI ADMIN'}</strong></h4>
        {/* <CIcon name="logo" height="48" alt="Logo" /> */}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        {/* <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}

        <CHeaderNavItem className="px-3">
          <CHeaderNavLink><h4><strong>{auth ? state.isAuthenticated && roles.includes('user') ? state.user.NAMA_PERUSAHAAN.toUpperCase() : roles.includes('super_admin') ? `${state.user.nama_penanggung_jawab} (Super Admin)` : `${state.user.nama_penanggung_jawab} (Penyelia)` : null}</strong></h4></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/> */}
        <Darkmode darkMode={darkMode} setDarkMode={setDarkMode} />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          {/* <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
          </CLink> */}
          {dayName + ", " + date + "-" + res_month + "-" + year}
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
