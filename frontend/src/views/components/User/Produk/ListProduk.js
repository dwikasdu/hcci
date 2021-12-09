import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CCollapse,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
} from '@coreui/react'
import API from '../../../../service/api'
import { AuthContext } from "../../../../service/auth/UserProvider"
import BillOfMaterials from './BillOfMaterials'
import StepProduksi from './StepProduksi'
import DokumenProduk from '../dokumen'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProduk = () => {
    const { state } = useContext(AuthContext);
    var id_user = '';
    var penanggung_jwb = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
        penanggung_jwb = state.user.nama_penanggung_jawab
    }

    const [namaProduk, setNamaProduk] = useState([])
    const [cekPendampingan, setCekPendampingan] = useState([])
    const [getbillOfMaterials, setBillOfMaterials] = useState([])
    const [getStepByUser, setStepByUser] = useState([])

    useEffect(() => {
        API.getProduk(id_user).then(res => {
            setNamaProduk(res.data);
        });
        API.getCekPendampingan(id_user).then(res => {
            setCekPendampingan(res.data[0]);
        });
        API.getBOMByUserId(id_user).then(res => {
            setBillOfMaterials(res.data);
        });
        API.getBstepProduksiByUserId(id_user).then(res => {
            setStepByUser(res.data);
        })
    }, [id_user])

    const [details, setDetails] = useState([])

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const fields = [
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        { key: 'DATE', label: 'TANGGAL', _style: { width: '8%' } },
        // { key: 'KODE_BARANG', _style: { width: '15%' } },
        { key: 'CONTENT', label: 'NAMA PRODUK', _style: { width: '30%' } },
        { key: 'STATUS', _style: { width: '15%' } },
        // { key: 'KETERANGAN', _style: { width: '20%' } },
        {
            key: 'edit_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]

    const getBadge = (status) => {
        switch (status) {
            case 'SEDANG DIPROSES': return 'secondary'
            case 'SEDANG PROSES': return 'secondary'
            case 'HALAL': return 'success'
            case 'HARAM': return 'danger'
            case 'RAGU-RAGU': return 'warning'
            default: return 'primary'
        }
    }

    const initPendampingan = {
        flag: "",
        id_user: "",
        keterangan: "",
        kode_barang: "",
        nama_produk: "",
        otorisator: "",
    }
    const [dataPendampingan, setPendampingan] = useState(initPendampingan)
    const [statusPendampingan, setStatusPendampingan] = useState('')
    const [showModalPendampingan, setModalPendampingan] = useState(null)

    const handleInputChange = event => {
        const { name, value } = event.target
        setPendampingan({ ...dataPendampingan, [name]: value })
    }

    const onHendleSubmit = (event) => {
        event.preventDefault()
        setModalPendampingan(!showModalPendampingan)
        API.insertPendampingan(dataPendampingan).then(res => {
            toast(`😊 Permintaan pendampingan terkirim.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            window.location.reload()
        })
    }
    return (
        <>
            <ToastContainer />
            <CModal show={showModalPendampingan} onClose={() => setModalPendampingan(!showModalPendampingan)}>
                <CModalHeader closeButton>
                    <CModalTitle>Form Pendampingan</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <CCol>
                        <CForm onSubmit={onHendleSubmit} action="" method="post" encType="multipart/form-data" className="form-horizontal">

                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CInput value={dataPendampingan.nama_produk} readOnly name="nama_produk" type="text" />
                                    <br />
                                    <span>Status : <CBadge color="success">{statusPendampingan}</CBadge>
                                    </span>
                                </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol xs="12" md="12">
                                    <CLabel htmlFor="keterangan"><strong>Keterangan :</strong></CLabel>
                                    <textarea className="form-control" value={dataPendampingan.keterangan} onChange={handleInputChange} rows="3" required placeholder="Tambahkan keterangan..." name="keterangan" />
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol>
                                    <div className="card-header-actions">
                                        <CButton className="m-2" type="submit" value="Submit" size="sm" color="success">
                                            Pendampingan
                                        </CButton>
                                        <CButton className="m-2" onClick={() => setModalPendampingan(!showModalPendampingan)} size="sm" color="secondary">
                                            Cancel
                                        </CButton>
                                    </div>
                                </CCol>
                            </CFormGroup>

                        </CForm>
                    </CCol>

                </CModalBody>
            </CModal>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>DAFTAR PRODUK</strong>
                            <div className="card-header-actions">
                                <Link to="/user/tambah-produk">
                                    <CButton color="success" size="sm" className="btn-brand mr-1 mb-1">
                                        <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
                                        Tambah Produk
                                    </CButton>
                                </Link>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable bordered borderColor="primary"
                                items={namaProduk}
                                fields={fields}
                                tableFilter
                                // itemsPerPageSelect
                                striped
                                border={true}
                                // itemsPerPage={5}
                                hover
                                sorter
                                // pagination
                                scopedSlots={{
                                    'STATUS':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.STATUS)}>
                                                    {item.STATUS}
                                                </CBadge>
                                            </td>
                                        ),
                                    'show_details':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CButton
                                                        color="primary"
                                                        size="sm"
                                                        onClick={() => { toggleDetails(index) }}
                                                    >
                                                        {details.includes(index) ? 'Tutup' : 'Detail'}
                                                    </CButton>
                                                </td>
                                            )
                                        },
                                    'edit_details':
                                        (item, index) => {
                                            if (item.STATUS !== 'HALAL') {
                                                return (
                                                    <td className="py-2">
                                                        <Link to=
                                                            {
                                                                {
                                                                    pathname: `/user/update-produk/produk?_id=${window.btoa(item.KODE_BARANG)}&_key=${window.btoa(item.CONTENT)}`,
                                                                    state: {
                                                                        is_edit: true,
                                                                        KODE_BARANG: item.KODE_BARANG,
                                                                        CONTENT: item.CONTENT
                                                                    }
                                                                }
                                                            }>
                                                            <CButton
                                                                color="danger"
                                                                size="sm"
                                                                variant="outline"
                                                            >
                                                                Ubah
                                                            </CButton>
                                                        </Link>
                                                    </td>
                                                )
                                            } else {
                                                const data = {
                                                    id_user: id_user,
                                                    kode_barang: item.KODE_BARANG,
                                                    nama_produk: item.CONTENT,
                                                    flag: "0",
                                                    otorisator: penanggung_jwb,
                                                    keterangan: ""
                                                }
                                                const cek_pendamping = cekPendampingan.map(kode => kode.KODE_BARANG === item.KODE_BARANG ? kode.STATUS : 0)
                                                if (cek_pendamping.includes(1)) {
                                                    return (<td className="py-2">
                                                        <CButton
                                                            color="success"
                                                            size="sm"
                                                            onClick={() => {
                                                                setPendampingan(data);
                                                                setModalPendampingan(true)
                                                                setStatusPendampingan(item.STATUS)
                                                            }}
                                                        >
                                                            Pendampingan
                                                        </CButton>
                                                    </td>)
                                                } else {
                                                    return (<td className="py-2">
                                                        <CButton
                                                            color="secondary"
                                                            size="sm"
                                                            title="Pendampingan Terkirim"
                                                        >
                                                            Terkirim...
                                                        </CButton>
                                                    </td>)
                                                }
                                            }
                                        },
                                    'details':
                                        (item, index) => {
                                            return (
                                                <CCollapse show={details.includes(index)}>
                                                    <CCardBody className="alert alert-dark">
                                                        {namaProduk !== [] ? (
                                                            <>
                                                                {/* ====== SHOW BILL OF MATERIALS ====== */}
                                                                <h4 key={item.KODE_BARANG}>
                                                                    <b>I. Bahan Baku</b>
                                                                </h4>

                                                                <BillOfMaterials data={getbillOfMaterials.filter(d => d.in_kode_barang === item.KODE_BARANG)} />

                                                                {/* ====== SHOW STEP PEMBUATAN ====== */}
                                                                <h4 key={item.KODE_BARANG * 2}>
                                                                    <b>II. Tahapan Proses</b>
                                                                </h4>

                                                                <StepProduksi data={getStepByUser.filter(d => d.in_kode_barang === item.KODE_BARANG)} />
                                                            </>
                                                        ) : null}
                                                        {/* ====== SHOW DOKUMEN SELFT DECLARE ====== */}
                                                        {item.STATUS === 'HALAL' ? (
                                                            <>
                                                                <h4 key={item.KODE_BARANG * 3}>
                                                                    <b>III. Pernyataan Diri</b>
                                                                </h4>
                                                                <CCard>
                                                                    <CCardBody>
                                                                        <DokumenProduk namaProduk={item.CONTENT} penanggung_jwb={penanggung_jwb} />
                                                                    </CCardBody>
                                                                </CCard>
                                                            </>
                                                        ) : ''}

                                                    </CCardBody>
                                                </CCollapse>
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

export default ListProduk