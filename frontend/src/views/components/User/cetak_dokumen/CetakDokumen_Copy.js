import React, { useContext, useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'
import { AuthContext } from "../../../../service/auth/UserProvider"
import { useHistory } from 'react-router-dom'
import API from '../../../../service/api'


import jsPDF from 'jspdf'
import 'jspdf-autotable'

import domtoimage from "dom-to-image"
import { saveAs } from "file-saver"
import { renderToString } from 'react-dom/server';

import Dokumen from '../dokumen/index'

function CetakDokumen() {
    const history = useHistory()
    const { state } = useContext(AuthContext);
    let roles = []
    state.isAuthenticated ? roles = state.user.roles : roles = []
    if (!roles.includes('user')) history.push('/');

    var id_user = '';
    // var penanggung_jwb = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
        // penanggung_jwb = state.user.nama_penanggung_jawab
    }

    // const [namaProduk, setNamaProduk] = useState([])
    // const [cekPendampingan, setCekPendampingan] = useState([])
    const [getbillOfMaterials, setBillOfMaterials] = useState([])
    // const [getStepByUser, setStepByUser] = useState([])

    useEffect(() => {
        // API.getProduk(id_user).then(res => {
        //     setNamaProduk(res.data);
        // });
        // API.getCekPendampingan(id_user).then(res => {
        //     setCekPendampingan(res.data[0]);
        // });
        API.getBOMByUserId(id_user).then(res => {
            setBillOfMaterials(res.data);
        });
        // API.getBstepProduksiByUserId(id_user).then(res => {
        //     setStepByUser(res.data);
        // })
    }, [id_user])

    // console.log(getbillOfMaterials);

    const onDownload = (chartId) => () => {
        const doc = new jsPDF('p', 'mm', 'a3', 'landscape')
        // doc.setFont("Times New Roman");
        // doc.setFontSize(12);
        // doc.text(20, 30, "Nama Produk:");
        // doc.text(40, 30, "Bakso");
        // doc.setTextColor(0, 0, 0);
        // doc.text(20, 40, "Nama Perusahaan:");
        // doc.text(40, 40, "Rumah makan oyi");
        // doc.setTextColor(0, 0, 0);
        // doc.text(20, 50, "Status:");
        // doc.text(40, 50, "Halal");
        // doc.setTextColor(0, 0, 0);
        // doc.addPage();

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
        doc.autoTable({
            html: '#example',
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
            // columnStyles: {
            //     0: { valign: "top" },
            //     1: {
            //         columnWidth: 20,
            //         fontStyle: 'bold',
            //         fontSize: 9,
            //         halign: 'center',
            //     },
            //     2: {
            //         columnWidth: 20,
            //         fontStyle: 'bold',
            //         fontSize: 9,
            //         halign: 'center',
            //     },
            //     3: {
            //         columnWidth: 20,
            //         fontStyle: 'bold',
            //         fontSize: 9,
            //         halign: 'center',
            //     },
            // }
        });
        doc.addPage();
        doc.autoTable({
            html: '#example2',
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
            // columnStyles: {
            //     0: { valign: "top" },
            //     1: {
            //         columnWidth: 20,
            //         fontStyle: 'bold',
            //         fontSize: 9,
            //         halign: 'center',
            //     },
            //     2: {
            //         columnWidth: 20,
            //         fontStyle: 'bold',
            //         fontSize: 9,
            //         halign: 'center',
            //     },
            //     3: {
            //         columnWidth: 20,
            //         fontStyle: 'bold',
            //         fontSize: 9,
            //         halign: 'center',
            //     },
            // }
        });
        doc.save(`dokumen-${Date.now()}.pdf`)

    }



    const canvasRef = React.useRef(null);
    const printDomToImage = () => {
        var dokumen = document.getElementById("sertifikat");
        if (canvasRef.current) {
            domtoimage
                .toPng(dokumen)
                .then(function (dataUrl) {
                    var img = new Image();
                    img.src = dataUrl;
                    saveAs(dataUrl, `sertifikat-${Date.now()}`);
                })
                .catch(function (error) {
                    console.error("oops, something went wrong!", error);
                });
        }
    };

    const download = () => {
        if (canvasRef.current) {
            printDomToImage(canvasRef.current);
        }
    };

















    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <strong>Cetak Dokumen</strong>
                        </CCardHeader>
                        <CCardBody>
                            Halaman cetak dokumen
                            <button onClick={onDownload('sertifikat')} type="primary">Download PDF</button>
                            <button type="button" onClick={download} data-html2canvas-ignore={true}>
                                DOWNLOAD sertif
                            </button>


                            <div id="table-responsive" className="table-responsive">
                                <table id="headerTable" className="table">
                                    <tbody>
                                        <tr>
                                            <td colspan="3" style={{ textAlign: "center" }}>
                                                <strong>SISTEM PENJAMIN MUTU HALAL INTERNAL</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style={{ textAlign: "center" }}>
                                                <strong>BAHRUL MAGHFIROH</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style={{ textAlign: "center" }}>
                                                <em>Email : abcd@gmail.com Telp : 0341-9045678 Kantor : Jl. Gotong Royong 2 Malang</em>
                                                <hr />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table id="description" className="table">
                                    <tbody>
                                        <tr>
                                            <td>Nama Perusahaan</td>
                                            <td>:</td>
                                            <td><label id="lbl_nama_perusahaan">PT ANGKASA PURA</label></td>
                                        </tr>
                                        <tr>
                                            <td>Alamat</td>
                                            <td>:</td>
                                            <td><label id="lbl_produk">MALANG</label></td>
                                        </tr>
                                        <tr>
                                            <td>Penanggung Jawab</td>
                                            <td>:</td>
                                            <td><label id="lbl_produk">HARTOMY</label></td>
                                        </tr>
                                        <tr>
                                            <td>No. Telepon/Email</td>
                                            <td>:</td>
                                            <td><label id="lbl_produk">0857725238</label></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table id="example" className="b" cellSpacing="0" width="100%">
                                    <thead style={{ textAlign: "center" }}>
                                        <tr>
                                            <td colspan="9"><strong>BILL OF MATERIALS</strong></td>
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
                                        {getbillOfMaterials.map(d => (
                                            <tr key={d.id_bahan_baku}>
                                                <td>{d.bahan_baku}</td>
                                                <td>{d.merk}</td>
                                                <td>{d.produsen}</td>
                                                <td>{d.pemasok}</td>
                                                <td>{d.alamat_pemasok}</td>
                                                <td>{d.lembaga_penerbit}</td>
                                                <td>{d.sertifikat_halal}</td>
                                                <td>{d.expired_date_sertifikat}</td>
                                                <td>{d.STATUS}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <table id="example2" className="b" cellSpacing="0" width="100%">
                                <thead style={{ textAlign: "center" }}>
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
                                    {getbillOfMaterials.map(d => (
                                        <tr key={d.id_bahan_baku}>
                                            <td>{d.bahan_baku}</td>
                                            <td>{d.merk}</td>
                                            <td>{d.produsen}</td>
                                            <td>{d.pemasok}</td>
                                            <td>{d.alamat_pemasok}</td>
                                            <td>{d.lembaga_penerbit}</td>
                                            <td>{d.sertifikat_halal}</td>
                                            <td>{d.expired_date_sertifikat}</td>
                                            <td>{d.STATUS}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div id="sertifikat" ref={canvasRef}>
                                <Dokumen />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default CetakDokumen
