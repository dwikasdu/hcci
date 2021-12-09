import React, { useContext, useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormGroup,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CTextarea,
    CForm,
    CModalFooter
} from '@coreui/react'
import './Notifikasi.css'

import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../service/api'

function Notifikasi() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('user')) history.push('/');


    var id_user = '';
    var id_penyelia = '';
    var penanggung_jwb = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
        id_penyelia = state.user.id_penyelia;
        penanggung_jwb = state.user.nama_penanggung_jawab;
    }

    const [notifications, setNotif] = useState([])

    useEffect(() => {
        API.getNotification({ id_pengirim: id_user, id_penerima: id_penyelia }).then(res => {
            setNotif(res.data);
        })
    }, [id_user, id_penyelia])

    const [getModalKirimPesan, setModalKirimPesan] = useState(false);

    const submit = e => {
        let id_pengirim = id_user;
        let id_penerima = id_penyelia;
        let pengirim = 'PELAKU'
        let keterangan = e.target[0].value;
        let data = { id_pengirim, id_penerima, pengirim, keterangan };
        postCustomer(data);
    };

    const postCustomer = data => {
        setModalKirimPesan(!getModalKirimPesan)
        API.insNotification(data).then(res => {
            toast(`😊 Pesan Terkirim.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success"
            });
            API.getNotification({ id_pengirim: id_user, id_penerima: id_penyelia }).then(res => {
                setNotif(res.data);
            })
        })
    };

    return (
        <>
            <ToastContainer />
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <b>NOTIFIKASI</b>
                            <div className="card-header-actions">
                                <CButton onClick={() => setModalKirimPesan(!getModalKirimPesan)} color="primary" size="sm" className="btn-brand mr-1 mb-1">
                                    <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
                                    Tulis Pesan
                                </CButton>
                            </div>
                        </CCardHeader>

                        <CModal show={getModalKirimPesan} onClose={() => setModalKirimPesan(!getModalKirimPesan)} size="lg">
                            <CModalHeader closeButton>
                                <CModalTitle>Kirim Pesan</CModalTitle>
                            </CModalHeader>
                            <CForm onSubmit={e => { e.preventDefault(); submit(e); }}>
                                <CModalBody>
                                    <CTextarea required rows="4" placeholder="Type here...." name="kirimPesan" type="text" id="kirimPesan" />
                                </CModalBody>
                                <CModalFooter>
                                    <CButton type="submit" color="primary">Kirim</CButton>
                                </CModalFooter>
                            </CForm>
                        </CModal>
                        <CCardBody>
                            <CFormGroup row>
                                <CCol>
                                    {notifications.map((notif, index) =>
                                        <div key={index}>
                                            <div color="success" className="notifikasi">
                                                {notif.PENGIRIM !== penanggung_jwb ? (<strong>{notif.PENGIRIM}</strong>) : (<strong>Anda</strong>)}
                                                <span className="card-header-actions">{notif.CREATE_DATE}</span>
                                                <hr />
                                                <p className="notifikasi">{notif.KETERANGAN}</p>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                </CCol>
                            </CFormGroup>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Notifikasi
