import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CLabel, CInput, CFormGroup, CModal, CModalHeader, CModalTitle, CModalBody, CTextarea, CForm, CModalFooter } from '@coreui/react'
import API from '../../../../service/api'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Timeline_Notifikasi() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia')) history.push('/');

    const querySearch = new URLSearchParams(window.location.search).get('_id');
    const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';

    var id_penyelia = '';
    var nama_penanggung_jawab = '';
    if (state.isAuthenticated === true) {
        id_penyelia = state.user.ID_USER;
        nama_penanggung_jawab = state.user.nama_penanggung_jawab;
    }

    const [dataUserNotifikasi, setDataNotifikasi] = useState([])
    useEffect(() => {
        API.getNotification({ id_pengirim: param_id, id_penerima: id_penyelia }).then(res => {
            setDataNotifikasi(res.data)
        })
    }, [id_penyelia, param_id])
    const [getModalKirimPesan, setModalKirimPesan] = useState(false);

    const hendlesubmit = (e) => {
        let id_pengirim = id_penyelia;
        let id_penerima = param_id;
        let pengirim = 'PENYELIA'
        let keterangan = e.target[1].value;
        let data = { id_pengirim, id_penerima, pengirim, keterangan };
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
            API.getNotifikasiByPenyelia(id_penyelia).then(res => {
                setDataNotifikasi(res.data)
            })
        })
    };

    return (
        <CRow>
            <ToastContainer />
            <CCol>
                <CCard>
                    <CCardHeader>
                        <strong>TIMELINE NOTIFIKASI</strong>
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
                        <CForm onSubmit={e => { e.preventDefault(); hendlesubmit(e); }}>
                            <CModalBody>
                                <CFormGroup row className="my-0" style={{ margin: "0 auto" }}>
                                    <CCol>
                                        <CFormGroup row>
                                            <CCol md="2">
                                                <CLabel htmlFor="dari"><strong>Dari</strong></CLabel>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                <CInput readOnly value={nama_penanggung_jawab} placeholder="dari" name="merk" type="text" style={{ fontWeight: "bolder" }} />
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol md="2">
                                                <CLabel htmlFor="pesan"><strong>Pesan</strong></CLabel>
                                            </CCol>
                                            <CCol xs="12" md="10">
                                                <CTextarea required rows="4" placeholder="Type here...." name="kirimPesan" type="text" id="pesan" />
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                            </CModalBody>
                            <CModalFooter>
                                <CButton type="submit" color="primary">Kirim</CButton>
                            </CModalFooter>
                        </CForm>
                    </CModal>
                    <CCardBody>
                        <CCol className="notifikasi">
                            <VerticalTimeline>
                                {dataUserNotifikasi.map((d, i) => {
                                    return (
                                        <VerticalTimelineElement
                                            className="vertical-timeline-element--work"
                                            contentStyle={{ background: '#fff', borderTop: `4px solid ${d.SUBJECT === 'PELAKU' ? 'rgb(9, 159, 159)' : 'rgb(249, 173, 75)'}`, borderBottom: `4px solid ${d.SUBJECT === 'PELAKU' ? 'rgb(9, 159, 159)' : 'rgb(249, 173, 75)'}`, borderRadius: `10px`, color: `rgb(81, 81, 81)`, boxShadow: 'rgba(0, 0, 0, 0.05) 0px 7px 6px 2px, rgba(0, 0, 0, 0.03) 0px 4px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 10px 0px' }}
                                            contentArrowStyle={{ borderRight: '#fff' }}
                                            date={d.CREATE_DATE}
                                            iconStyle={{ background: `${d.SUBJECT === 'PELAKU' ? 'rgb(9, 159, 159)' : 'rgb(249, 173, 75)'}`, color: '#fff', fontWeight: `bolder`, }}
                                            icon={<svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>}
                                        >
                                            <span className="vertical-timeline-element-subtitle" style={{ display: `${i === 0 ? 'contents' : 'none'}`, color: `${d.SUBJECT === 'PELAKU' ? 'rgb(9, 159, 159)' : 'rgb(249, 173, 75)'}` }}>Terbaru</span>
                                            <h4 className="vertical-timeline-element-title" style={{ fontWeight: "bolder" }}>{d.PENGIRIM}</h4>
                                            <hr />
                                            <p className="notifikasi">
                                                {d.KETERANGAN}
                                            </p>
                                        </VerticalTimelineElement>
                                    )
                                }
                                )}
                            </VerticalTimeline>
                        </CCol>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Timeline_Notifikasi
