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
            {/* <CDataTable
                items={props.dataStep}
                fields={fieldsStep}
                hover
                sorter
                border={true}
            /> */}


            {props.dataStep.map((data, index) => {
                return (
                    <div className='contain' style={{display: "block", textAlign: "center"}}>
                    <span style={{backgroundColor: "#eee", border: "1px solid #000", padding: "10px", color: "#000", margin: "10px 0", borderRadius:"10px"}}>{data.step_keterangan}</span>

                    <br/>
                    <br/>
                    <svg style={{width:"100%", margin:"0 auto"}} style={{stroke:"black"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg>
                    <br/>
                    <br/>
                    {index === (props.dataStep.length - 1) && (
                     <span style={{backgroundColor: "green", padding: "10px", color: "#fff", margin: "10px 0", borderRadius:"10px"}}>Selesai</span>
                       
                    )}
                    </div>
                )
            })}
        </>
    )
}

export default TableStep
