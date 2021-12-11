import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CInput,
    CWidgetProgress,
    CBadge,
    CForm,
    CButton,
    CFormGroup,
} from '@coreui/react'
import { AuthContext } from "../../../../../service/auth/UserProvider"
import API from '../../../../../service/api'
import searchProdukHalal from './Search_Produk_By_penyelia'
import { useHistory } from 'react-router-dom'

function Produk_By_Penyelia() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = roles.includes('admin_penyelia') ? state.user.ID_USER : '';
    }

    const [JumlahStatus, setJumlahStatus] = useState([])
    useEffect(() => {
        API.get_jumlah_semua_status_produk_by_penyelia(id_user).then(res => {
            setJumlahStatus([
                {
                    status_proses: res.data.filter(ele => ele.STATUS === 'SEDANG PROSES').length,
                    color: 'info',
                    text: 'Sedang Peroses'
                },
                {
                    status_proses: res.data.filter(ele => ele.STATUS === 'HALAL').length,
                    color: 'success',
                    text: 'Halal'
                },
                {
                    status_proses: res.data.filter(ele => ele.STATUS === 'RAGU-RAGU').length,
                    color: 'warning',
                    text: 'Ragu-Ragu'
                },
                {
                    status_proses: res.data.filter(ele => ele.STATUS === 'HARAM').length,
                    color: 'danger',
                    text: 'Haram'
                }
            ])
        })
    }, [id_user])


    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [dataQuery, setDataQuery] = useState('')
    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }

    const hendleSubmit = (e) => {
        e.preventDefault()
        setDataQuery(query)
    }

    const {
        dataProduk,
        hasMore,
        loading,
        // error
    } = searchProdukHalal(dataQuery, pageNumber, id_user)

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

    return (
        <>
            <CRow>
                {JumlahStatus.map(e => (
                    <CCol key={e.text} xs="12" sm="6" lg="3">
                        <CWidgetProgress inverse variant="inverse" color={e.color} value={e.status_proses} header={`${e.status_proses}`} text={e.text} />
                    </CCol>
                ))}
            </CRow>

            <CForm onSubmit={hendleSubmit}>
                <CFormGroup row>
                    <CCol>
                        <div className="input-group">
                            <CInput placeholder="Cari... (Produk, Perusahaan)" type="search" value={query} onChange={handleSearch} autoComplete="off"></CInput>
                            <div className="input-group-append">
                                <CButton style={{ borderRadius: "0px 50px 50px 0px !important" }} type="submit" className="btn btn-primary">
                                    <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                                </CButton>
                            </div>
                        </div>
                    </CCol>
                </CFormGroup>
            </CForm>
            <br />
            <CRow>
                {dataProduk.map((item, index) => {
                    if (dataProduk.length === index + 1) {
                        return <div className="col-12 col-sm-6 col-md-4" ref={lastItemElementRef} key={item.CONTENT + Date.now() + index + 1}>
                            <Link to={
                                {
                                    pathname: `/master-umkm/Pemeriksaan_Produk/search?_id=${window.btoa(item.KODE_BARANG)}&_key=${window.btoa(item.CONTENT)}&_user=${window.btoa(item.ID_USER)}`,
                                    state: {
                                        is_edit: true,
                                        KODE_BARANG: item.KODE_BARANG,
                                        CONTENT: item.CONTENT
                                    }
                                }
                            } style={{ textDecoration: "none", color: "#3c4b64" }}>
                                <CCard accentColor={cardColor(item.STATUS)}>
                                    <CCardBody>
                                        <span><strong>Produk : </strong>{item.CONTENT}</span><br />
                                        <span><strong>Perusahaan : </strong>{item.NAMA_PERUSAHAAN}</span><br />
                                        <span><strong>Terdaftar : </strong>{item.DATE}</span><br />
                                        <span><strong>Status : </strong>
                                            <CBadge color={getBadge(item.STATUS)}>
                                                {item.STATUS}
                                            </CBadge>
                                        </span>
                                    </CCardBody>
                                </CCard>
                            </Link>
                        </div>
                    } else {
                        return <div className="col-12 col-sm-6 col-md-4" key={item.CONTENT + Date.now() + index + 1}>
                            <Link to={
                                {
                                    pathname: `/master-umkm/Pemeriksaan_Produk/search?_id=${window.btoa(item.KODE_BARANG)}&_key=${window.btoa(item.CONTENT)}&_user=${window.btoa(item.ID_USER)}`,
                                    state: {
                                        is_edit: true,
                                        KODE_BARANG: item.KODE_BARANG,
                                        CONTENT: item.CONTENT
                                    }
                                }
                            } style={{ textDecoration: "none", color: "#3c4b64" }}>
                                <CCard accentColor={cardColor(item.STATUS)}>
                                    <CCardBody>
                                        <span><strong>Produk : </strong>{item.CONTENT}</span><br />
                                        <span><strong>Perusahaan : </strong>{item.NAMA_PERUSAHAAN}</span><br />
                                        <span><strong>Terdaftar : </strong>{item.DATE}</span><br />
                                        <span><strong>Status : </strong>
                                            <CBadge color={getBadge(item.STATUS)}>
                                                {item.STATUS}
                                            </CBadge>
                                        </span>
                                    </CCardBody>
                                </CCard>
                            </Link>
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

        </>
    )
}

export default Produk_By_Penyelia
