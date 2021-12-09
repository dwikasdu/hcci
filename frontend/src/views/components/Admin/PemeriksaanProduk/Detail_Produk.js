import React from 'react'
import {
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CImg
} from '@coreui/react'

const Detail_Produk = (props) => {
    const produk = props.currentProduk;
    return (
        <>
            <CFormGroup row className="my-0" style={{ margin: "0 auto" }}>
                {props.currentProduk !== undefined && (
                    <CCol>
                        <div style={{ padding: "5px 10px" }}>
                            <CFormGroup row>

                                <CLabel htmlFor="bahan-baku"><strong>Nama Bahan Baku</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.bahan_baku} placeholder="Bahan baku....." name="bahan_baku" type="text" />

                            </CFormGroup>

                            <CFormGroup row>

                                <CLabel htmlFor="merk-input"><strong>Merek Bahan</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.merk} placeholder="Merek Bahan" name="merk" type="text" />

                            </CFormGroup>

                            <CFormGroup row>

                                <CLabel htmlFor="produsen-input"><strong>Nama Produsen</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.produsen} placeholder="Produsen" name="produsen" type="text" />

                            </CFormGroup>

                            <CFormGroup row>
                                <CLabel htmlFor="lembaga_penerbit-input"><strong>Lembaga Penerbit</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.lembaga_penerbit} placeholder="Lembaga Penerbit" name="lembaga_penerbit" type="text" />
                            </CFormGroup>
                        </div>
                        <div style={{ padding: "5px 10px" }}>
                            <CFormGroup row>
                                <CLabel htmlFor="text-input"><strong>Nomor Sertifikat Halal</strong></CLabel>

                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.sertifikat_halal} placeholder="010610421..." name="sertifikat_halal" type="text" />


                            </CFormGroup>

                            <CFormGroup row>

                                <CLabel htmlFor="expired_date_sertifikat-input"><strong>Expired Sertifikat</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.expired_date_sertifikat} placeholder="date" name="expired_date_sertifikat" type="text" />

                            </CFormGroup>


                            <CFormGroup row>

                                <CLabel htmlFor="pemasok-input"><strong>Pemasok</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.pemasok} placeholder="Pemasok" name="pemasok" type="text" />

                            </CFormGroup>
                            <CFormGroup row>

                                <CLabel htmlFor="textarea-input"><strong>Alamat Pemasok</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.alamat_pemasok} placeholder="Alamat Pemasok" name="alamat_pemasok" type="text" />

                            </CFormGroup>
                            <CFormGroup row>

                                <CLabel htmlFor="textarea-input"><strong>Keterangan</strong></CLabel>
                                <CInput style={{ fontWeight: "bolder" }} disabled value={produk.keterangan} placeholder="Alamat Pemasok" name="alamat_pemasok" type="text" />

                            </CFormGroup>
                            {produk.gambar_bukti_halal !== null && (
                                <CFormGroup row>
                                    <CLabel htmlFor="lembaga_penerbit-input"><strong>Foto Bukti Sertifikat Halal</strong></CLabel>
                                    <center>
                                        <a href={produk.gambar_bukti_halal} target="_blank" rel="noreferrer" title="bukti pembayaran">
                                            <CImg style={{ width: '100%' }} alt="bukti pembayaran" src={produk.gambar_bukti_halal} fluid />
                                        </a>
                                    </center>
                                </CFormGroup>
                            )}
                        </div>
                    </CCol>
                )}
            </CFormGroup>
        </>
    )
}

export default Detail_Produk
