import React, { useContext, useState, useEffect } from 'react'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
} from '@coreui/react'
import API from '../../../../service/api'
import { AuthContext } from "../../../../service/auth/UserProvider"


import jsPDF from 'jspdf'
import 'jspdf-autotable'

// import domtoimage from "dom-to-image"
// import { saveAs } from "file-saver"
// import Dokumen from '../dokumen/index'

const CetakDokumen = () => {
    const { state } = useContext(AuthContext);
    var id_user = '';
    var penanggung_jwb = '';
    var nama_perusahaan = '';
    var alamat = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
        penanggung_jwb = state.user.nama_penanggung_jawab
        nama_perusahaan = state.user.NAMA_PERUSAHAAN
        alamat = state.user.alamat
    }

    const [namaProduk, setNamaProduk] = useState([])
    const [getbillOfMaterials, setBillOfMaterials] = useState([])
    const [getStepByUser, setStepByUser] = useState([])

    useEffect(() => {
        API.getProduk(id_user).then(res => {
            setNamaProduk(res.data);
        });
        API.getBOMByUserId(id_user).then(res => {
            setBillOfMaterials(res.data);
        });
        API.getBstepProduksiByUserId(id_user).then(res => {
            setStepByUser(res.data);
        })
    }, [id_user])

    const fields = [
        { key: 'KODE_BARANG', label: 'KODE PRODUK', _style: { width: '10%', textAlign: 'center' } },
        { key: 'CONTENT', label: 'NAMA PRODUK', _style: { width: '30%', textAlign: 'center' } },
        { key: 'STATUS', _style: { width: '15%', textAlign: 'center' } },
        {
            key: 'print_dokumen',
            label: 'Dokumen',
            _style: { width: '1%', textAlign: 'center' },
            sorter: false,
            filter: false
        },
        // {
        //     key: 'print_sertifikat',
        //     label: 'Sertifikat',
        //     _style: { width: '1%', textAlign: 'center' },
        //     sorter: false,
        //     filter: false
        // }
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

    const [dataBill, setBillPrint] = useState([])
    const [printStep, setStepPrint] = useState([])
    const [loadingDokumen, seLoadingDokumen] = useState(false)
    function datdiPrint(bill) {
        seLoadingDokumen(true)
        setTimeout(() => {
            const doc = new jsPDF('landscape')
            function headerTable() {
                doc.autoTable({
                    html: '#headerTable',
                    theme: 'plain',
                    didParseCell: function (data) {
                        var rows = data.table.body;
                        if (data.row.index === rows.length - 1) {
                            data.cell.styles.fontStyle = 'normal';
                            data.cell.styles.fontStyle = 'italic';
                        }
                    },
                    styles: {
                        overflow: 'linebreak',
                        fontSize: 8,
                        valign: 'middle',
                    },
                    columnStyles: {
                        0: {
                            fontStyle: 'bold',
                            fontSize: 9,
                            halign: 'center',
                        }
                    }
                });
                doc.autoTable({
                    html: '#description',
                    theme: 'plain',
                    styles: {
                        overflow: 'linebreak',
                        fontSize: 8,
                        valign: 'middle',
                    },
                    columnStyles: {
                        0: {
                            columnWidth: 50,
                            fontStyle: 'bold',
                            fontSize: 9,
                            halign: 'left',
                        },
                        1: {
                            columnWidth: 8,
                            fontSize: 9,
                            halign: 'center',
                        }
                    }
                });
            }

            headerTable()
            doc.autoTable({
                html: '#cetakBillOfMaterial',
                // pageBreak: 'avoid',
                theme: 'grid',
                tableLineColor: [189, 195, 199],
                headerStyles: {
                    //columnWidth: 'wrap',
                    cellPadding: 2,
                    lineWidth: 0.2,
                    valign: 'middle',
                    fontStyle: 'bold',
                    halign: 'center',    //'center' or 'right'
                    fillColor: [33, 150, 243],
                    //textColor: [78, 53, 73], //Black     
                    textColor: [255, 255, 255], //White     
                    fontSize: 8,
                    lineColor: [216, 219, 224]
                },
                styles: {
                    overflow: 'linebreak',
                    fontSize: 8,
                    valign: 'middle',
                },
            });
            doc.addPage();
            headerTable()
            doc.autoTable({
                html: '#StepProduksi',
                // pageBreak: 'avoid',
                theme: 'grid',
                tableLineColor: [189, 195, 199],
                headerStyles: {
                    //columnWidth: 'wrap',
                    cellPadding: 2,
                    lineWidth: 0.2,
                    valign: 'middle',
                    fontStyle: 'bold',
                    halign: 'center',    //'center' or 'right'
                    fillColor: [33, 150, 243],
                    //textColor: [78, 53, 73], //Black     
                    textColor: [255, 255, 255], //White     
                    fontSize: 8,
                    lineColor: [216, 219, 224]
                },
                styles: {
                    overflow: 'linebreak',
                    fontSize: 8,
                    valign: 'middle',
                },
                columnStyles: {
                    0: {
                        columnWidth: 20,
                        fontStyle: 'bold',
                        fontSize: 9,
                        halign: 'center',
                    },
                    1: {
                        fontStyle: 'bold',
                        fontSize: 9,
                    }
                }
            });
            doc.save(`HC-UM-${bill[0].kontent}-${Date.now()}.pdf`)
            seLoadingDokumen(false)
        }, 1500);
    }

    // FOTO SERTIFIKAT

    // const sertif = [
    //     { kontent: '' }
    // ]
    // const [sertifProduk, setSertfiProduk] = useState(sertif)
    // const [loadingSertif, setLoadSertfif] = useState(false)
    // const canvasRef = React.useRef(null);
    // const printDomToImage = () => {
    //     // const dokumen = renderToString(<Dokumen namaProduk={sertifProduk[0].kontent} penanggung_jwb={penanggung_jwb} />);
    //     var dokumen = document.getElementById("sertifikat");
    //     if (canvasRef.current) {
    //         domtoimage
    //             .toPng(dokumen)
    //             .then(function (dataUrl) {
    //                 var img = new Image();
    //                 img.src = dataUrl;
    //                 saveAs(dataUrl, `sertifikat-${Date.now()}`);
    //                 setLoadSertfif(false)
    //             })
    //             .catch(function (error) {
    //                 console.error("oops, something went wrong!", error);
    //             });
    //     }
    // };
    // console.warn("loading", loadingSertif);

    // const download = () => {
    //     setLoadSertfif(true)
    //     if (canvasRef.current) {
    //         printDomToImage(canvasRef.current);
    //     }
    // };

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>DAFTAR PRODUK</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable bordered borderColor="primary"
                                items={namaProduk}
                                fields={fields}
                                tableFilter
                                striped
                                border={true}
                                hover
                                sorter
                                scopedSlots={{
                                    'STATUS':
                                        (item) => (
                                            <td style={{ textAlign: 'center' }}>
                                                <CBadge color={getBadge(item.STATUS)}>
                                                    {item.STATUS}
                                                </CBadge>
                                            </td>
                                        ),
                                    'print_dokumen':
                                        (item, index) => {
                                            if (item.STATUS !== 'HALAL') {
                                                return (
                                                    <td className="py-2" style={{ textAlign: 'center' }}>
                                                        <button className="btn btn-secondary" size="sm" type="button" disabled>
                                                            <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" /></svg>
                                                        </button>
                                                    </td>
                                                )
                                            } else {
                                                var filterBom = getbillOfMaterials.filter(d => d.in_kode_barang === item.KODE_BARANG);
                                                var filterStep = getStepByUser.filter(d => d.in_kode_barang === item.KODE_BARANG);
                                                return (<td className="py-2" style={{ textAlign: 'center' }}>
                                                    {loadingDokumen ? (
                                                        <button className="btn btn-secondary" size="sm" type="button" disabled>
                                                            Loading...
                                                        </button>
                                                    ) : (
                                                        <CButton
                                                            color="info"
                                                            size="sm"
                                                            title="Print Dokumen"
                                                            onClick={() => {
                                                                datdiPrint(filterBom)
                                                                setBillPrint(filterBom)
                                                                setStepPrint(filterStep)
                                                            }}
                                                        >
                                                            <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" /></svg>
                                                        </CButton>
                                                    )}
                                                </td>)
                                            }
                                        },
                                    // 'print_sertifikat':
                                    //     (item, index) => {
                                    //         if (item.STATUS !== 'HALAL') {
                                    //             return (
                                    //                 <td className="py-2" style={{ textAlign: 'center' }}>
                                    //                     <button className="btn btn-secondary" size="sm" type="button" disabled>
                                    //                         <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" /></svg>
                                    //                     </button>
                                    //                 </td>
                                    //             )
                                    //         } else {
                                    //             var filterBom = getbillOfMaterials.filter(d => d.in_kode_barang === item.KODE_BARANG);
                                    //             return (<td className="py-2" style={{ textAlign: 'center' }}>
                                    //                 <CButton
                                    //                     color="success"
                                    //                     size="sm"
                                    //                     title="Print Dokumen"
                                    //                     onClick={() => {
                                    //                         setSertfiProduk(filterBom);
                                    //                         download()
                                    //                     }}
                                    //                     data-html2canvas-ignore={true}
                                    //                 >
                                    //                     <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z" /></svg>
                                    //                 </CButton>
                                    //             </td>)
                                    //         }
                                    //     }
                                }}
                            />

                            {dataBill.length > 0 && printStep.length > 0 ? (
                                <>
                                    <div className="komponen_print" style={{ display: "none" }} >
                                        <CCardBody>
                                            <table id="headerTable" className="table">
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="3" style={{ textAlign: "center" }}>
                                                            <strong>SISTEM PENJAMIN MUTU HALAL INTERNAL</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{ textAlign: "center" }}>
                                                            <strong>BAHRUL MAGHFIROH</strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3" style={{ textAlign: "center" }}>
                                                            <em>Email : abcd@gmail.com Telp : 0341-9045678 Kantor : Jl. Gotong Royong 2 Malang</em>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table id="description" className="table">
                                                <tbody>
                                                    <tr>
                                                        <td>Nama Perusahaan</td>
                                                        <td>:</td>
                                                        <td><label id="lbl_nama_perusahaan">{nama_perusahaan}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Alamat</td>
                                                        <td>:</td>
                                                        <td><label id="lb_alamat">{alamat}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Penanggung Jawab</td>
                                                        <td>:</td>
                                                        <td><label id="lbl_penanggungjawab">{penanggung_jwb}</label></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nama Produk</td>
                                                        <td>:</td>
                                                        <td><label id="lbl_produk">{dataBill[0].kontent}</label></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                        <CCardBody>
                                            <table id="cetakBillOfMaterial" cellSpacing="0" width="100%">
                                                <thead style={{ textAlign: "center" }}>
                                                    <tr>
                                                        <td colSpan="9"><strong>BILL OF MATERIALS</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <th rowSpan="2" align="center">BAHAN BAKU</th>
                                                        <th rowSpan="2" align="center">MERK</th>
                                                        <th rowSpan="2" align="center">PRODUSEN</th>
                                                        <th rowSpan="2" align="center">PEMASOK</th>
                                                        <th rowSpan="2" align="center">ALAMAT PEMASOK</th>
                                                        <th rowSpan="2" align="center">LEMBAGA PENERBIT</th>
                                                        <th colSpan="2" align="center">SERTFIKAT HALAL</th>
                                                        <th rowSpan="2" align="center">STATUS</th>
                                                    </tr>
                                                    <tr>
                                                        <th>KODE SERTIFIKAT</th>
                                                        <th>TANGGAL EXPIRED</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataBill.map(d => (
                                                        <tr key={d.id_bahan_baku}>
                                                            <td>{d.bahan_baku}</td>
                                                            <td>{d.merk}</td>
                                                            <td>{d.produsen}</td>
                                                            <td>{d.pemasok}</td>
                                                            <td>{d.alamat_pemasok}</td>
                                                            <td>{d.lembaga_penerbit}</td>
                                                            <td>{d.sertifikat_halal}</td>
                                                            <td>{d.expired_date_sertifikat}</td>
                                                            <td>
                                                                <CBadge color={getBadge(d.STATUS)}>
                                                                    {d.STATUS}
                                                                </CBadge>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {/* STEP PRODUKSI */}
                                            <table id="StepProduksi" className="b" cellSpacing="0" width="100%">
                                                <thead style={{ textAlign: "center" }}>
                                                    <tr>
                                                        <td colSpan="2"><strong>TAHAPAN PEROSES</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <th>TAHAP KE</th>
                                                        <th>KETERANGAN</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {printStep.map(d => (
                                                        <tr key={d.step_ke + d.step_keterangan}>
                                                            <td>{d.step_ke}</td>
                                                            <td>{d.step_keterangan}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CCardBody>
                                    </div>
                                </>
                            ) : null}

                            {/* <div id="sertifikat" ref={canvasRef}>
                                <Dokumen namaProduk={sertifProduk[0].kontent} penanggung_jwb={penanggung_jwb} />
                            </div> */}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default CetakDokumen