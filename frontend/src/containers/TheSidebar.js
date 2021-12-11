import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  // CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// import CIcon from '@coreui/icons-react'

// sidebar nav config
import navList from './_nav'
import { AuthContext } from "../service/auth/UserProvider"

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const { state } = useContext(AuthContext);
  let roles = []
  if (state.user === null) {
    dispatch({
      type: "LOGOUT"
    });
    console.clear()
    localStorage.clear()
  }
  state.isAuthenticated ? roles = state.user.roles : roles = []

  const navigation = navList.filter(item => {
    const res = item.role
    if (state.isAuthenticated) {
      if (res) {
        const userRoles = state.data.data.roles;
        for (let i = 0; i < res.length; i++) {
          if (userRoles.includes(res[i])) {
            return true
          }
        }
        return false
      } else return true
    } else return false
  })

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <h4><strong>{roles.includes('user') ? 'HC-UM UMKM' : 'HC-UM ADMIN'}</strong></h4>
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        /> */}
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
