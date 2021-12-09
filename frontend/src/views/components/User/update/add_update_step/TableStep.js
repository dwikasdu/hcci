import React from 'react'
import {
    CButton,
    CDataTable
} from '@coreui/react'

const fieldsStep = [
    {
        key: 'edit',
        label: '',
        _style: { width: '8%' },
        sorter: false,
        filter: false
    },
    { key: 'step_ke', label: 'STEP KE' },
    { key: 'step_keterangan', label: 'KETERANGAN' }
];

function TableStep(props) {
    return (
        <>
            <strong>{props.dataStep.length} Tahapan Peroses</strong>
            <br />
            <CDataTable
                items={props.dataStep}
                fields={fieldsStep}
                hover
                noItemsViewSlot={<p>no filtering results available custom</p>}
                noItemsView={{ noResults: "no filtering results available custom", noItems: "no items available custom" }}
                sorter
                border={true}
                scopedSlots={{
                    'edit':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <CButton
                                        color="primary"
                                        variant="outline"
                                        className="m-2 rounded-pill"
                                        size="sm"
                                        onClick={() => {
                                            props.editRowStep(item)
                                        }}
                                    >
                                        Edit
                                    </CButton>
                                </td>
                            )
                        }
                }}
            />
        </>
    )
}

export default TableStep
