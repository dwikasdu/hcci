import React, { useState, useContext, useEffect } from 'react'
import DataTable from './DataTable'
import { CRow, CCard, CCardHeader, CCardBody, CCol, CButton, CInputGroup, CModal, CModalHeader, CModalTitle, CModalBody, CCardFooter, CAlert } from '@coreui/react'
import { Typeahead } from "react-bootstrap-typeahead";
import SweetAlert from "react-bootstrap-sweetalert"
import TableStep from './step_peroses/TableStep'
import DetailProduk from './Detail_Produk'
import API from '../../../../service/api'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { Link, useHistory } from 'react-router-dom';

function PemeriksaanProduk() {

    const querySearch = new URLSearchParams(window.location.search).get('_id');
    const querynameSearch = new URLSearchParams(window.location.search).get('_key');
    const queryUser = new URLSearchParams(window.location.search).get('_user');
    const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';
    const param_name = querynameSearch !== null ? window.atob(querynameSearch) : '';
    const user_id = queryUser !== null ? window.atob(queryUser) : '';

    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('admin_penyelia') && !roles.includes('super_admin')) history.push('/');


    const initData = {
        NAMA_PERUSAHAAN: '',
        ALAMAT: '',
        NAMA_PENANGGUNG_JAWAB: '',
        NOMOR_TELEPON: '',
        EMAIL: ''
    }
    const [getUmkm, setProdukUmkm] = useState(initData)
    const [data, setData] = React.useState([]);
    const [steps, setStepPembuatan] = useState([])
    useEffect(() => {
        API.getUserPrifile(user_id).then(res => {
            setProdukUmkm(res.data[0]);
        });
        API.getbillOfMaterials(param_id).then(res => {
            setData(res.data)
        });
        API.getStepProduksi(param_id).then(res => {
            setStepPembuatan(res.data);
        });
    }, [param_id, user_id])


    const EditableCell = ({ cell: { value: initialValue }, row: { index }, column: { id }, updateMyData }) => {
        return <input class="form-control" style={{ fontWeight: "bold" }} value={initialValue === ' ' ? '' : initialValue} onChange={(e) => updateMyData(index, id, e.target.value)} />;
    };

    const EditStatusBahan = ({ cell: { value: initialValue }, row: { index }, column: { id }, updateMyData }) => {
        const status = [{ name: "HALAL", value: "1" }, { name: "MERAGUKAN", value: "2" }, { name: "HARAM", value: "3" }]
        return (
            <>
                <CInputGroup className="mb-3 typeahead">
                    <Typeahead
                        id="basic-typeahead-status"
                        inputProps={{ required: true, style: { fontWeight: "bolder" } }}
                        labelKey="name"
                        onChange={(e) => updateMyData(index, id, e.length > 0 && e[0].value)}
                        multiple={false}
                        options={status}
                        defaultInputValue={initialValue === 1 ? 'HALAL' : initialValue === 2 ? 'MERAGUKAN' : initialValue === 3 ? 'HARAM' : ''}
                        placeholder="Pilih Status"
                        paginationText="Muat lebih banyak..."
                        positionFixed 
                    />
                </CInputGroup>
            </>
        );
    };

    const EditKeteranganBahan = ({ cell: { value: initialValue }, row: { index }, column: { id }, updateMyData }) => {
        return <textarea class="form-control" style={{ fontWeight: "bold" }} row="2" value={initialValue} onChange={(e) => updateMyData(index, id, e.target.value)} />;
    };


    const [detailBahan, setDetailBahan] = useState(false)
    const [currentProduk, setCurrentProduk] = useState(0)
    const DetailData = ({ row: { index } }) => {
        const onChange = e => {
            setDetailBahan(true)
            setCurrentProduk(index);
        };

        return (
            <>
                <button class="btn btn-primary" onClick={onChange}>Detail</button>
            </>
        );
    };

    const columns = React.useMemo(
        () => [
            { Header: "DETAIL", Cell: DetailData },
            { Header: "BAHAN BAKU", accessor: "bahan_baku" },
            { Header: "PEMASOK", accessor: "pemasok" },
            { Header: 'KODE SERTIFIKAT', accessor: 'sertifikat_halal', Cell: EditableCell },
            { Header: 'STATUS', accessor: 'data_status', Cell: EditStatusBahan },
            { Header: 'KETERANGAN', accessor: 'keterangan', Cell: EditKeteranganBahan },
        ],
        []
    );

    const updateMyData = (rowIndex, columnId, value) => {
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value
                    };
                }
                return row;
            })
        );
    };

    let cekValidation = []
    var setDataValidation = []

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        setDataValidation.push([element.data_status, element.bahan_baku]);
    }

    for (var i = 0; i < setDataValidation.length; i++) {
        cekValidation.push.apply(cekValidation, setDataValidation[i]);
    }

    const [getAlert, setAlert] = useState(null)
    const hendlePostDatabase = () => {
        var initData = { data: data }
        if (cekValidation.includes(0) || cekValidation.includes(false)) {
            setAlert(
                <CAlert color="danger">
                    <svg fill="currentColor" className="mr-2" width="24" height="24" viewBox="0 0 24 24"><path d="M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z" /></svg>
                    Pastikan semua bahan baku yang anda verifikasi telah memiliki status <b>HALAL</b>, <b>MERAGUKAN</b>, <b>HARAM</b>
                </CAlert>
            );
        } else {
            setAlert(
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Ya"
                    cencelBtnText="Batal"
                    confirmBtnBsStyle="success"
                    cencelBtnBsStyle="danger"
                    title="Apakah anda yakin?"
                    onConfirm={() => {
                        API.pemeriksaanProdukByPenyelia(initData).then(res => {
                            setAlert(
                                <SweetAlert
                                    success
                                    confirmBtnText="OK"
                                    confirmBtnBsStyle="success"
                                    title="Status produk telah di ubah!"
                                    onConfirm={() => {
                                        setAlert(null)
                                        API.getbillOfMaterials(param_id).then(res => {
                                            setData(res.data)
                                        });
                                    }}
                                >
                                </SweetAlert>
                            )
                        })
                    }}
                    onCancel={() => setAlert(null)}
                >
                    Produk yang anda periksa telah sesuai dengan setandarisasi HALAL?
                </SweetAlert>
            )
        }
    }

    // ======== UNTUK KUNJUNGAN ========= //

    const [btnKunjungan, setButtonKunjungan] = useState(null)
    useEffect(() => {
        API.CekStatusKunjungan(param_id).then(res => {
            if (res.data.length > 0) {
                setButtonKunjungan(res.data[0].IS_KUNJUNGAN)
                if (res.data[0].IS_KUNJUNGAN === 0) {
                    setAlert(
                        <SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Kunjungan"
                            cencelBtnText="Batal"
                            confirmBtnBsStyle="success"
                            cencelBtnBsStyle="danger"
                            title="Apakah anda melakukan kunjungan?"
                            onConfirm={() => {
                                setAlert(null)
                            }}
                            onCancel={() => window.history.back()}
                        >
                            Produk ini dalam status akan di kunjungi {res.data[0].REMINDER} Hari
                        </SweetAlert>
                    )
                }
                if (res.data[0].STATUS === 'HALAL') {
                    setAlert(
                        <SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Ya"
                            cencelBtnText="Batal"
                            confirmBtnBsStyle="success"
                            cencelBtnBsStyle="danger"
                            title="Apakah anda yakin?"
                            onConfirm={() => {
                                setAlert(null)
                            }}
                            onCancel={() => window.history.back()}
                        >
                            Ingin merubah produk yang telah <b>HALAL</b>?
                        </SweetAlert>
                    )
                }
            }
        })
    }, [param_id])

    const hendlePostDatabaseKunjungan = () => {
        var initData = { id_pelaku_usaha: user_id, data: data }
        if (cekValidation.includes(0) || cekValidation.includes(false)) {
            setAlert(
                <CAlert color="danger">
                    <svg fill="currentColor" className="mr-2" width="24" height="24" viewBox="0 0 24 24"><path d="M2.2,16.06L3.88,12L2.2,7.94L6.26,6.26L7.94,2.2L12,3.88L16.06,2.2L17.74,6.26L21.8,7.94L20.12,12L21.8,16.06L17.74,17.74L16.06,21.8L12,20.12L7.94,21.8L6.26,17.74L2.2,16.06M13,17V15H11V17H13M13,13V7H11V13H13Z" /></svg>
                    Pastikan semua bahan baku yang anda verifikasi telah memiliki status <b>HALAL</b>, <b>MERAGUKAN</b>, <b>HARAM</b>
                </CAlert>
            );
        } else {
            setAlert(
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Ya"
                    cencelBtnText="Batal"
                    confirmBtnBsStyle="success"
                    cencelBtnBsStyle="danger"
                    title="Apakah anda yakin?"
                    onConfirm={() => {
                        API.pemeriksaanProdukKunjungan(initData).then(res => {
                            setAlert(
                                <SweetAlert
                                    success
                                    confirmBtnText="OK"
                                    confirmBtnBsStyle="success"
                                    title="Status produk telah di ubah!"
                                    onConfirm={() => {
                                        setAlert(null)
                                        API.getbillOfMaterials(param_id).then(res => {
                                            setData(res.data)
                                        });
                                    }}
                                >
                                </SweetAlert>
                            )
                        })
                    }}
                    onCancel={() => setAlert(null)}
                >
                    Produk yang anda periksa telah sesuai dengan setandarisasi HALAL?
                </SweetAlert>
            )
        }
    }

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>VERIFIKASI PRODUK</strong>
                            <div className="card-header-actions">
                                <Link to={`/master-umkm/produk/user?_key=${window.btoa(getUmkm.NAMA_PERUSAHAAN)}&_id=${window.btoa(queryUser !== null ? window.atob(queryUser) : param_id)}`}>
                                    <CButton color="primary" size="sm" className="btn-brand mr-1 mb-1">
                                        <strong>SEMUA PRODUK</strong>
                                    </CButton>
                                </Link>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <div className="notifikasi table-responsive">
                                <table className="table" style={{ border: "none" }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "20%", border: "none", borderBottom: "1px solid #d8dbe0" }}>Nama Perusahaan</td>
                                            <td style={{ width: "1%", border: "none", borderBottom: "1px solid #d8dbe0" }}>:</td>
                                            <td style={{ width: "94%", border: "none", borderBottom: "1px solid #d8dbe0" }}><label id="lbl_nama_perusahaan">{getUmkm.NAMA_PERUSAHAAN}</label></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: "20%", border: "none", borderBottom: "1px solid #d8dbe0" }}>Produk</td>
                                            <td style={{ width: "1%", border: "none", borderBottom: "1px solid #d8dbe0" }}>:</td>
                                            <td style={{ width: "50%", border: "none", borderBottom: "1px solid #d8dbe0" }}><label id="lbl_produk">{param_name}</label></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <strong>{data.length} BAHAN BAKU</strong>
                            <br />
                            <br />
                            <CModal show={detailBahan} onClose={() => setDetailBahan(!detailBahan)} size="lg">
                                <CModalHeader closeButton>
                                    <CModalTitle>Detail Produk</CModalTitle>
                                </CModalHeader>
                                <CModalBody>
                                    <DetailProduk currentProduk={data[currentProduk]} />
                                </CModalBody>
                            </CModal>

                            <DataTable
                                columns={columns}
                                data={data}
                                updateMyData={updateMyData}
                                tableClass="table table-striped table-bordered table-hover table-responsive"
                            />
                            {/* data: <br />
                            <pre>{JSON.stringify(data, null, 2)}</pre> */}

                            <br />
                            <hr />
                            <strong><h4 style={{ fontWeight: "900" }}><center>{steps.length} TAHAPAN PROSES</center></h4></strong>
                            <hr />
                            <br />
                            <TableStep dataStep={steps} />
                            <br />
                            {getAlert}
                        </CCardBody>
                        <CCardFooter>
                            {btnKunjungan === 0 ? (
                                <CButton className="card-header-actions" onClick={hendlePostDatabaseKunjungan} type="submit" value="Submit" color="success">
                                    Simpan Perubahan Kunjungan
                                </CButton>
                            ) : (
                                <CButton className="card-header-actions" onClick={hendlePostDatabase} type="submit" value="Submit" color="success">
                                    Simpan Perubahan
                                </CButton>
                            )}
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
}

export default PemeriksaanProduk;
