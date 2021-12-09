import React from 'react'
import {
    CButton,
    CDataTable
} from '@coreui/react'


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
    { key: 'expired_date_sertifikat', label: 'Tanggal Expired' },
    { key: 'pemasok', label: 'Pemasok' },
    { key: 'alamat_pemasok', label: 'Alamat Pemasok' },
    {
        key: 'hapus',
        label: '',
        _style: { width: '8%' },
        sorter: false,
        filter: false
    }
];


function Table(props) {
    return (
        <>
            <CDataTable
                items={props.produks}
                fields={fields}
                hover
                // noItemsViewSlot={<p>no filtering results available custom</p>}
                // noItemsView={{ noResults: "no filtering results available custom", noItems: "no items available custom" }}
                sorter
                pagination
                scopedSlots={{
                    'edit':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            props.editRow(item)
                                        }}
                                    >
                                        Edit
                                    </CButton>
                                </td>
                            )
                        },
                    'hapus':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <CButton
                                        color="danger"
                                        variant="outline"
                                        size="sm" onClick={() => props.deleteProduk(item.id)}
                                    >
                                        Hapus
                                    </CButton>
                                </td>
                            )
                        },
                }}
            />
        </>
    )
}

export default Table