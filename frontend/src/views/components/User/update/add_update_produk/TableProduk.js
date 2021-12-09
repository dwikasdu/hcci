import React, { useState } from 'react'
import {
    CButton,
    CDataTable,
    CBadge,
} from '@coreui/react'
import SweetAlert from "react-bootstrap-sweetalert"

const getBadge = status => {
    switch (status) {
        case 'SEDANG DIPROSES': return 'secondary'
        case 'SEDANG PROSES': return 'secondary'
        case 'HALAL': return 'success'
        case 'HARAM': return 'danger'
        case 'RAGU-RAGU': return 'warning'
        default: return 'primary'
    }
}

// Header Table Bahan Baku
const fields = [
    {
        key: 'edit',
        label: '',
        _style: { width: '8%' },
        sorter: false,
        filter: false
    },
    { key: 'bahan_baku', label: 'Bahan Baku' },
    { key: 'merk', label: 'Merek' },
    { key: 'produsen', label: 'Produsen' },
    { key: 'lembaga_penerbit', label: 'Lembaga Penerbit' },
    { key: 'sertifikat_halal', label: 'Nomor' },
    { key: 'expired_date_sertifikat', label: 'Tanggal Expired' },
    { key: 'pemasok', label: 'Pemasok' },
    { key: 'alamat_pemasok', label: 'Alamat Pemasok' },
    { key: 'STATUS', label: 'STATUS' },
];
function TableProduk(props) {
    const [alertEdits, setAlertEdit] = useState(null)

    return (
        <>
            {alertEdits}
            <strong>{props.dataProduk.length} Produk</strong>
            <br />
            <CDataTable
                items={props.dataProduk}
                fields={fields}
                hover
                noItemsViewSlot={<p>no filtering results available custom</p>}
                noItemsView={{ noResults: "no filtering results available custom", noItems: "no items available custom" }}
                sorter
                border={true}
                scopedSlots={{
                    'STATUS':
                        (item) => (
                            <td>
                                <CBadge color={getBadge(item.STATUS)}>
                                    {item.STATUS}
                                </CBadge>
                            </td>
                        ),
                    'edit':
                        (item, index) => {
                            if (item.STATUS === 'HALAL') {
                                return (
                                    <td className="py-2">
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setAlertEdit(
                                                    <SweetAlert
                                                        warning
                                                        showCancel
                                                        confirmBtnText="Ya"
                                                        cencelBtnText="Batal"
                                                        confirmBtnBsStyle="danger"
                                                        cencelBtnBsStyle="info"
                                                        title={`Apakah anda yakin ingin merubah bahan ${item.bahan_baku}?`}
                                                        onConfirm={() => {
                                                            props.editProduk(item)
                                                            setAlertEdit(null)
                                                        }}
                                                        onCancel={() => setAlertEdit(null)}
                                                    >
                                                        Status dari "HALAL" akan berubah menjadi "DALAM PEROSES" dan akan di tinjau kembali!
                                                    </SweetAlert>
                                                )
                                            }}
                                        >
                                            Edit
                                        </CButton>
                                    </td>
                                )
                            } else {
                                return (
                                    <td className="py-2">
                                        <CButton
                                            color="primary"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                props.editProduk(item)
                                            }}
                                        >
                                            Edit
                                        </CButton>
                                    </td>
                                )
                            }
                        },
                }}
            />
        </>
    )
}

export default TableProduk
