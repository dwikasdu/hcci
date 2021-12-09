import React, { useContext } from 'react'
import { CAlert } from '@coreui/react'
import { useHistory } from 'react-router-dom';
import UserDashboard from '../components/User/dashboard/UserDashboard'
import AdminDashboard from '../components/Admin/dashboard/AdminDashboard'
import { AuthContext } from "../../service/auth/UserProvider"
import SweetAlert from "react-bootstrap-sweetalert"

const Dashboard = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(AuthContext);
  let roles = []
  state.isAuthenticated ? roles = state.user.roles : roles = []

  if (roles.includes('tidak_aktif')) {
    return (
      <>
        <CAlert color="danger"><center>akun anda belum aktif</center></CAlert>
      </>
    )
  } else if (roles.includes('user')) {
    return (
      <>
        <UserDashboard />
      </>
    )
  } else if (roles.includes('admin_penyelia') || roles.includes('super_admin')) {
    return (
      <>
        <AdminDashboard />
      </>
    )
  } else {
    return (
      <>
        <SweetAlert
          danger
          confirmBtnText="OK"
          confirmBtnBsStyle="danger"
          title="Maaf Akses Anda Ditolak!"
          onConfirm={() => {
            history.push('/login');
            dispatch({
              type: "LOGOUT"
            });
            console.clear()
          }}
        >
          Mohon Login Kembali dengan akun yang valid!
        </SweetAlert>
      </>
    )
  }
}

export default Dashboard
