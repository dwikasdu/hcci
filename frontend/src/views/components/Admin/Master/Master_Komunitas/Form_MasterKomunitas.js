import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CForm, CRow, CTextarea, CFormGroup, CLabel, CInput, CFormText, CImg } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../../service/api';

const Form_MasterKomunitas = () => {

    const [logo1, setLogo1] = useState("");
    const [getLogo1, setSavelogo1] = useState(null)
    function handleUploadLogo1(e) {
        let uploaded = e.target.files[0];
        setLogo1(URL.createObjectURL(uploaded));
        setSavelogo1(uploaded);
    }

    const [logo2, setLogo2] = useState("");
    const [getLogo2, setSavelogo2] = useState(null)
    function handleUploadLogo2(e) {
        let uploaded = e.target.files[0];
        setLogo2(URL.createObjectURL(uploaded));
        setSavelogo2(uploaded);
    }

    const initValue = {
        IN_NAMA_KOMUNITAS: '',
        IN_KETERANGAN: '',
        IN_KETERANGAN_KOP_SERTIFIKAT_1: '',
        IN_KETERANGAN_KOP_SERTIFIKAT_2: '',
    }
    const [getData, setData] = useState(initValue)
    const hendleInputChange = (e) => {
        const { name, value } = e.target
        setData({ ...getData, [name]: value })
    }

    const [lodaingKirim, setLoading] = useState(false)
    function handleSave() {
        setLoading(true)
        if (getLogo1 || getLogo2) {
            let formData = new FormData();
            formData.append("IN_ID", null);
            formData.append("IN_NAMA_KOMUNITAS", getData.IN_NAMA_KOMUNITAS);
            formData.append("IN_KETERANGAN", getData.IN_KETERANGAN);
            formData.append("IN_KETERANGAN_KOP_SERTIFIKAT_1", getData.IN_KETERANGAN_KOP_SERTIFIKAT_1);
            formData.append("IN_KETERANGAN_KOP_SERTIFIKAT_2", getData.IN_KETERANGAN_KOP_SERTIFIKAT_2);
            formData.append("IN_IS_AKTIF", 1);
            formData.append("logo1", getLogo1);
            formData.append("logo2", getLogo2);

            API.insertMasterKomunitas(formData).then(res => {
                toast(`😊 Komunitas Ditambahkan.`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    type: "success"
                });
                setLoading(false)
                setData(initValue)
                setLogo1('')
                setLogo2('')
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
        } else {
            toast(`Isi data dan format gambar dengan benar!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "danger"
            });
        }
    }

    return (
        <>
            <CRow>
                <ToastContainer />
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>MASTER KOMUNITAS</strong>
                        </CCardHeader>
                        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="6" className="mb-2">

                                        <CLabel htmlFor="IN_NAMA_KOMUNITAS"><strong>Nama Komunitas</strong></CLabel>
                                        <CInput required placeholder="Nama Komunitas" onChange={hendleInputChange} name="IN_NAMA_KOMUNITAS" value={getData.IN_NAMA_KOMUNITAS} type="text" />

                                    </CCol>
                                    <CCol md="6" className="mb-2">

                                        <CLabel htmlFor="IN_KETERANGAN"><strong>Keterangan</strong></CLabel>
                                        <CInput required placeholder="Keterangan" onChange={hendleInputChange} name="IN_KETERANGAN" value={getData.IN_KETERANGAN} type="text" />

                                    </CCol>
                                    <CCol md="6" className="mb-2">

                                        <CLabel htmlFor="logo1"><strong>Logo 1</strong></CLabel>
                                        <CInput accept="logo1/*" onChange={handleUploadLogo1} required type="file" className="file_input" name="LOGO1" />
                                        <CFormText className="help-block"><i>Format Wajib .jpg, .png, .jpeg</i></CFormText>
                                        <br />
                                        {logo1 && (<CImg width="100px" alt="logo 1" src={logo1} fluid />)}

                                    </CCol>
                                    <CCol md="6" className="mb-2">

                                        <CLabel htmlFor="logo2"><strong>Logo 2</strong></CLabel>
                                        <CInput accept="logo2/*" onChange={handleUploadLogo2} required type="file" className="file_input" name="LOGO2" />
                                        <CFormText className="help-block"><i>Format Wajib .jpg, .png, .jpeg</i></CFormText>
                                        <br />
                                        {logo2 && (<CImg width="100px" alt="logo 2" src={logo2} fluid />)}

                                    </CCol>

                                    <CCol md="6" className="mb-2">

                                        <CLabel htmlFor="IN_KETERANGAN_KOP_SERTIFIKAT_1"><strong>Keterangan Logo 1</strong></CLabel>
                                        <CTextarea required placeholder="Keterangan..." row="2" onChange={hendleInputChange} name="IN_KETERANGAN_KOP_SERTIFIKAT_1" value={getData.IN_KETERANGAN_KOP_SERTIFIKAT_1} />

                                    </CCol>

                                    <CCol md="6" className="mb-2">

                                        <CLabel htmlFor="IN_KETERANGAN_KOP_SERTIFIKAT_2"><strong>Keterangan Logo 2</strong></CLabel>
                                        <CTextarea required placeholder="Keterangan..." row="2" onChange={hendleInputChange} name="IN_KETERANGAN_KOP_SERTIFIKAT_2" value={getData.IN_KETERANGAN_KOP_SERTIFIKAT_2} />

                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                            <CCardFooter>
                                <div className="card-header-actions mb-3">
                                    {lodaingKirim ? (
                                        <span className="card-header-action">
                                            <button className="btn btn-success" type="button" disabled>
                                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                Loading...
                                            </button>
                                        </span>
                                    ) : (
                                        <CButton onClick={handleSave} className="btn btn-success">Simpan</CButton>
                                    )}
                                </div>
                            </CCardFooter>
                        </CForm>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Form_MasterKomunitas