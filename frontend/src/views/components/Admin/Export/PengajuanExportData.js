import React, { useContext, useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CButton,
    CForm,
    CFormGroup,
    CTextarea,
    CCardFooter,
    CAlert,
    CBadge
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../service/auth/UserProvider"
import API from '../../../../service/api'
import SweetAlert from "react-bootstrap-sweetalert"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import 'react-bootstrap-typeahead/css/Typeahead.css'
import SearchUMKMByPenyelia from '../Master/Master_UMKM/Search_UMKM_By_Penyelia'
import { CSVLink } from 'react-csv'

const PengajuanExportData = () => {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia')) history.push('/');

    var id_penyelia = '';
    var penanggungjawab = '';
    if (state.isAuthenticated === true) {
        id_penyelia = state.user.ID_USER;
        penanggungjawab = state.user.nama_penanggung_jawab;
    }

    const [query, setQuery] = useState('')

    const {
        dataUMKM,
        // hasMore,
        loading,
        // totalSemua,
        // error
    } = SearchUMKMByPenyelia(query, 1, 10, state.user.ID_USER)

    const [getDataSearch, setDataSerach] = useState([])

    const clear = React.useRef(null)
    const hendleChange = (e) => {
        if (e !== undefined) {
            setDataSerach([...getDataSearch, e])
            setTimeout(() => {
                clear.current.clear()
            }, 10);
        }
    }

    const [getDtaExport, setDataExport] = useState([])
    useEffect(() => {
        API.getDataPengajuanExport(id_penyelia).then(res => {
            setDataExport(res.data);
        })
    }, [id_penyelia])

    const fieldDataExport = [
        { key: 'produk', label: 'PRODUK', _style: { width: '8%', TextAlign: 'center' }, sorter: false, filter: false },
        { key: 'tahapan', label: 'TAHAPAN PEROSES', _style: { width: '8%', TextAlign: 'center' }, sorter: false, filter: false },
        { key: 'NAMA_PERUSAHAAN', _style: { TextAlign: 'center' }, label: 'NAMA PERUSAHAAN' },
        { key: 'CONTENT', _style: { TextAlign: 'center' }, label: 'TUJUAN' },
        { key: 'status', label: 'STATUS', _style: { width: '8%', TextAlign: 'center' }, sorter: false, filter: false },
        { key: 'delete', label: '', _style: { width: '8%', TextAlign: 'center' }, sorter: false, filter: false },
    ];

    const statusColor = (status) => {
        switch (status) {
            case 0:
                return "secondary";
            case 1:
                return "success";
            default:
                return 0;
        }
    }

    const [keterangan, setKeterangan] = useState('')

    var dataPengajuan = [];
    for (let i = 0; i < getDataSearch.length; i++) {
        const item = getDataSearch[i];
        dataPengajuan.push({
            ID_PENYELIA: id_penyelia,
            NAMA_PENYELIA: penanggungjawab,
            ID_USER: item.ID_USER,
            NAMA_PERUSAHAAN: item.NAMA_PERUSAHAAN,
            CONTENT: keterangan,
            IS_AKTIF: 0
        })

    }

    const fieldsStep = [
        { key: 'hapus', label: '', _style: { width: '8%' }, sorter: false, filter: false },
        { key: 'NAMA_PERUSAHAAN', label: 'NAMA PERUSAHAAN' }
    ];

    const [alertEdits, setAlertEdit] = useState(null)
    const [load, setLoding] = useState(false)
    const onSubmitForm = (event) => {
        event.preventDefault();
        setLoding(true)
        API.insertDataPengajuanExport({ data: dataPengajuan }).then(res => {
            setLoding(false)
            setAlertEdit(
                <SweetAlert
                    success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    title="Pengajuan Export Data berhasil."
                    onConfirm={() => {
                        setAlertEdit(null)
                        setDataSerach([])
                    }}
                >
                </SweetAlert>
            )
            API.getDataPengajuanExport(id_penyelia).then(res => {
                setDataExport(res.data);
            })
        })
    }

    const hendleDelete = (id) => {
        API.deletePengajuanExportData(id).then(res => {
            setAlertEdit(
                <SweetAlert
                    success
                    confirmBtnText="OK"
                    confirmBtnBsStyle="success"
                    onConfirm={() => {
                        setAlertEdit(null)
                        setDataSerach([])
                    }}
                >
                </SweetAlert>
            )
            API.getDataPengajuanExport(id_penyelia).then(res => {
                setDataExport(res.data);
            })
        })
    }


    const csvLinkProduk = React.useRef()
    const csvLinkStep = React.useRef()
    const [dataProduk, setDataProduk] = useState([])
    const [namaPerusahaan, setNamaPerusahan] = useState('')
    const [dataStep, setDataStep] = useState([])
    var dt = new Date();
    var dateTime = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt.getDate().toString().padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')}-Time-${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`

    const HendleDownloadProduk = (perusahaan, id_user) => {
        setNamaPerusahan(perusahaan)
        API.exportDataProduk(id_user).then(res => {
            if (res.data.length > 0) {
                setDataProduk(res.data);
            } else {
                setDataProduk([{ ID_USER: 'PRODUK TIDAK ADA.' }]);
            }
            setTimeout(() => {
                csvLinkProduk.current.link.click();
            }, 100);
        })
    }
    const HendleDownloadStep = (perusahaan, id_user) => {
        setNamaPerusahan(perusahaan)
        API.exportStepProduksi(id_user).then(res => {
            if (res.data.length > 0) {
                setDataStep(res.data);
            } else {
                setDataStep([{ ID_USER: 'STEP PRODUKSI PRODUK TIDAK ADA.' }]);
            }
            setTimeout(() => {
                csvLinkStep.current.link.click();
            }, 100);
        })
    }
    return (
        <>
            <CSVLink
                ref={csvLinkProduk}
                // headers={headers}
                filename={`Produk-${namaPerusahaan}-${dateTime}.csv`}
                className="btn btn-info d-none" // button is hidden
                data={dataProduk}
            />
            <CSVLink
                ref={csvLinkStep}
                // headers={fieldsStep}
                filename={`Step-Produk-${namaPerusahaan}-${dateTime}.csv`}
                className="btn btn-info d-none" // button is hidden
                data={dataStep}
            />
            {alertEdits}
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>CARI UMKM</strong>
                        </CCardHeader>
                        <CCardBody>
                            <AsyncTypeahead
                                id="async-example"
                                ref={clear}
                                inputProps={{ disabled: getDataSearch.length === 5 ? true : false, required: true, style: { fontWeight: "bolder" } }}
                                isLoading={loading}
                                labelKey="NAMA_PERUSAHAAN"
                                minLength={1}
                                onSearch={setQuery}
                                options={dataUMKM}
                                useCache={false}
                                onChange={e => hendleChange(e[0])}
                                placeholder={getDataSearch.length === 5 ? "Maksimal 5 Data UMKM" : "Cari nama usaha.."}
                                renderMenuItemChildren={(option, props) => {
                                    return (
                                        <>
                                            <span>{`${option.NAMA_PERUSAHAAN}`}</span>
                                        </>
                                    )
                                }}
                            />
                            <br />
                            {getDataSearch.length === 5 && (
                                <CAlert color="danger">
                                    Maksimal 5 Data UMKM !
                                </CAlert>
                            )}
                            <br />
                            {getDataSearch.length > 0 && (
                                <>
                                    <CDataTable
                                        items={getDataSearch}
                                        fields={fieldsStep}
                                        hover
                                        scopedSlots={{
                                            'hapus':
                                                (item, index) => {
                                                    return (
                                                        <td className="py-2">
                                                            <CButton onClick={() => setDataSerach(getDataSearch.filter((e) => e.ID_USER !== item.ID_USER))} color="danger">Hapus</CButton>
                                                        </td>
                                                    )
                                                }
                                        }}
                                    />
                                    <CForm onSubmit={onSubmitForm}>
                                        <CFormGroup row>
                                            <CCol>
                                                <CTextarea required onChange={e => setKeterangan(e.target.value)} row="5" placeholder="Tujuan Export Data?" />
                                            </CCol>
                                        </CFormGroup>
                                        <CCardFooter>
                                            <div className="card-header-actions">
                                                {load ? (
                                                    <button className="btn btn-primary" type="button" disabled>
                                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </button>
                                                ) : (
                                                    <input className="btn btn-primary" type="submit" value="Ajukan Permintaan"></input>
                                                )}
                                            </div>
                                        </CCardFooter>
                                    </CForm>
                                </>
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>EXPORT DATA PRODUK UMKM</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={getDtaExport}
                                fields={fieldDataExport}
                                hover
                                scopedSlots={{
                                    'produk':
                                        (item, index) => {
                                            if (item.IS_AKTIF === 1) {
                                                return (
                                                    <td className="py-2">
                                                        <CButton onClick={() => HendleDownloadProduk(item.NAMA_PERUSAHAAN, item.ID_USER)} color="primary">Download</CButton>
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td className="py-2">
                                                        <CButton disabled color="secondary">Download</CButton>
                                                    </td>
                                                )
                                            }
                                        },
                                    'tahapan':
                                        (item, index) => {
                                            if (item.IS_AKTIF === 1) {
                                                return (
                                                    <td className="py-2">
                                                        <CButton onClick={() => HendleDownloadStep(item.NAMA_PERUSAHAAN, item.ID_USER)} color="success">Download</CButton>
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td className="py-2">
                                                        <CButton disabled color="secondary">Download</CButton>
                                                    </td>
                                                )
                                            }
                                        },
                                    'status':
                                        (item, index) => {
                                            return (
                                                <td className="py-2 text-center">
                                                    <CBadge color={statusColor(item.IS_AKTIF)}>
                                                        {item.IS_AKTIF === 0 ? 'SEDANG PEROSES' : item.IS_AKTIF === 1 ? 'AKTIF' : 'SEDANG PEROSES'}
                                                    </CBadge>
                                                </td>
                                            )
                                        },
                                    'delete':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CButton onClick={() => hendleDelete(item.ID)} color="danger">Hapus</CButton>
                                                </td>
                                            )
                                        },
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default PengajuanExportData
