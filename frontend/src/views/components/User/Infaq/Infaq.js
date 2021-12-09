import React, { useContext, useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormGroup, CInput, CInputFile, CLabel, CFormText, CImg, CRow, CInputGroup, CInputGroupPrepend, CInputGroupText, CDataTable } from '@coreui/react'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../service/api'
import CurrencyFormat from 'react-currency-format'

function Infaq() {
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

    const [image, setImage] = useState("");
    const [saveImage, setSaveImage] = useState(null);
    const [getNominal, setNominal] = useState(0);

    const stateForm = {
        atas_nama: ""
    }

    const [saveFile, setSaveFile] = useState(stateForm);

    const handleInputChange = event => {
        setSaveFile({
            ...saveFile,
            [event.target.name]: event.target.value,
        })
    }

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
    }

    const [lodaingKirim, setLoading] = useState(false)
    function handleSave() {
        setLoading(true)
        if (saveImage && saveFile.atas_nama && getNominal) {
            let formData = new FormData();
            formData.append("id_user", id_user);
            formData.append("atas_nama", saveFile.atas_nama);
            formData.append("nominal", getNominal);
            formData.append("otorisator", penanggung_jwb);
            formData.append("id_penyelia", id_penyelia);
            formData.append("photo", saveImage);

            API.uploadBuktiPembayaran(formData).then(res => {
                toast(`😊 Bukti pembayaran infaq terkirim.`, {
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
                setImage("")
                setNominal(0)
                setSaveFile(stateForm)
                API.getBuktiPembayaran(id_user).then(res => {
                    setGambar(res.data)
                })
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

    const [getGambar, setGambar] = useState([])
    useEffect(() => {
        API.getBuktiPembayaran(id_user).then(res => {
            setGambar(res.data)
        })
    }, [id_user])
    const fieldsStep = [
        {
            key: 'gambar',
            label: 'Foto',
            _style: { textAlign: 'center' },
            sorter: false,
            filter: false
        },
        { key: 'ATAS_NAMA', _style: { textAlign: 'center' }, label: 'ATAS NAMA' },
        { key: 'NOMINAL', _style: { textAlign: 'center' }, label: 'NOMINAL' },
        { key: 'DATE', _style: { textAlign: 'center' }, label: 'TANGGAL' }
    ];

    return (
        <>
            <CRow>
                <ToastContainer />
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>INFAQ</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <span>Nomor Rekening <b>7882678827</b>
                                    <br />
                                    Rekening <b>BSI</b>
                                    <br />
                                    ATAS NAMA <b>Halal Center Cinta Indonesia</b></span>
                                <hr />
                                <CFormGroup row>
                                    <CCol md="2">
                                        <CLabel htmlFor="text-input">Atas Nama</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="5">
                                        <CInput required onChange={handleInputChange} value={saveFile.atas_nama} id="atas_nama" name="atas_nama" placeholder="Atas nama pengirim..." />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="2">
                                        <CLabel htmlFor="nominal-input">Nominal</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="5">
                                        <CInputGroup>
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    Rp.
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CurrencyFormat
                                                required
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={0}
                                                fixedDecimalScale
                                                // prefix={'Rp. '}
                                                value={getNominal || 0}
                                                placeholder="000.0000"
                                                onValueChange={(e) => setNominal(e.floatValue)}
                                                className="form-control"
                                            />
                                        </CInputGroup>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CLabel col md="2" htmlFor="file-input">Bukti Transfer</CLabel>
                                    <CCol xs="12" md="5">
                                        <CInputFile accept="image/*" required onChange={handleUploadChange} type="file" className="file_input" name="file_input" />
                                        <CFormText className="help-block"><i>Format Wajib .jpg, .png, .jpeg</i></CFormText>
                                        <br />
                                        <CImg className="mb-2 print-gambar" alt="bukti pembayaran" src={image} fluid />
                                    </CCol>
                                </CFormGroup>
                                {lodaingKirim ? (
                                    <span className="card-header-action">
                                        <button className="btn btn-success" type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    </span>
                                ) : (
                                    <CButton onClick={handleSave} className="btn btn-success">Kirim</CButton>
                                )}
                            </CForm>

                            <br />
                            <br />
                            <span><strong>History Pembayaran :</strong></span>
                            <br />
                            <br />
                            <CDataTable
                                items={getGambar}
                                fields={fieldsStep}
                                hover
                                scopedSlots={{
                                    'gambar':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <center>
                                                        <a href={item.FILE} target="_blank" rel="noreferrer" title="bukti pembayaran">
                                                            <CImg width="100px" alt="bukti pembayaran" src={item.FILE} fluid />
                                                        </a>
                                                    </center>
                                                </td>
                                            )
                                        }
                                }}
                            />

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Infaq
