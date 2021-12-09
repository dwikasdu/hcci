import React, { useState, useRef, useCallback, useContext } from 'react'
import {
    CCard,
    CCardBody,
    CCardFooter,
    CButton,
    CRow,
    CInput,
    CBadge,
    CForm,
} from '@coreui/react'
import searchProdukHalal from './Search_kunjungan'
import BuatKunjungan from './Buat_Kunjungan'
import SweetAlert from "react-bootstrap-sweetalert"
import API from '../../../../service/api'
import UbahJadwalKunjungan from './Ubah_Jadwal_Kunjungan'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../service/auth/UserProvider"

function Buat_kunjungan() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = roles.includes('admin_penyelia') ? state.user.ID_USER : '';
    }

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

    const statusKunjungan = (status) => {
        switch (status) {
            case 'BELUM KUNJUNGAN': return 'secondary'
            case 'SUDAH KUNJUNGAN': return 'success'
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

    const [alertDelete, setAlerDelete] = useState(null)
    const CardItem = (props, index) => {
        const [showModalUbahJadwal, setModalUbahJadwal] = useState(false)
        const DeleteKunjungan = (id) => {
            setAlerDelete(
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Ya"
                    cencelBtnText="Batal"
                    confirmBtnBsStyle="danger"
                    cencelBtnBsStyle="info"
                    title="Apakah anda yakin?"
                    onConfirm={() => {
                        API.deleteKunjungan(id).then(res => {
                            setAlerDelete(
                                <SweetAlert
                                    success
                                    confirmBtnText="OK"
                                    confirmBtnBsStyle="success"
                                    title="Produk berhasil dihapus."
                                    onConfirm={() => {
                                        setAlerDelete(null)
                                    }}
                                >
                                </SweetAlert>
                            )
                            props.setDataQuery(' ')
                            setTimeout(() => {
                                props.setDataQuery('')
                            }, 500);
                        })
                    }}
                    onCancel={() => setAlerDelete(null)}
                >
                    Ingin membatalkan kunjungan pad {props.item.NAMA_PERUSAHAAN}?
                </SweetAlert>
            )
        }
        return (
            <>
                <UbahJadwalKunjungan showModalUbahJadwal={showModalUbahJadwal} setModalUbahJadwal={setModalUbahJadwal} setDataQuery={setDataQuery} item={props} />
                <CCard accentColor={cardColor(props.item.STATUS_BARANG)}>
                    <CCardBody>
                        <span><strong>Perusahaan : </strong>{props.item.NAMA_PERUSAHAAN}</span><br />
                        <span><strong>Produk : </strong>{props.item.PRODUK}</span><br />
                        <span><strong>Reminder : </strong>{props.item.REMINDER} Hari</span><br />
                        <span><strong>No Telepon : </strong>{props.item.NOMOR_TELEPON}</span><br />
                        <span><strong>Tanggal : </strong>{props.item.TANGGAL_KUNJUNGAN}</span><br />
                        <span><strong>Alamat : </strong>{props.item.ALAMAT}</span><br />
                        <span><strong>Penyelia : </strong>{props.item.NAMA_PENYELIA}</span><br />
                        <span><strong>Status Kunjungan : </strong>
                            <CBadge color={statusKunjungan(props.item.STATUS)}>
                                {props.item.STATUS}
                            </CBadge>
                        </span><br />
                        <span><strong>Status : </strong>
                            <CBadge color={getBadge(props.item.STATUS_BARANG)}>
                                {props.item.STATUS_BARANG}
                            </CBadge>
                        </span>
                    </CCardBody>
                    {props.item.STATUS === 'BELUM KUNJUNGAN' && (
                        <CCardFooter>
                            <CButton
                                color="danger"
                                className="btn mr-2 mb-2"
                                onClick={() => DeleteKunjungan(props.item.ID)}
                            >
                                Hapus
                            </CButton>
                            <CButton
                                color="info"
                                className="btn mr-2 mb-2"
                                onClick={() => {
                                    setModalUbahJadwal(true);
                                }}
                            >
                                Ubah Jadwal
                            </CButton>
                            <Link to={`/master-umkm/Pemeriksaan_Produk/search?_id=${window.btoa(props.item.KODE_BARANG)}&_key=${window.btoa(props.item.PRODUK)}&_user=${window.btoa(props.item.ID_PELAKU_USAHA)}`}>
                                <CButton
                                    color="success"
                                    className="btn mr-2 mb-2"
                                >
                                    Checklist
                                </CButton>
                            </Link>
                        </CCardFooter>
                    )}
                </CCard>
            </>
        )
    }


    const [showModalDetail, setModalDetail] = useState(false)
    return (
        <>
            {alertDelete}

            <CButton
                className="card-header-actions"
                style={{ marginBottom: "10px" }}
                color="info"
                onClick={() => {
                    setModalDetail(true);
                    document.body.style.overflow = 'hidden';
                }}
            >
                Buat Jadwal Kunjungan
            </CButton>
            <br />
            <br />
            <BuatKunjungan showModalDetail={showModalDetail} setModalDetail={setModalDetail} setDataQuery={setDataQuery} />

            <CForm onSubmit={hendleSubmit}>
                <div className="input-group">
                    <CInput placeholder="Cari... (Perusahaan, Status, Status Kunjungan, Alamat)" type="search" value={query} onChange={handleSearch} autoComplete="off"></CInput>
                    <div className="input-group-append">
                        <CButton style={{ borderRadius: "0px 50px 50px 0px !important" }} type="submit" className="btn btn-primary">
                            <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></svg>
                        </CButton>
                    </div>
                </div>
            </CForm>
            <br />
            <CRow>
                {dataProduk.map((item, index) => {
                    if (dataProduk.length === index + 1) {
                        return <div className="col-12 col-sm-6 col-md-6" ref={lastItemElementRef} key={item.NAMA_PERUSAHAAN + Date.now() + index + 1}>
                            <CardItem item={item} index={index} setDataQuery={setDataQuery} />
                        </div>
                    } else {
                        return <div className="col-12 col-sm-6 col-md-6" key={item.NAMA_PERUSAHAAN + Date.now() + index + 1}>
                            <CardItem item={item} index={index} setDataQuery={setDataQuery} />
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

export default Buat_kunjungan
