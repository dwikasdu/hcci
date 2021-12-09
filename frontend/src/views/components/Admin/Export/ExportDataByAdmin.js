import React, { useContext, useState, useRef, useCallback } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CInput,
    CButton,
    CForm,
    CFormGroup
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../service/auth/UserProvider"
import SearchUMKMByPenyelia from '../Master/Master_UMKM/Search_UMKM_By_Penyelia'
import API from '../../../../service/api'
import { CSVLink } from 'react-csv'

function ExportDataByAdmin() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('super_admin')) history.push('/');

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
        dataUMKM,
        hasMore,
        loading,
        // totalSemua,
        // error
    } = SearchUMKMByPenyelia(dataQuery, pageNumber, 6, id_user)

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


    const csvLinkProduk = React.useRef()
    const csvLinkStep = React.useRef()
    const [dataProduk, setDataProduk] = useState([])
    const [namaPerusahaan, setNamaPerusahan] = useState('')
    const [dataStep, setDataStep] = useState([])

    const HendleDownloadProduk = (perusahaan, id_user) => {
        setNamaPerusahan(perusahaan)
        API.exportDataProduk(id_user).then(res => {
            if (res.data.length > 0) {
                // let data = [];
                // for (let index = 0; index < res.data.length; index++) {
                //     const item = res.data[index];
                //     data.push({
                //         ID_USER: item.ID_USER,
                //         NAMA_PERUSAHAAN: index === 0 ? item.NAMA_PERUSAHAAN : '',
                //         NAMA_PRODUK: index === 0 ? item.NAMA_PRODUK : '',
                //         KODE_BARANG: index === 0 ? item.KODE_BARANG : '',
                //         NAMA_BAHAN: item.NAMA_BAHAN,
                //         MERK: item.MERK,
                //         PRODUSEN: item.PRODUSEN,
                //         PEMASOK: item.PEMASOK,
                //         ALAMAT_PEMASOK: item.ALAMAT_PEMASOK,
                //         LEMBAGA_PENERBIT: item.LEMBAGA_PENERBIT,
                //         KODE_SERTIFIKAT: item.KODE_SERTIFIKAT,
                //         EXPIRED_DATE_SERTIFIKAT: item.EXPIRED_DATE_SERTIFIKAT,
                //         STATUS: item.STATUS,
                //         KETERANGAN: item.KETERANGAN,
                //     })
                // }
                setDataProduk(res.data);
            } else {
                setDataProduk([{ ID_USER: 'PRODUK TIDAK ADA.' }]);
            }
            setTimeout(() => {
                csvLinkProduk.current.link.click();
            }, 100);
        })
    }
    const HendleDownloadStep = (perusahaan, id_user) => {
        setNamaPerusahan(perusahaan)
        API.exportStepProduksi(id_user).then(res => {
            if (res.data.length > 0) {
                setDataStep(res.data);
            } else {
                setDataStep([{ ID_USER: 'STEP PRODUKSI PRODUK TIDAK ADA.' }]);
            }
            setTimeout(() => {
                csvLinkStep.current.link.click();
            }, 100);
        })
    }

    const DataGrid = (props) => {
        return (
            <>
                <CCard accentColor="primary">
                    <CCardBody>
                        <span><strong>Perusahaan : </strong>{props.item.NAMA_PERUSAHAAN}</span><br />
                        <span><strong>Nomor Telepon : </strong>{props.item.NOMOR_TELEPON}</span><br />
                        <span><strong>Email : </strong>{props.item.EMAIL}</span><br />
                        <span><strong>Alamat : </strong>{props.item.ALAMAT}</span><br /><br />
                        <span>

                            <CButton className="btn mr-2 mb-2" onClick={() => HendleDownloadProduk(props.item.NAMA_PERUSAHAAN, props.item.ID_USER)} color="info" >
                                Download Produk
                            </CButton>

                            <CButton className="btn mr-2 mb-2" onClick={() => HendleDownloadStep(props.item.NAMA_PERUSAHAAN, props.item.ID_USER)} color="primary" >
                                Download Step pembuatan
                            </CButton>
                        </span>
                    </CCardBody>
                </CCard>
            </>
        )
    }

    var dt = new Date();
    var dateTime = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')}-Time-${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`

    return (
        <>
            <CSVLink
                ref={csvLinkProduk}
                // headers={headers}
                filename={`Produk-${namaPerusahaan}-${dateTime}.csv`}
                className="btn btn-info d-none" // button is hidden
                data={dataProduk}
            />
            <CSVLink
                ref={csvLinkStep}
                // headers={fieldsStep}
                filename={`Step-Produk-${namaPerusahaan}-${dateTime}.csv`}
                className="btn btn-info d-none" // button is hidden
                data={dataStep}
            />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>EXPORT DATA PRODUK UMKM</strong>
                        </CCardHeader>
                        <CCardBody>

                            <CForm onSubmit={hendleSubmit}>
                                <CFormGroup row>
                                    <CCol>
                                        <div className="input-group">
                                            <CInput placeholder="Cari... (Perusahaan.., Alamat...)" type="search" value={query} onChange={handleSearch} autoComplete="off"></CInput>
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
                                {dataUMKM.map((item, index) => {
                                    if (dataUMKM.length === index + 1) {
                                        return <div className="col-12 col-sm-6 col-md-6" ref={lastItemElementRef} key={item.NAMA_PERUSAHAAN + Date.now() + index + 1}>
                                            <DataGrid item={item} />
                                        </div>
                                    } else {
                                        return <div className="col-12 col-sm-6 col-md-6" key={item.NAMA_PERUSAHAAN + Date.now() + index + 1}>
                                            <DataGrid item={item} />
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
                                {/* {dataUMKM.length > 0 ? (
                                    <div>{dataUMKM.length === totalSemua ? 'Semua Data' : 'Semua Data'}</div>
                                ) : null} */}
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

export default ExportDataByAdmin
