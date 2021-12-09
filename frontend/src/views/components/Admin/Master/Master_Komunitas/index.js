import React, { useContext, useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CRow, CDataTable, CImg, CButton } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../../service/auth/UserProvider"
import FormMasterKomunitas from './Form_MasterKomunitas'
import API from '../../../../../service/api'

const Master_Komunitas = () => {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('super_admin')) history.push('/');

    const fieldsUsers = [
        { key: 'NAMA_KOMUNITAS', label: 'NAMA KOMUNITAS' },
        { key: 'DEKSTOP_KETERANGAN_1', label: 'KETERANGAN LOGO 1' },
        { key: 'logo1', label: 'LOGO KIRI', _style: { width: '8%' }, sorter: false, filter: false },
        { key: 'DEKSTOP_KETERANGAN_2', label: 'KETERANGAN LOGO 2' },
        { key: 'logo2', label: 'LOGO KANAN', _style: { width: '8%' }, sorter: false, filter: false },
        // { key: 'Edit', label: '', _style: { width: '8%' }, sorter: false, filter: false },
    ];

    const [getKomunitas, setKomunitas] = useState([])
    const [loadingTbl, setLoadingTbl] = useState(true)
    useEffect(() => {
        API.getMasterKomunitas().then(res => {
            setKomunitas(res.data)
            setLoadingTbl(false)
        })
    }, [])

    return (
        <>

            <FormMasterKomunitas />

            <CRow>
                <CCol>
                    <CCard>
                        <CCardBody>
                            <CDataTable
                                items={getKomunitas}
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
                                    'logo1':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CImg width="100px" src={item.DEKSTOP_LOGO_1} />
                                                </td>
                                            )
                                        },
                                    'logo2':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CImg width="100px" src={item.DEKSTOP_LOGO_2} />
                                                </td>
                                            )
                                        },
                                    'Edit':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CButton
                                                        disabled
                                                        color="secondary"
                                                        size="sm"
                                                    >
                                                        Disabled
                                                    </CButton>
                                                </td>
                                            )
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

export default Master_Komunitas
