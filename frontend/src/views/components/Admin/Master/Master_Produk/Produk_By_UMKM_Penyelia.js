import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CButton,
    CDataTable,
    CCardHeader,
    CImg,
    CBadge
} from '@coreui/react'
import API from '../../../../../service/api'
import GoogleMapsUMKM from '../GoogleMapsByUMKM/GoogleMapsUMKM'
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../../../../../service/auth/UserProvider"

function Produk_By_UMKM_Penyelia() {
    const querySearch = new URLSearchParams(window.location.search).get('_id');
    const querynameSearch = new URLSearchParams(window.location.search).get('_key');
    const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';
    const param_name = querynameSearch !== null ? window.atob(querynameSearch) : '';

    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');

    const initData = {
        PENYELIA: '',
        ALAMAT: '',
        NAMA_PENANGGUNG_JAWAB: '',
        NOMOR_TELEPON: '',
        EMAIL: ''
    }
    const [getUmkm, setProdukUmkm] = useState(initData)
    const [namaProduk, setNamaProduk] = useState([])
    const [loadingTbl, setLoadingTbl] = useState(true)

    const dataUMKM = [{
        ID_USER: '',
        NAMA_PERUSAHAAN: '',
        EMAIL: '',
        NOMOR_TELEPON: '',
        ALAMAT: '',
        LATTITUDE: '',
        LONGITUDE: ''
    }]
    const [mpaLokasi, setLokasiMap] = useState(dataUMKM)

    useEffect(() => {
        API.getUserPrifile(param_id).then(res => {
            setProdukUmkm(res.data[0]);
        });
        API.getProduk(param_id).then(res => {
            setNamaProduk(res.data);
            setLoadingTbl(false)
        });
        API.googleMapsLocationUMKMbyID(param_id).then(res => {
            setLokasiMap(res.data)
        })
    }, [param_id])

    const fields = [
        { key: 'KODE_BARANG', _style: { width: '15%' } },
        { key: 'CONTENT', label: 'NAMA PRODUK', _style: { width: '30%' } },
        { key: 'STATUS', _style: { width: '15%' } },
        { key: 'KETERANGAN', _style: { width: '20%' } },
        {
            key: 'edit_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]

    const getBadge = (status) => {
        switch (status) {
            case 'SEDANG DIPROSES': return 'secondary'
            case 'SEDANG PROSES': return 'secondary'
            case 'HALAL': return 'success'
            case 'HARAM': return 'danger'
            case 'RAGU-RAGU': return 'warning'
            default: return 'primary'
        }
    }

    const [getGambar, setGambar] = useState([])
    useEffect(() => {
        API.getBuktiPembayaran(param_id).then(res => {
            setGambar(res.data)
        })
    }, [param_id])
    const fieldsStep = [
        {
            key: 'gambar',
            label: 'Foto',
            // _style: { width: '8%' },
            sorter: false,
            filter: false
        },
        { key: 'ATAS_NAMA', label: 'ATAS NAMA' },
        { key: 'NOMINAL', label: 'NOMINAL' },
        { key: 'DATE', label: 'TANGGAL' }
    ];
    return (
        <>
            <CRow>
                <CCol>

                    <CCard>
                        <CCardHeader>
                            <strong>Lokasi Maps</strong>
                        </CCardHeader>
                        <CCardBody>
                            <GoogleMapsUMKM dataUMKM={mpaLokasi} />
                        </CCardBody>
                    </CCard>

                    <CCard>
                        <CCardBody>
                            <div className="notifikasi table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Nama Perusahaan</td>
                                            <td>:</td>
                                            <td><label id="lbl_nama_perusahaan">{param_name}</label></td>
                                        </tr>
                                        {/* <tr>
                                            <td>Alamat</td>
                                            <td>:</td>
                                            <td><label id="lbl_produk">{getUmkm.ALAMAT !== undefined ? getUmkm.ALAMAT : ""}</label></td>
                                        </tr> */}
                                        <tr>
                                            <td>Penanggung Jawab</td>
                                            <td>:</td>
                                            <td><label id="lbl_produk">{getUmkm.NAMA_PENANGGUNG_JAWAB}</label></td>
                                        </tr>
                                        <tr>
                                            <td>No. Telepon/Email</td>
                                            <td>:</td>
                                            <td><label id="lbl_produk">{getUmkm.NOMOR_TELEPON} / {getUmkm.EMAIL}</label></td>
                                        </tr>
                                        <tr>
                                            <td>Penyelia</td>
                                            <td>:</td>
                                            <td>
                                                <label id="lbl_produk">
                                                    <CBadge color="success">
                                                        {getUmkm.PENYELIA}
                                                    </CBadge>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Detail Profil</td>
                                            <td>:</td>
                                            <td>
                                                <Link to={`/master-umkm/profil-umkm/profil?_key=${window.btoa(param_name)}&_id=${window.btoa(param_id)}`}>
                                                    <button className="btn btn-info">Detail</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <CDataTable bordered borderColor="primary"
                                items={namaProduk}
                                fields={fields}
                                tableFilter
                                itemsPerPageSelect
                                striped
                                border={true}
                                itemsPerPage={10}
                                loading={loadingTbl}
                                hover
                                sorter
                                pagination
                                scopedSlots={{
                                    'STATUS':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.STATUS)}>
                                                    {item.STATUS}
                                                </CBadge>
                                            </td>
                                        ),
                                    'edit_details':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <Link to=
                                                        {
                                                            {
                                                                pathname: `/master-umkm/Pemeriksaan_Produk/search?_id=${window.btoa(item.KODE_BARANG)}&_key=${window.btoa(item.CONTENT)}&_user=${window.btoa(item.ID_USER)}`,
                                                                state: {
                                                                    is_edit: true,
                                                                    KODE_BARANG: item.KODE_BARANG,
                                                                    CONTENT: item.CONTENT
                                                                }
                                                            }
                                                        }>
                                                        <CButton
                                                            color="danger"
                                                            size="sm"
                                                        >
                                                            Ubah
                                                        </CButton>
                                                    </Link>
                                                </td>
                                            )
                                        }
                                }}
                            />
                        </CCardBody>
                    </CCard>

                    <CCard>
                        <CCardHeader>
                            <strong>History Pembayaran</strong>
                        </CCardHeader>
                        <CCardBody>
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

export default Produk_By_UMKM_Penyelia
