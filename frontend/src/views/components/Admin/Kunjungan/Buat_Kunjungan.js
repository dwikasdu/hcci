import React, { useContext, useEffect, useState } from 'react'
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
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css'
import SearchUMKMByPenyelia from '../Master/Master_UMKM/Search_UMKM_By_Penyelia'
import API from '../../../../service/api'

function Buat_Kunjungan(props) {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    var id_penyelia = '';
    var penanggungjawab = '';
    if (state.isAuthenticated === true) {
        id_penyelia = roles.includes('admin_penyelia') ? state.user.ID_USER : '';
        penanggungjawab = state.user.nama_penanggung_jawab;
    }

    const [query, setQuery] = useState('')

    const {
        dataUMKM,
        // hasMore,
        loading,
        // totalSemua,
        // error
    } = SearchUMKMByPenyelia(query, 1, 10, id_penyelia)

    const initDataSerach = {
        ALAMAT: "",
        CREATE_DATE: "",
        EMAIL: "",
        ID_USER: "",
        NAMA_PERUSAHAAN: "",
        NOMOR_TELEPON: "",
        PROSES: "",
    }

    const [getDataSearch, setDataSerach] = useState(initDataSerach)

    const [getProduk, setProduk] = useState([])
    const [selectProduk, setSelectProduk] = useState({ KODE_BARANG: "", CONTENT: "" })
    const [changePenanggung, setPenanggung] = useState(penanggungjawab)
    useEffect(() => {
        API.getProduk(parseInt(getDataSearch.ID_USER)).then(res => {
            setProduk(res.data);
        })
    }, [getDataSearch])

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [getTanggal, setTanggal] = useState(date);

    const [loadings, setLoading] = useState(false)
    const [alertEdits, setAlertEdit] = useState(null)
    const onHendleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const initInsert = {
            tanggal: getTanggal,
            id_user: getDataSearch.ID_USER,
            kode_jabatan: id_penyelia,
            otorisator: changePenanggung,
            is_kunjungan: 0,
            kode_barang: selectProduk.KODE_BARANG,
            content: selectProduk.CONTENT,
        }
        API.insertKunjungan(initInsert).then(res => {
            setAlertEdit(
                <SweetAlert
                    success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    title="Jadwal Kunjungan Telah Dibuat"
                    onConfirm={() => {
                        setAlertEdit(null)
                        props.setModalDetail(!props.showModalDetail)
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

    if (!props.showModalDetail) {
        document.body.style.overflowY = "scroll";
    }

    return (
        <>
            {alertEdits}

            <CModal fade={true} closeOnBackdrop={false} className="modalDetail" shouldCloseOnOverlayClick={false} size="lg" show={props.showModalDetail} onClose={() => props.setModalDetail(!props.showModalDetail)}>
                <CModalHeader closeButton>
                    <CModalTitle><strong>BUAT JADWAL KUNJUNGAN</strong></CModalTitle>
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
                                <CInput className="datepickerkunjungan" onChange={e => setTanggal(e.target.value)} required name="tanggal" placeholder="dd-mm-yyyy" type="date" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="nama-usaha">Nama Usaha</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {/* <CInput value={getKunjungan.nama_usaha} required placeholder="Nama usaha" name="nama_usaha" type="text" /> */}
                                <AsyncTypeahead
                                    id="async-example"
                                    inputProps={{ required: true, style: { fontWeight: "bolder" } }}
                                    isLoading={loading}
                                    labelKey="NAMA_PERUSAHAAN"
                                    minLength={1}
                                    onSearch={setQuery}
                                    options={dataUMKM}
                                    useCache={true}
                                    onChange={e => setDataSerach(e[0])}
                                    placeholder="Cari nama usaha.."
                                    renderMenuItemChildren={(option, props) => {
                                        return (
                                            <>
                                                <span>{`${option.NAMA_PERUSAHAAN}`}</span>
                                            </>
                                        )
                                    }}
                                />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="id-user">ID User</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput value={getDataSearch.ID_USER} disabled required name="ID_USER" type="text" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="produk_user">Produk</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <Typeahead
                                    id="basic-typeahead-getProduk"
                                    labelKey="CONTENT"
                                    inputProps={{ required: true, style: { fontWeight: "bolder" } }}
                                    clearButton={true}
                                    multiple={false}
                                    options={getProduk}
                                    onChange={e => setSelectProduk(e[0])}
                                    // selected={changeStatus}
                                    placeholder="Pilih Produk"
                                    paginationText="Muat lebih banyak..."
                                />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="alamat">Alamat</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <textarea className="form-control" value={getDataSearch.ALAMAT} rows="3" required placeholder="ALAMAT" name="alamat" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="penanggungjawab">Penanggungjawab</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput defaultValue={getDataSearch.NAMA_PENANGGUNG_JAWAB} required placeholder="Nama Penanggungjawab" name="NAMA_PENANGGUNG_JAWAB" type="text" style={{ fontWeight: "bolder" }} />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="otorisator">Nama Penyelia</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput onChange={e => setPenanggung(e.target.value)} value={changePenanggung} required placeholder="Nama Penyelia" name="otorisator" type="text" style={{ fontWeight: "bolder" }} />
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
                                Simpan
                            </CButton>
                        )}
                    </CForm>

                </CModalBody>
            </CModal>
        </>
    )
}

export default Buat_Kunjungan
