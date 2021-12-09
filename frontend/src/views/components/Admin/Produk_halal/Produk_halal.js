import React, { useState, useRef, useCallback } from 'react'
import searchProdukHalal from './Search_Produk_Halal'
import {
    CInput,
    CCard,
    CCardBody,
    CRow,
    CForm,
    CButton,
    CCol,
    CFormGroup,
} from '@coreui/react'

export default function App() {
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
        produkMUI,
        hasMore,
        loading,
        // error
    } = searchProdukHalal(dataQuery, pageNumber)

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

    return (
        <>
            <CForm onSubmit={hendleSubmit}>
                <CFormGroup row>
                    <CCol>
                        <div className="input-group">
                            <CInput placeholder="Cari... (Produk, Sertifikat)" type="search" value={query} onChange={handleSearch} autoComplete="off"></CInput>
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
                {produkMUI.map((item, index) => {
                    if (produkMUI.length === index + 1) {
                        return <div className="col-12 col-sm-6 col-md-6" ref={lastItemElementRef} key={item.KODE_SERTIFIKAT + Date.now() + index + 1}>
                            <CCard>
                                <CCardBody>
                                    <span><strong>Produk : </strong>{item.CONTENT}</span><br />
                                    <span><strong>Sertifikat : </strong>{item.KODE_SERTIFIKAT}</span><br />
                                    <span><strong>Expired : </strong>{item.EXPIRED_DATE}</span><br />
                                    <span><strong>Perusahaan : </strong>{item.NAMA_PRODUSEN}</span>
                                </CCardBody>
                            </CCard>
                        </div>
                    } else {
                        return <div className="col-12 col-sm-6 col-md-6" key={item.KODE_SERTIFIKAT + Date.now() + index + 1}>
                            <CCard>
                                <CCardBody>
                                    <span><strong>Produk : </strong>{item.CONTENT}</span><br />
                                    <span><strong>Sertifikat : </strong>{item.KODE_SERTIFIKAT}</span><br />
                                    <span><strong>Expired : </strong>{item.EXPIRED_DATE}</span><br />
                                    <span><strong>Perusahaan : </strong>{item.NAMA_PRODUSEN}</span>
                                </CCardBody>
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
        </>
    )
}