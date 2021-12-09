import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CAlert,
    CRow,
} from '@coreui/react'
import 'react-toastify/dist/ReactToastify.css';
import API from "../../../service/api"

import HeaderFooter from '../header_footer/HeaderFooter'


const GenerateQRcode = () => {
    const querySearch = new URLSearchParams(window.location.search).get('id');
    const querynameSearch = new URLSearchParams(window.location.search).get('kode');
    const param_id = querySearch !== null ? window.atob(querySearch) : 0;
    const kode = querynameSearch !== null ? window.atob(querynameSearch) : '';

    const [getData, setData] = useState({
        NOMOR_SERTIFIKAT: "",
        KODE_USER: "",
        NAMA_USAHA: "",
        KODE_BARANG: "",
        NAMA_BARANG: "",
        IS_TOKO: "",
        IS_TAMPILKAN_PRODUK: "",
        NAMA_PENANGGUNG_JAWAB: "",
        NAMA_PEMILIK: ""
    })

    const [validURL, setValitURL] = useState(false)
    useEffect(() => {
        API.CekProfileQRCode(param_id, kode).then(res => {
            if (res.data.length > 0) {
                setData(res.data[0])
            } else {
                setValitURL(true)
            }
        })
    }, [param_id, kode])

    return (
        <HeaderFooter>
            <section id="hero" className="hero d-flex align-items-center">
                <CContainer style={{ zIndex: "1" }}>
                    <CRow className="justify-content-center">
                        <CCol md="6">
                            <CCardGroup>
                                <CCard className="p-4">
                                    <h1 style={{ textAlign: "center" }}>QR Code</h1>
                                    <CCardBody>
                                        {!validURL ? (
                                            <CAlert color="success">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Kode User</td>
                                                                <td>:</td>
                                                                <td><label id="lbl_produk">{getData.KODE_USER}</label></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nomor Registrasi</td>
                                                                <td>:</td>
                                                                <td><label id="lbl_produk">{getData.NOMOR_SERTIFIKAT}</label></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nama Produk</td>
                                                                <td>:</td>
                                                                <td><label id="lbl_nama_perusahaan">{getData.NAMA_BARANG}</label></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nama Usaha</td>
                                                                <td>:</td>
                                                                <td><label id="lbl_produk">{getData.NAMA_USAHA.toUpperCase()}</label></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Penanggung Jawab</td>
                                                                <td>:</td>
                                                                <td><label id="lbl_produk">{getData.NAMA_PENANGGUNG_JAWAB.toUpperCase()}</label></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Pemilik Usaha</td>
                                                                <td>:</td>
                                                                <td><label id="lbl_produk">{getData.NAMA_PEMILIK !== null && getData.NAMA_PEMILIK.toUpperCase()}</label></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CAlert>
                                        ) : (
                                            <CAlert color="danger">
                                                Data Tidak Ditemukan
                                            </CAlert>
                                        )}
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </section>
        </HeaderFooter>
    )
}

export default GenerateQRcode
