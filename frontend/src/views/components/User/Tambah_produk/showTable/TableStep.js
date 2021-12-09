import React from 'react'
import {
    CButton,
    CDataTable
} from '@coreui/react'

// Header Table Step Pembuatan
const fieldsStep = [
    {
        key: 'edit',
        label: '',
        _style: { width: '8%' },
        sorter: false,
        filter: false
    },
    { key: 'step_ke', label: 'STEP KE' },
    { key: 'step_keterangan', label: 'KETERANGAN' },
    {
        key: 'hapus',
        label: '',
        _style: { width: '8%' },
        sorter: false,
        filter: false
    }
];


function TableStep(props) {
    return (
        <>
            <CDataTable
                items={props.steps}
                fields={fieldsStep}
                hover
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
                                            props.editRowStep(item)
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
                                        size="sm" onClick={() => props.deleteStepPembuatan(item.id_in_step)}
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

export default TableStep