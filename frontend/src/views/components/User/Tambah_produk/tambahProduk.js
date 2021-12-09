import React, { useState, useContext, useEffect } from 'react'
import {
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CFormGroup,
    CLabel,
    CInput,
    CAlert,
    CForm
} from '@coreui/react'
// Props Bahan baku
import AddProduk from './formAdd/Form'
import EditProdukForm from './formAdd/EditForm'
import ProdukTable from './showTable/Table'
// Props step pembuatan
import AddStepPembuatan from './formStep/FormStep'
import EditstepForm from './formStep/EditFormStep'
import StepTable from './showTable/TableStep'

// [ Notifikasi ]
// import { NotificationContainer, NotificationManager } from 'react-notifications'
// import 'react-notifications/lib/notifications.css'
// import swal from 'sweetalert'
// // [ penghubung ]
// import axios from 'axios'
// import { API_URL } from '../../utils/connection'

import API from '../../../../service/api'
import { isValid } from '../../../../service/removeSpecialChar'
import useUnsavedChangesWarning from '../../../../service/useUnsavedChangesWarning'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert from "react-bootstrap-sweetalert"

const TambahProduk = (props) => {

    const querySearch = new URLSearchParams(window.location.search).get('_id');
    const param_id = querySearch !== null ? window.atob(querySearch) : 'kosong'
    console.log("props", param_id);




    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('user')) history.push('/');

    var ID_users = '';
    var penanggung_jwb = '';
    if (state.isAuthenticated === true) {
        ID_users = state.user.ID_USER;
        penanggung_jwb = state.user.nama_penanggung_jawab
    }

    const [Prompt, setDirty, setPristine] = useUnsavedChangesWarning();

    // ISI NAMA PRODUK ======================================================
    const [large, setLarge] = useState(false)
    const stateForm = {
        kontent: ""
    }
    const [namaProduk, setNamaProduk] = useState(stateForm)
    const [showAddStep, setshowAddStep] = useState(false)

    const handleKontentSubmit = event => {
        setLarge(true)
        setshowAddStep(true)
        event.preventDefault();
        // document.getElementById("stepInput").readOnly = true;
    }

    // Data bahan baku ======================================================
    const initialFormState = {
        id: null,
        id_in_step: '',
        kontent: '',
        id_user: '',
        status: '',
        keterangan: namaProduk.kontent,
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

    // Setting state
    const [produks, setProduk] = useState([])
    const [currentProduk, setCurrentProduk] = useState(initialFormState)
    const [editing, setEditing] = useState(false)
    const [editBahan, setEditBahan] = useState(false)

    const [alertHapus, setAlertHapus] = useState(null)

    // CRUD operations
    const addProduk = produk => {
        produk.id = produks.length + 1
        produk.id_user = ID_users
        produk.otorisator = penanggung_jwb
        setProduk([...produks, produk])
    }

    const deleteProduk = id => {
        setEditing(false)
        setAlertHapus(
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Ya"
                cencelBtnText="Batal"
                confirmBtnBsStyle="danger"
                cencelBtnBsStyle="info"
                title="Apakah anda yakin?"
                onConfirm={() => {
                    setProduk(produks.filter(produk => produk.id !== id))
                    setAlertHapus(null)
                }}
                onCancel={() => setAlertHapus(null)}
            >
                Ingin menghapus Item ini?
            </SweetAlert>
        )
    }

    const updateProduk = (id, updatedProduk) => {
        setEditing(false)

        setProduk(produks.map(produk => (produk.id === id ? updatedProduk : produk)))
    }

    const editRow = produk => {
        setEditing(true)
        setEditBahan(true)

        setCurrentProduk({
            id: produk.id,
            kontent: produk.kontent,
            id_user: produk.id_user,
            status: produk.status,
            keterangan: produk.keterangan,
            otorisator: produk.otorisator,
            bahan_baku: produk.bahan_baku,
            pemasok: produk.pemasok,
            alamat_pemasok: produk.alamat_pemasok,
            keterangan_bom: produk.keterangan_bom,
            status_bahan_baku: produk.status_bahan_baku,
            sertifikat_halal: produk.sertifikat_halal,
            merk: produk.merk,
            produsen: produk.produsen,
            lembaga_penerbit: produk.lembaga_penerbit,
            expired_date_sertifikat: produk.expired_date_sertifikat,
        })
    }
    // End Data bahan baku ======================================================



    // DATA STEP PEMBUATAN ======================================================
    const initialFormSteps = {
        id: '',
        id_in_step: null,
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

    // Setting state
    const [steps, setStepPembuatan] = useState([])
    const [tepCurrents, setStepCurrent] = useState(initialFormSteps)
    const [editSteps, setEditStep] = useState(false)
    const [showEditStpes, setShowEditStep] = useState(false)


    // TAMBAH step BARU =======================
    const addStepPembuatan = step => {
        step.id_in_step = steps.length + 1
        step.id_user = ID_users
        step.otorisator = penanggung_jwb
        setStepPembuatan([...steps, step]);
    }

    const deleteStepPembuatan = id => {
        setEditStep(false)

        setStepPembuatan(steps.filter(step => step.id_in_step !== id))
    }

    // UPDATE step BERDASARKAN ID ==============================
    const updateStepPembuatan = (id, updateStep) => {
        setEditStep(false)
        setStepPembuatan(steps.map(step => (step.id_in_step === id ? updateStep : step)))
    }

    const editRowStep = step => {
        setEditStep(true)
        setShowEditStep(true)

        setStepCurrent({
            id_in_step: step.id_in_step,
            step_ke: step.step_ke,
            step_keterangan: step.step_keterangan,
            otorisator: penanggung_jwb
        })
    }
    // End DATA STEP PEMBUATAN ======================================================



    const multiData = {
        data: produks.concat(steps)
    }
    // kirim ke database ======================================================
    const [loading, setLoading] = useState(false)
    const [showAlertPost, setShowAlertPost] = useState(null)
    const [suksesPost, setSuksesPost] = useState(null)
    const handlePostAll = (post) => {
        post.preventDefault();
        setLoading(true)
        if (produks.length < 1 || steps.length < 1 || namaProduk.kontent.length < 1) {
            if (namaProduk.kontent.length < 1) toast('Nama Produk Tidak Boleh Kosong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });

            if (produks.length < 1) toast('Bahan Baku Tidak Boleh Kosong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });

            if (steps.length < 1) toast('Step Produksi Tidak Boleh Kosong!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "error"
            });
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } else {
            setShowAlertPost(
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Ya"
                    cencelBtnText="Batal"
                    confirmBtnBsStyle="danger"
                    cencelBtnBsStyle="info"
                    title="Apakah anda yakin?"
                    onConfirm={() => {
                        setShowAlertPost(null);
                        API.insertProdukBomStep(multiData).then(res => {
                            toast("berhasil menyimpan produk", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                type: "success"
                            });
                            setSuksesPost(
                                <SweetAlert
                                    success
                                    confirmBtnText="OK"
                                    confirmBtnBsStyle="success"
                                    title="Data berhasi disimpan!"
                                    timeout={1500}
                                    onConfirm={() => {
                                        setSuksesPost(null)
                                    }}
                                >
                                </SweetAlert>
                            )
                            document.getElementById('stepInput').focus()
                            setProduk([])
                            setStepPembuatan([])
                            setNamaProduk(stateForm)
                            setLoading(false)
                        })
                    }}
                    onCancel={() => setShowAlertPost(null)}
                >
                    Produk yang anda masukkan sudah benar!
                </SweetAlert>
            );
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }
    // End kirim ke database ======================================================

    const [getProduk, sProduk] = useState('')
    useEffect(() => {
        sProduk(produks.map(produk => produk.kontent))
    }, [produks])

    const produkOnchange = event => {
        setDirty();
        setNamaProduk({
            ...namaProduk,
            [event.target.name]: event.target.value,
        })
        setProduk(produks.map(produk => (getProduk.includes(produk.kontent) ? { ...produk, kontent: event.target.value } : produk)));
    }

    return (
        <CRow>
            {Prompt}
            <ToastContainer />
            {alertHapus}
            {showAlertPost}
            {suksesPost}
            <CCol>
                <CCard>
                    <CCardHeader>
                        <strong>TAMBAH PRODUK</strong>
                    </CCardHeader>
                    <CCardBody>


                        <CForm onSubmit={handleKontentSubmit}>
                            <CFormGroup row>
                                <CCol md="3" mt="5">
                                    <CLabel htmlFor="stepInput-input"><strong>Nama Produk</strong></CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput
                                        onChange={produkOnchange}
                                        value={namaProduk.kontent}
                                        required
                                        placeholder="Nama Produk"
                                        name="kontent"
                                        type="text"
                                        id="stepInput"
                                    />
                                    <br />
                                    {isValid(namaProduk.kontent) === false ? (
                                        <CAlert color="danger">
                                            <svg fill="#e55353" width="24" height="24" viewBox="0 0 24 24"><path d="M13 13H11V7H13M11 15H13V17H11M15.73 3H8.27L3 8.27V15.73L8.27 21H15.73L21 15.73V8.27L15.73 3Z" /></svg> Data tidak boleh menggunakan karakter !
                                        </CAlert>
                                    ) : null}
                                </CCol>
                            </CFormGroup>
                            <CButton className="card-header-actions" type="submit" value="Submit" size="sm" color="success">
                                <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
                                Tambah Bahan Baku
                            </CButton>
                        </CForm>


                        {editing ? (
                            <>
                                <CModal show={editBahan} onClose={() => setEditBahan(!editBahan)} size="lg">
                                    <CModalHeader closeButton>
                                        <CModalTitle>Tambah Bahan Baku</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <EditProdukForm
                                            editing={editing}
                                            setEditing={setEditing}
                                            currentProduk={currentProduk}
                                            updateProduk={updateProduk}
                                        />
                                    </CModalBody>
                                </CModal>
                            </>
                        ) : ''}

                        <CModal show={large} onClose={() => setLarge(!large)} size="lg">
                            <CModalHeader closeButton>
                                <CModalTitle>Tambah Bahan Baku</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <AddProduk addProduk={addProduk} namaProduk={namaProduk.kontent} setLarge={setLarge} />
                            </CModalBody>
                        </CModal>

                    </CCardBody>

                    <CCardBody>
                        <ProdukTable produks={produks} editRow={editRow} deleteProduk={deleteProduk} />
                    </CCardBody>

                    {showAddStep === false ? "" : (
                        <>
                            <CCardBody>
                                <hr />
                                <strong><span>ALUR PROSES PRODUKSI</span></strong>
                                <hr />
                                {editSteps ? (

                                    <CModal show={showEditStpes} onClose={() => setShowEditStep(!showEditStpes)} size="lg">
                                        <CModalHeader closeButton>
                                            <CModalTitle>Edit Step Pembuatan</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <EditstepForm
                                                editSteps={editSteps}
                                                setEditStep={setEditStep}
                                                tepCurrents={tepCurrents}
                                                updateStepPembuatan={updateStepPembuatan}
                                            />
                                        </CModalBody>
                                    </CModal>

                                ) : ''}

                                <AddStepPembuatan
                                    addStepPembuatan={addStepPembuatan}
                                    namaProduk={namaProduk.kontent}
                                />

                            </CCardBody>
                            <CCardBody>
                                <StepTable steps={steps} editRowStep={editRowStep} deleteStepPembuatan={deleteStepPembuatan} />
                            </CCardBody>
                        </>
                    )}
                    <CCardBody>
                        <CForm onSubmit={e => { setPristine(e); handlePostAll(e) }} action="" method="post" encType="multipart/form-data" className="form-horizontal">

                            {loading ? (
                                <span className="card-header-action" style={{ float: "right" }}>
                                    <button className="btn btn-success" type="button" disabled>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                </span>
                            ) : (
                                <CButton className="card-header-actions" type="submit" value="Submit" color="primary">
                                    <svg fill="currentColor" width="18" height="17" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg> Publish
                                </CButton>
                            )}
                        </CForm>
                    </CCardBody>

                </CCard>
            </CCol>
        </CRow>
    )
}

export default TambahProduk