import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
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
// import DokumenProduk from '../dokumen'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchListProduk from './SearchListProduk'

const ListProduk = () => {
    const { state } = useContext(AuthContext);
    var id_user = '';
    var penanggung_jwb = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
        penanggung_jwb = state.user.nama_penanggung_jawab
    }

    const [cekPendampingan, setCekPendampingan] = useState([])
    const [getbillOfMaterials, setBillOfMaterials] = useState([])
    const [getStepByUser, setStepByUser] = useState([])

    useEffect(() => {
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



    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {
        dataProduk,
        hasMore,
        loading,
        totalSemua,
        // error
    } = SearchListProduk(query, pageNumber)

    const observer = useRef()
    const lastItemElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }



    const cardColor = (status) => {
        switch (status) {
            case 'SEDANG DIPROSES': return 'info'
            case 'SEDANG PROSES': return 'info'
            case 'HALAL': return 'success'
            case 'HARAM': return 'danger'
            case 'RAGU-RAGU': return 'warning'
            default: return 'primary'
        }
    }

    const DetailCard = (props) => {
        const data = {
            id_user: id_user,
            kode_barang: props.item.KODE_BARANG,
            nama_produk: props.item.CONTENT,
            flag: "0",
            otorisator: penanggung_jwb,
            keterangan: ""
        }
        const cek_pendamping = cekPendampingan.map(kode => kode.KODE_BARANG === props.item.KODE_BARANG ? kode.STATUS : 0)


        const [showModalDetail, setModalDetail] = useState(false)
        if (!showModalDetail) {
            document.body.style.overflowY = "scroll";
        }

        return (
            <>
                <CModal fade={true} closeOnBackdrop={false} className="modalDetail" shouldCloseOnOverlayClick={false} size="lg" show={showModalDetail} onClose={() => setModalDetail(!showModalDetail)}>
                    <CModalHeader closeButton>
                        <CModalTitle><strong>{props.item.CONTENT.toUpperCase()}</strong></CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {dataProduk !== [] ? (
                            <>
                                {/* ====== SHOW BILL OF MATERIALS ====== */}
                                <h4 key={props.item.KODE_BARANG}>
                                    <b>I. Bahan Baku</b>
                                </h4>

                                <BillOfMaterials data={getbillOfMaterials.filter(d => d.in_kode_barang === props.item.KODE_BARANG)} />

                                {/* ====== SHOW STEP PEMBUATAN ====== */}
                                <h4 key={props.item.KODE_BARANG * 2}>
                                    <b>II. Tahapan Proses</b>
                                </h4>

                                <StepProduksi data={getStepByUser.filter(d => d.in_kode_barang === props.item.KODE_BARANG)} />
                            </>
                        ) : null}
                        {/* ====== SHOW DOKUMEN SELFT DECLARE ====== */}
                        {/* {props.item.STATUS === 'HALAL' ? (
                            <>
                                <h4 key={props.item.KODE_BARANG * 3}>
                                    <b>III. Pernyataan Diri</b>
                                </h4>
                                <br />
                                <DokumenProduk namaProduk={props.item.CONTENT} penanggung_jwb={penanggung_jwb} />
                            </>
                        ) : ''} */}

                    </CModalBody>
                </CModal>


                <CCardBody>
                    <span><strong>Produk : </strong>{props.item.CONTENT}</span><br />
                    <span><strong>Terdaftar : </strong>{props.item.DATE}</span><br />
                    <span><strong>Keterangan : </strong>{props.item.KETERANGAN}</span><br />
                    <span><strong>Status : </strong>
                        <CBadge color={getBadge(props.item.STATUS)}>
                            {props.item.STATUS}
                        </CBadge>
                    </span><br /><br />
                    <span>
                        <CButton
                            className="btn mr-2 mb-2"
                            color="primary"
                            onClick={() => {
                                setModalDetail(true);
                                document.body.style.overflow = 'hidden';
                            }}
                        >
                            detail
                        </CButton>

                        {props.item.STATUS !== 'HALAL' ? (
                            <Link to={{
                                pathname: `/user/update-produk/produk?_id=${window.btoa(props.item.KODE_BARANG)}&_key=${window.btoa(props.item.CONTENT)}`,
                                state: {
                                    is_edit: true,
                                    KODE_BARANG: props.item.KODE_BARANG,
                                    CONTENT: props.item.CONTENT
                                }
                            }}>
                                <CButton
                                    className="btn mr-2 mb-2"
                                    color="danger"
                                >
                                    Ubah
                                </CButton>
                            </Link>
                        ) : cek_pendamping.includes(1) ? (
                            <CButton
                                className="btn mr-2 mb-2"
                                color="success"
                                onClick={() => {
                                    setPendampingan(data);
                                    setModalPendampingan(true)
                                    setStatusPendampingan(props.item.STATUS)
                                }}
                            >
                                Pendampingan
                            </CButton>
                        ) : (
                            <CButton
                                className="btn mr-2 mb-2"
                                color="secondary"
                                title="Pendampingan Terkirim"
                            >
                                Terkirim...
                            </CButton>
                        )}
                    </span>
                </CCardBody>
            </>
        )
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
                                    <CButton color="primary" size="sm" className="btn-brand mr-1 mb-1">
                                        <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
                                        Tambah Produk
                                    </CButton>
                                </Link>
                            </div>
                        </CCardHeader>
                        <CCardBody>

                            <CInput placeholder="Cari... (Produk, Status)" type="search" value={query} onChange={handleSearch} autoComplete="off"></CInput>
                            <br />
                            <span><strong>{totalSemua} Produk Terdaftar.</strong></span>
                            <br />
                            <br />
                            <CRow>
                                {dataProduk.map((item, index) => {
                                    if (dataProduk.length === index + 1) {
                                        return <div className="col-12 col-sm-6 col-md-4" ref={lastItemElementRef} key={item.CONTENT + Date.now() + index + 1}>
                                            <CCard accentColor={cardColor(item.STATUS)}>
                                                <DetailCard item={item} index={index} />
                                            </CCard>
                                        </div>
                                    } else {
                                        return <div className="col-12 col-sm-6 col-md-4" key={item.CONTENT + Date.now() + index + 1}>
                                            <CCard accentColor={cardColor(item.STATUS)}>
                                                <DetailCard item={item} index={index} />
                                            </CCard>
                                        </div>
                                    }
                                })}
                            </CRow>
                            <br />
                            <div className="d-flex justify-content-center">
                                <div>{loading && (
                                    <div style={{ color: "#099f9f" }} className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}</div>
                                {/* <div>{error && 'Tidak Ditemukan'}</div> */}
                            </div>
                            <br />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default ListProduk