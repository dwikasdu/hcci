import React, { useContext, useState, useEffect } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInputFile,
    CLabel,
    CFormText,
    CImg,
    CInput,
    CRow,
    // CDataTable
} from '@coreui/react'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../service/api'
import Select from "react-select";
import $ from 'jquery'

function BuktiHalal() {
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

    const [namaProduk, setNamaProduk] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const [namaBB, setNamaBB] = useState(null);
    const [valueBB, setValueBB] = useState(null);

    function handleChangeProduk(e) {
        setSelectedOption(e)
        setValueBB(null)
        $('.bahan-baku > div > div > div:first').text('Pilih Bahan Baku').css({ color: "#bbb" })
    }
    function handleChangeBB(e) {
        setValueBB(e)
        $('.bahan-baku > div > div > div:first').css({ color: "#333333" })
    }

    useEffect(() => {
        API.getProduk(id_user).then(res => {
            const data = res.data
            const opsi = data.map(d => ({
                "value": d.KODE_BARANG,
                "label": d.CONTENT
            }))
            setNamaProduk(opsi)
        })
        API.getBOMByUserId(id_user).then(res => {
            const setBB = res.data
            const bb = setBB.map(d => ({
                "value": d.in_kode_barang,
                "kode": d.id_bahan_baku,
                "label": d.bahan_baku,
                "namaProduk": d.kontent
            }))
            setNamaBB(bb)
        });
    }, [id_user])

    let kode_produk = '';
    let valBahan = '';
    if (selectedOption !== null) {
        kode_produk = selectedOption.value;
        valBahan = namaBB.filter(ele => ele.value === kode_produk);
    }
    let nama_bahan = '';
    let kode_bahan = '';
    if (valueBB !== null) {
        kode_bahan = valueBB.kode;
        nama_bahan = valueBB.label
    }

    const [image, setImage] = useState("");
    const [saveImage, setSaveImage] = useState(null);

    function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
    }

    const [lodaingKirim, setLoading] = useState(false)
    function handleSave() {
        setLoading(true)
        if (saveImage && valueBB !== null) {
            let formData = new FormData();
            formData.append("id_user", id_user);
            formData.append("nama_barang", nama_bahan);
            formData.append("kode_barang", kode_bahan);
            formData.append("otorisator", penanggung_jwb);
            formData.append("id_penyelia", id_penyelia);
            formData.append("photo_bahan", saveImage);

            API.uploadBuktiHalal(formData).then(res => {
                toast(`😊 Gambar bahan ${nama_bahan} dikirim.`, {
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
                // API.getBuktiHalal(id_user).then(res => {
                //     setGambar(res.data)
                // })
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

    // const [getGambar, setGambar] = useState([])
    // useEffect(() => {
    //     API.getBuktiHalal(id_user).then(res => {
    //         setGambar(res.data)
    //     })
    // }, [id_user])
    // const fieldsStep = [
    //     {
    //         key: 'gambar',
    //         label: 'Foto',
    //         // _style: { width: '8%' },
    //         sorter: false,
    //         filter: false
    //     },
    //     { key: 'NAMA_BARANG', label: 'NAMA BARANG' },
    //     { key: 'KODE_BARANG', label: 'KODE BARANG' },
    //     { key: 'DATE', label: 'TANGGAL' }
    // ];
    return (
        <>
            <CRow>
                <ToastContainer />
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>Form Bukti Bahan Baku Halal</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <CFormGroup row>
                                    <CCol md="2">
                                        <CLabel htmlFor="text-input">Nama Produk</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="5">
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={handleChangeProduk}
                                            options={namaProduk}
                                        />
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="2">
                                        <CLabel htmlFor="text-input">Nama Bahan Baku</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="5">
                                        {selectedOption !== null ? (
                                            <Select
                                                defaultValue={valueBB}
                                                onChange={handleChangeBB}
                                                options={valBahan}
                                                placeholder="Pilih Bahan Baku"
                                                className="bahan-baku"
                                            />
                                        ) : (
                                            <CInput readOnly type="text" className="form-control" placeholder="Bahan Baku" />
                                        )}
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CLabel col md="2" htmlFor="file-input">Gambar</CLabel>
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


                            {/* <br />
                            <br />
                            <span><strong>History Upload Bukti halal :</strong></span>
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
                            /> */}


                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default BuktiHalal
