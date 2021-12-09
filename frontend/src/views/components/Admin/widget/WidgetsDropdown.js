import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import ChartLineSimple from '../../../charts/ChartLineSimple'
import ChartBarSimple from '../../../charts/ChartBarSimple'

import API from '../../../../service/api'
import { AuthContext } from "../../../../service/auth/UserProvider"

const WidgetsDropdown = () => {
  const { state } = useContext(AuthContext);
  let roles = []
  state.isAuthenticated ? roles = state.user.roles : roles = []

  var id_user = '';
  if (state.isAuthenticated === true) {
    id_user = state.user.ID_USER;
  }

  const data = [{
    "Month": 0,
    "REGISTERED": 0
  }]
  const dataPenyelia = {
    TOTAL_SEMUA_UMKM: 0,
    TOTAL_UMKM: 0,
    TOTAL_PRODUK: 0,
    TOTAL_SEMUA_PRODUK: 0,
    TOTAL_KUNJUNGAN: 0,
    TOTAL_SEMUA_KUNJUNGAN: 0,
    TOTAL_REALISASI_KUNJUNGAN: 0,
    TOTAL_SEMUA_REALISASI_KUNJUNGAN: 0
  }
  const [jumlahUmkm, setJumlahUMKM] = useState(dataPenyelia)
  const [terdaftar, setTerdaftar] = useState(data)
  var result = Object.keys(terdaftar).map((key) => terdaftar[key].REGISTERED);

  let newDate = new Date()
  let year = newDate.getFullYear();
  let month = newDate.getMonth() + 1;
  let res_month = "";
  if (month < 10) {
    res_month = "0" + month;
  } else {
    res_month = "" + month;
  }
  const rolstatus = roles.includes('super_admin') ? '%' : roles.includes('admin_penyelia') ? id_user : 0;

  useEffect(() => {
    API.getTotalUmkm({ id_penyelia: rolstatus, bulan: res_month, tahun: year }).then(res => {
      setJumlahUMKM(res.data[0]);
    });
    API.getTerdaftarTiapBulan(year).then(res => {
      setTerdaftar(res.data);
    });
  }, [year, id_user, res_month, rolstatus]);

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <Link to="/master-umkm">
          <CWidgetDropdown
            color="gradient-primary"
            header={roles.includes('super_admin') ? `${jumlahUmkm.TOTAL_SEMUA_UMKM}` : roles.includes('admin_penyelia') ? `${jumlahUmkm.TOTAL_UMKM}` : '0'}
            text={roles.includes('super_admin') ? `Total UMKM` : roles.includes('admin_penyelia') ? `UMKM Terdaftar` : ''}
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: '70px' }}
                dataPoints={result}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle caret={false} color="transparent">
                <CIcon content={freeSet.cilAddressBook} />
              </CDropdownToggle>
            </CDropdown>
          </CWidgetDropdown>
        </Link>
      </CCol>

      <CCol sm="6" lg="3">
        <Link to="/master-produk">
          <CWidgetDropdown
            color="gradient-info"
            header={`${jumlahUmkm.TOTAL_PRODUK}`}
            text="Total Produk"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                pointHoverBackgroundColor="info"
                options={{ elements: { line: { tension: 0.00001 } } }}
                label="Members"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle caret={false} color="transparent">
                <CIcon name="cil-location-pin" />
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </Link>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={`${jumlahUmkm.TOTAL_KUNJUNGAN}`}
          text="Jadwal Kunjungan"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: '70px' }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={`${jumlahUmkm.TOTAL_REALISASI_KUNJUNGAN}`}
          text="Realisasi Kunjungan"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
