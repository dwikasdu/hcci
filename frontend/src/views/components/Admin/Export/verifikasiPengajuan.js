import React, { useContext, useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CButton,
    CBadge
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../service/auth/UserProvider"
import API from '../../../../service/api'
import SweetAlert from "react-bootstrap-sweetalert"

const VerifikasiPengajuan = () => {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('super_admin')) history.push('/');

    const [getDtaExport, setDataExport] = useState([])
    useEffect(() => {
        API.getDataPengajuanExport('').then(res => {
            setDataExport(res.data);
        })
    }, [])

    const fieldDataExport = [
        { key: 'NAMA_PENYELIA', _style: { TextAlign: 'center' }, label: 'PENYELIA' },
        { key: 'NAMA_PERUSAHAAN', _style: { TextAlign: 'center' }, label: 'NAMA PERUSAHAAN' },
        { key: 'CONTENT', _style: { TextAlign: 'center' }, label: 'TUJUAN' },
        { key: 'status', label: 'STATUS', _style: { width: '8%', TextAlign: 'center' }, sorter: false, filter: false },
        { key: 'verifikasi', label: '', _style: { width: '8%', TextAlign: 'center' }, sorter: false, filter: false },
    ];

    const statusColor = (status) => {
        switch (status) {
            case 0:
                return "secondary";
            case 1:
                return "success";
            default:
                return 0;
        }
    }

    const [alertEdits, setAlertEdit] = useState(null)
    const hendleVerifikasi = (id) => {
        API.verifikasiExportData(id).then(res => {
            setAlertEdit(
                <SweetAlert
                    success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    title="Export Data Disetujui."
                    onConfirm={() => {
                        setAlertEdit(null)
                    }}
                >
                </SweetAlert>
            )
            API.getDataPengajuanExport('').then(res => {
                setDataExport(res.data);
            })
        })
    }

    return (
        <>
            {alertEdits}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>VERIFIKASI PENGAJUAN EXPORT DATA</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={getDtaExport}
                                fields={fieldDataExport}
                                tableFilter
                                columnFilter
                                itemsPerPageSelect
                                striped
                                border={true}
                                itemsPerPage={10}
                                hover
                                sorter
                                pagination
                                scopedSlots={{
                                    'verifikasi':
                                        (item, index) => {
                                            if (item.IS_AKTIF === 0) {
                                                return (
                                                    <td className="py-2">
                                                        <CButton onClick={() => hendleVerifikasi(item.ID)} color="primary">Verifikasi</CButton>
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td className="py-2">
                                                        <CButton disabled color="secondary">Aktif</CButton>
                                                    </td>
                                                )
                                            }
                                        },
                                    'status':
                                        (item, index) => {
                                            return (
                                                <td className="py-2 text-center">
                                                    <CBadge color={statusColor(item.IS_AKTIF)}>
                                                        {item.IS_AKTIF === 0 ? 'SEDANG PEROSES' : item.IS_AKTIF === 1 ? 'AKTIF' : 'SEDANG PEROSES'}
                                                    </CBadge>
                                                </td>
                                            )
                                        }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default VerifikasiPengajuan
