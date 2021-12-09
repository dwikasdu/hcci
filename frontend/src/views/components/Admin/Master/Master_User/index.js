import React, { useContext, useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CDataTable,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../../service/auth/UserProvider"
import API from '../../../../../service/api'
import EditeUser from './Edit_User'
import TambahUser from './Tambah_User'

function Master_User() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
    }

    const [adminUser, setDataAdmin] = useState([])
    const [loadingTbl, setLoadingTbl] = useState(true)
    useEffect(() => {
        API.getAdminUser().then(res => {
            setDataAdmin(res.data);
            setLoadingTbl(false)
        })
    }, [])


    const fieldsUsers = [
        { key: 'ID_USER', label: 'ID' },
        { key: 'NAMA_PENANGGUNG_JAWAB', label: 'NAMA' },
        { key: 'NOMOR_TELEPON_PENANGGUNG_JAWAB', label: 'NOMOR TELEPON' },
        { key: 'USERNAME', label: 'USERNAME' },
        { key: 'EMAIL', label: 'EMAIL' },
        { key: 'JABATAN', label: 'JABATAN' },
        { key: 'Edit', label: '', _style: { width: '8%' }, sorter: false, filter: false },
    ];

    const [getModalEdit, setModalEdit] = useState(false)
    const [getItemEdit, setItemEdit] = useState([])
    const hendleEdit = (item) => {
        setModalEdit(true)
        setItemEdit(item)
    }

    const [getModalTambah, setModalTambah] = useState(false)

    return (
        <>
            <CModal fade={true} closeOnBackdrop={false} className="modalDetail" shouldCloseOnOverlayClick={false} size="lg" show={getModalTambah} onClose={() => setModalTambah(!getModalTambah)}>
                <CModalHeader closeButton>
                    <CModalTitle><strong>TAMBAH PENYELIA</strong></CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <TambahUser />
                </CModalBody>
            </CModal>

            <CModal fade={true} closeOnBackdrop={false} className="modalDetail" shouldCloseOnOverlayClick={false} size="lg" show={getModalEdit} onClose={() => setModalEdit(!getModalEdit)}>
                <CModalHeader closeButton>
                    <CModalTitle><strong>EDIT USER PENYELIA</strong></CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <EditeUser item={getItemEdit} />
                </CModalBody>
            </CModal>

            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>Master Penyelia</strong>
                            <div className="card-header-actions">
                                {roles.includes('super_admin') && (
                                    <CButton color="primary" size="sm" onClick={() => setModalTambah(true)}>
                                        Tambah User
                                    </CButton>
                                )}
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={adminUser}
                                fields={fieldsUsers}
                                tableFilter
                                columnFilter
                                itemsPerPageSelect
                                striped
                                border={true}
                                itemsPerPage={10}
                                loading={loadingTbl}
                                hover
                                sorter
                                pagination
                                scopedSlots={{
                                    'Edit':
                                        (item, index) => {
                                            if (item.ID_USER === id_user || roles.includes('super_admin')) {
                                                return (
                                                    <td className="py-2">
                                                        <CButton color="info" size="sm"
                                                            onClick={() => {
                                                                hendleEdit(item)
                                                            }}>
                                                            Edit
                                                        </CButton>
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td className="py-2">
                                                        <CButton
                                                            disabled
                                                            color="secondary"
                                                            size="sm"
                                                        >
                                                            Edit
                                                        </CButton>
                                                    </td>
                                                )
                                            }
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Master_User
