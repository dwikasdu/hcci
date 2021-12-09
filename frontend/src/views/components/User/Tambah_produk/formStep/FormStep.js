import React, { useState } from 'react'
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CInput,
	CLabel,
	CTextarea,
} from '@coreui/react'

const FormStep = props => {
	// console.log(props);
	const initialFormState = {
		id_in_step: null,
		step_ke: '',
		step_keterangan: '',
	}
	const [stepPembuatan, setStepPembuatan] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setStepPembuatan({
			...stepPembuatan,
			otorisator: '',
			id: '',
			kontent: props.namaProduk,
			id_user: '',
			status: '0',
			keterangan: '',
			id_bahan_baku: '',
			bahan_baku: '',
			pemasok: '',
			alamat_pemasok: '',
			keterangan_bom: '',
			status_bahan_baku: '',
			sertifikat_halal: '',
			locked: '',
			step_id: '',
			[name]: value
		})
	}
	return (
		<>
			<CForm
				onSubmit={event => {
					event.preventDefault()
					if (!stepPembuatan.step_ke || !stepPembuatan.step_keterangan) return
					props.addStepPembuatan(stepPembuatan)
					setStepPembuatan(initialFormState)
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
				<CButton className="card-header-actions" type="submit" value="Submit" size="sm" color="success">
					<svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
					Tambah
				</CButton>
			</CForm>
		</>
	)
}

export default FormStep