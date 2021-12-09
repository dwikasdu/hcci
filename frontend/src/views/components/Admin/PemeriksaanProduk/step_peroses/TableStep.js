import React from 'react'
import {
    CDataTable
} from '@coreui/react'

const fieldsStep = [
    { key: 'step_ke', _style: { width: '15%' }, label: 'STEP KE' },
    { key: 'step_keterangan', label: 'KETERANGAN' }
];

function TableStep(props) {
    return (
        <>
            <strong>{props.dataStep.length} TAHAPAN PEROSES</strong>
            <br />
            <br />
            <CDataTable
                items={props.dataStep}
                fields={fieldsStep}
                hover
                sorter
                border={true}
            />
        </>
    )
}

export default TableStep
