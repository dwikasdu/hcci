import React, { useState, useContext, useEffect } from 'react'
import {
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CFormGroup,
    CLabel,
    CInput,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SweetAlert from "react-bootstrap-sweetalert"
import TableProduk from './add_update_produk/TableProduk'
import TableStep from './add_update_step/TableStep'

import FormInputProduk from './add_update_produk/Form'
import FormInputStep from './add_update_step/FormStep'

import EditProdukForm from './add_update_produk/EditForm'
import EditstepForm from './add_update_step/EditFormStep'

import API from '../../../../service/api'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom';

function UpdateProduk() {

    const querySearch = new URLSearchParams(window.location.search).get('_id');
    const querynameSearch = new URLSearchParams(window.location.search).get('_key');
    const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';
    const param_name = querynameSearch !== null ? window.atob(querynameSearch) : '';

    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('user')) history.push('/');

    // var ID_users = '';
    var penanggung_jwb = '';
    if (state.isAuthenticated === true) {
        // ID_users = state.user.ID_USER;
        penanggung_jwb = state.user.nama_penanggung_jawab
    }

    const [produks, setProduk] = useState([])
    const [steps, setStepPembuatan] = useState([])
    useEffect(() => {
        API.getbillOfMaterials(param_id).then(res => {
            setProduk(res.data)
        });
        API.getStepProduksi(param_id).then(res => {
            setStepPembuatan(res.data);
        });
    }, [param_id])

    const initialFormState = {
        id: null,
        id_in_step: '',
        kontent: '',
        id_user: '',
        status: '',
        keterangan: '',
        otorisator: '',
        id_bahan_baku: '',
        bahan_baku: '',
        pemasok: '',
        alamat_pemasok: '',
        keterangan_bom: '',
        status_bahan_baku: '',
        sertifikat_halal: '',
        locked: '',
        step_id: '',
        step_ke: '',
        step_keterangan: '',
        merk: '',
        produsen: '',
        lembaga_penerbit: '',
        expired_date_sertifikat: '',
    }

    const [editBahan, setEditBahan] = useState(false)
    const [currentProduk, setCurrentProduk] = useState(initialFormState)
    const editProduk = (produk) => {
        setEditBahan(true)
        setCurrentProduk({
            id_bahan_baku: produk.id_bahan_baku,
            kontent: produk.kontent,
            id_user: produk.id_user,
            status: produk.STATUS,
            otorisator: penanggung_jwb,
            bahan_baku: produk.bahan_baku,
            pemasok: produk.pemasok,
            alamat_pemasok: produk.alamat_pemasok,
            sertifikat_halal: produk.sertifikat_halal,
            merk: produk.merk,
            produsen: produk.produsen,
            lembaga_penerbit: produk.lembaga_penerbit,
            expired_date_sertifikat: produk.expired_date_sertifikat,
        })
    }
    const refreshProduk = (val) => {
        if (val) {
            API.getbillOfMaterials(param_id).then(res => {
                setProduk(res.data)
            });
        } else {
            console.log("edit produk terklik");
        }
    }

    const initialFormSteps = {
        id_in_step: '',
        step_ke: '',
        step_keterangan: '',
        otorisator: ''
    }
    const [tepCurrents, setStepCurrent] = useState(initialFormSteps)
    const [showEditStpes, setShowEditStep] = useState(false)
    const editRowStep = step => {
        setShowEditStep(true)

        setStepCurrent({
            id_in_step: step.id_in_step,
            step_ke: step.step_ke,
            step_keterangan: step.step_keterangan,
            otorisator: penanggung_jwb
        })
    }
    const refreshStep = (val) => {
        if (val) {
            API.getStepProduksi(param_id).then(res => {
                setStepPembuatan(res.data);
            });
        } else {
            console.log("edit produk terklik");
        }
    }

    const [alertDelete, setAlerDelete] = useState(null)
    const deleteProdukById = () => {
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
                    API.deleteProduk(param_id).then(res => {
                        setAlerDelete(
                            <SweetAlert
                                success
                                confirmBtnText="OK"
                                confirmBtnBsStyle="success"
                                title="Produk berhasil dihapus."
                                onConfirm={() => {
                                    setAlerDelete(null)
                                    history.push("/dashboard");
                                }}
                            >
                            </SweetAlert>
                        )
                        setTimeout(() => {
                            history.push("/dashboard");
                        }, 2000);
                    })
                    setAlerDelete(null)
                }}
                onCancel={() => setAlerDelete(null)}
            >
                Ingin menghapus Produk ini?
            </SweetAlert>
        )
    }
    return (
        <CRow>
            {alertDelete}
            <CCol>
                <CCard>
                    <CCardHeader>
                        <strong>UPDATE PRODUK</strong>
                        <div className="card-header-actions">
                            <CButton onClick={deleteProdukById} color="danger" size="sm">
                                <CIcon name="cil-trash" className="mfe-2" /> <span>Hapus Produk</span>
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="stepInput-input"><strong>Nama Produk</strong></CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    value={param_name}
                                    required
                                    readOnly
                                    placeholder="Nama Produk"
                                    name="kontent"
                                    type="text"
                                    id="stepInput"
                                />
                            </CCol>
                        </CFormGroup>
                        <br />
                        <hr />
                        <strong><h4 style={{ fontWeight: "900" }}><center>BAHAN BAKU</center></h4></strong>
                        <hr />
                        <CModal show={editBahan} onClose={() => setEditBahan(!editBahan)} size="lg">
                            <CModalHeader closeButton>
                                <CModalTitle>Tambah Bahan Baku</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <EditProdukForm
                                    editBahan={editBahan}
                                    setEditBahan={setEditBahan}
                                    currentProduk={currentProduk}
                                    jumlahProduk={produks.length}
                                    refreshProduk={refreshProduk}
                                />
                            </CModalBody>
                        </CModal>

                        <FormInputProduk refreshProduk={refreshProduk} />
                        <br />
                        <br />
                        <TableProduk editProduk={editProduk} dataProduk={produks} />
                        <br />
                        <hr />
                        <strong><h4 style={{ fontWeight: "900" }}><center>TAHAPAN PEROSES</center></h4></strong>
                        <hr />
                        <br />
                        <CModal show={showEditStpes} onClose={() => setShowEditStep(!showEditStpes)} size="lg">
                            <CModalHeader closeButton>
                                <CModalTitle>Edit Step Pembuatan</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <EditstepForm
                                    showEditStpes={showEditStpes}
                                    setShowEditStep={setShowEditStep}
                                    tepCurrents={tepCurrents}
                                    jumlahStep={steps.length}
                                    refreshStep={refreshStep}
                                />
                            </CModalBody>
                        </CModal>

                        <FormInputStep refreshStep={refreshStep} />
                        <br />
                        <br />
                        <TableStep editRowStep={editRowStep} dataStep={steps} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default UpdateProduk
