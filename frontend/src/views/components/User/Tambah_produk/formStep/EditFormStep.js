import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel
} from '@coreui/react'
import './EditFormStep.css'

const EditFormStep = props => {
	// console.log(props);
  const [ stepPembuatan, setStepPembuatan ] = useState(props.tepCurrents)

  useEffect(
    () => {
      setStepPembuatan(props.tepCurrents)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target
    setStepPembuatan({ ...stepPembuatan, [name]: value })
  }
  return (
    <CForm
			onSubmit={event => {
                event.preventDefault()

                props.updateStepPembuatan(stepPembuatan.id_in_step, stepPembuatan)
              }}
				action="" method="post" encType="multipart/form-data" className="form-horizontal">

				<CFormGroup row>
					<CCol md="3">
						<CLabel htmlFor="step_ke">Langkah Ke</CLabel>
					</CCol>
					<CCol xs="12" md="9">
						<CInput value={stepPembuatan.step_ke} onChange={handleInputChange} required placeholder="Langkah Ke....." name="step_ke" type="number" id="step_ke" />
					</CCol>
				</CFormGroup>

				<CFormGroup row>
					<CCol md="3">
						<CLabel htmlFor="step_keterangan">keterangan</CLabel>
					</CCol>
					<CCol xs="12" md="9">
						<CTextarea value={stepPembuatan.step_keterangan} onChange={handleInputChange} required placeholder="keterangan" name="step_keterangan" type="text" id="step_keterangan" />
					</CCol>
				</CFormGroup>
				<CFormGroup row>
					<CCol>
					<div className="card-header-actions">
						<CButton className="m-2" type="submit" value="Submit" size="sm" color="success">
						Update
						</CButton>
						<CButton className="m-2" onClick={() => props.setEditStep(false)} size="sm" color="secondary">
						Cancel
						</CButton>
					</div>
					</CCol>
				</CFormGroup>

			</CForm>
  )
}

export default EditFormStep