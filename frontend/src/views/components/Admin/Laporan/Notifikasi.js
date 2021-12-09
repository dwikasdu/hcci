import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CButton, CLabel, CInput, CFormGroup, CModal, CModalHeader, CModalTitle, CModalBody, CTextarea, CForm, CModalFooter } from '@coreui/react'
import API from '../../../../service/api'
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css'
import SearchUMKMByPenyelia from '../Master/Master_UMKM/Search_UMKM_By_Penyelia'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const fields = [
    {
        key: 'DETAIL',
        label: '',
        _style: { width: '1%', textAlign: 'center' },
        sorter: false,
        filter: false
    },
    { key: 'PENGIRIM', _style: { width: '10%', textAlign: 'center' } },
    { key: 'KETERANGAN', _style: { width: '30%', textAlign: 'center' } },
    {
        key: 'TANGGAL',
        label: 'TANGGAL',
        _style: { width: '1%', textAlign: 'center' },
        sorter: false,
        filter: false
    },
]

function Notifikasi() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_penyelia = '';
    var nama_penanggung_jawab = '';
    if (state.isAuthenticated === true) {
        id_penyelia = state.user.ID_USER;
        nama_penanggung_jawab = state.user.nama_penanggung_jawab;
    }

    const [dataUserNotifikasi, setDataNotifikasi] = useState([])
    useEffect(() => {
        API.getNotifikasiByPenyelia(id_penyelia).then(res => {
            setDataNotifikasi(res.data)
        })
    }, [id_penyelia])


    const [query, setQuery] = useState('')
    const {
        dataUMKM,
        // hasMore,
        loading,
        // totalSemua,
        // error
    } = SearchUMKMByPenyelia(query, 1, 10, id_penyelia)
    const initDataSerach = {
        ALAMAT: "",
        CREATE_DATE: "",
        EMAIL: "",
        ID_USER: "",
        NAMA_PERUSAHAAN: "",
        NOMOR_TELEPON: "",
        PROSES: "",
    }
    const [getDataSearch, setDataSerach] = useState(initDataSerach)
    const [getModalKirimPesan, setModalKirimPesan] = useState(false);

    const hendlesubmit = (e) => {
        let id_pengirim = id_penyelia;
        let id_penerima = getDataSearch.ID_USER;
        let pengirim = 'PENYELIA'
        let keterangan = e.target[3].value;
        let data = { id_pengirim, id_penerima, pengirim, keterangan };
        setModalKirimPesan(!getModalKirimPesan)
        API.insNotification(data).then(res => {
            toast(`😊 Pesan Terkirim.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            API.getNotifikasiByPenyelia(id_penyelia).then(res => {
                setDataNotifikasi(res.data)
            })
        })
    };

    return (
        <CRow>
            <ToastContainer />
            <CCol>
                <CCard>
                    <CCardHeader>
                        <strong>NOTIFIKASI</strong>
                        <div className="card-header-actions">
                            <CButton onClick={() => setModalKirimPesan(!getModalKirimPesan)} color="primary" size="sm" className="btn-brand mr-1 mb-1">
                                <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
                                Tulis Pesan
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CModal show={getModalKirimPesan} onClose={() => setModalKirimPesan(!getModalKirimPesan)} size="lg">
                        <CModalHeader closeButton>
                            <CModalTitle>Kirim Pesan</CModalTitle>
                        </CModalHeader>
                        <CForm onSubmit={e => { e.preventDefault(); hendlesubmit(e); }}>
                            <CModalBody>
                                <CFormGroup row className="my-0" style={{ margin: "0 auto" }}>
                                    <CCol>
                                        <CFormGroup row>
                                            <CCol md="2">
                                                <CLabel htmlFor="dari"><strong>Dari</strong></CLabel>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                <CInput readOnly value={nama_penanggung_jawab} placeholder="dari" name="merk" type="text" style={{ fontWeight: "bolder" }} />
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol md="2">
                                                <CLabel htmlFor="kepada"><strong>Kepada</strong></CLabel>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                <AsyncTypeahead
                                                    id="async-example"
                                                    inputProps={{ required: true, style: { fontWeight: "bolder" } }}
                                                    isLoading={loading}
                                                    labelKey="NAMA_PERUSAHAAN"
                                                    minLength={1}
                                                    onSearch={setQuery}
                                                    options={dataUMKM}
                                                    useCache={true}
                                                    onChange={e => setDataSerach(e[0])}
                                                    placeholder="Kepada..."
                                                    renderMenuItemChildren={(option, props) => {
                                                        return (
                                                            <>
                                                                <span>{`${option.NAMA_PERUSAHAAN}`}</span>
                                                            </>
                                                        )
                                                    }}
                                                />
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol md="2">
                                                <CLabel htmlFor="pesan"><strong>Pesan</strong></CLabel>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                <CTextarea required rows="4" placeholder="Type here...." name="kirimPesan" type="text" id="pesan" />
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                            </CModalBody>
                            <CModalFooter>
                                <CButton type="submit" color="primary">Kirim</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>
                    <CCardBody>
                        <CDataTable bordered borderColor="primary"
                            items={dataUserNotifikasi}
                            fields={fields}
                            tableFilter
                            striped
                            border={true}
                            hover
                            sorter
                            scopedSlots={{
                                'TANGGAL':
                                    (item) => (
                                        <td style={{ textAlign: 'center' }}>
                                            <CBadge color="success">
                                                {item.TANGGAL}
                                            </CBadge>
                                        </td>
                                    ),
                                'DETAIL':
                                    (item, index) => {
                                        return (
                                            <td className="py-2" style={{ textAlign: 'center' }}>
                                                <Link to={`/notifikasi-admin/timeline-notifikasi/notif?_id=${window.btoa(item.ID_PENGIRIM)}`}>
                                                    <CButton color="primary" size="sm" title="Print Dokumen">
                                                        Detail
                                                    </CButton>
                                                </Link>
                                            </td>
                                        )
                                    },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Notifikasi
