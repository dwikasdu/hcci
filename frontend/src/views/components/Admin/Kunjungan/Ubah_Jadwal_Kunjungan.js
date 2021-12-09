import React, { useContext, useState } from 'react'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom'
import {
    CButton,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody
} from '@coreui/react'
import SweetAlert from "react-bootstrap-sweetalert"
import API from '../../../../service/api'

function Ubah_Jadwal_Kunjungan(props) {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_penyelia = '';
    // var penanggungjawab = '';
    if (state.isAuthenticated === true) {
        id_penyelia = state.user.ID_USER;
        // penanggungjawab = state.user.nama_penanggung_jawab;
    }

    const [getTanggal, setTanggal] = useState(props.item.item.DATE_FORMAT);

    const [loadings, setLoading] = useState(false)
    const [alertEdits, setAlertEdit] = useState(null)
    const onHendleSubmit = (event) => {
        event.preventDefault()
        // setLoading(true)
        const initInsert = {
            TANGGAL: getTanggal,
            ID: props.item.item.ID,
            ID_PENYELIA: id_penyelia,
            ID_USER: props.item.item.ID_PELAKU_USAHA
        }
        API.updateKunjungan(initInsert).then(res => {
            setAlertEdit(
                <SweetAlert
                    success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    title="Jadwal Kunjungan Berhasil Di Ubah"
                    onConfirm={() => {
                        setAlertEdit(null)
                        props.setModalUbahJadwal(!props.showModalUbahJadwal)
                        setLoading(false)
                        props.setDataQuery(' ')
                        setTimeout(() => {
                            props.setDataQuery('')
                        }, 500);
                    }}
                >
                </SweetAlert>
            )
        })
    }


    return (
        <>
            {alertEdits}

            <CModal fade={true} closeOnBackdrop={false} className="modalDetail" shouldCloseOnOverlayClick={false} size="lg" show={props.showModalUbahJadwal} onClose={() => props.setModalUbahJadwal(!props.showModalUbahJadwal)}>
                <CModalHeader closeButton>
                    <CModalTitle><strong>UBAH JADWAL KUNJUNGAN</strong></CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm
                        onSubmit={onHendleSubmit}
                        action="" method="post" encType="multipart/form-data" className="form-horizontal">

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="tanggal">Tanggal</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput value={getTanggal} className="datepickerkunjungan" onChange={e => setTanggal(e.target.value)} required name="tanggal" placeholder="dd-mm-yyyy" type="date" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="nama-usaha">Nama Usaha</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput value={props.item.item.NAMA_PERUSAHAAN !== null && props.item.item.NAMA_PERUSAHAAN.toUpperCase()} disabled placeholder="Nama usaha" name="nama_usaha" type="text" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="id-user">ID User</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput value={props.item.item.ID_PELAKU_USAHA} disabled name="ID_USER" type="text" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="produk_user">Produk</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput value={props.item.item.PRODUK} disabled name="ID_USER" type="text" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="alamat">Alamat</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <textarea className="form-control" value={props.item.item.ALAMAT} disabled rows="3" placeholder="ALAMAT" name="alamat" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="otorisator">Nama Penyelia</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput value={props.item.item.NAMA_PENYELIA} disabled placeholder="Nama Penyelia" name="otorisator" type="text" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        {loadings ? (
                            <span className="card-header-action" style={{ float: "right" }}>
                                <button className="btn btn-success" type="button" disabled>
                                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            </span>
                        ) : (
                            <CButton className="card-header-actions" type="submit" value="Submit" color="success">
                                Update
                            </CButton>
                        )}
                    </CForm>

                </CModalBody>
            </CModal>
        </>
    )
}

export default Ubah_Jadwal_Kunjungan
