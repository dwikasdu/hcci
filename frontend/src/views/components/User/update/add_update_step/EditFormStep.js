import React, { useState, useEffect } from 'react'
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CInput,
	CLabel
} from '@coreui/react'
import './EditFormStep.css'
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../../service/api'
import CIcon from '@coreui/icons-react'
import SweetAlert from "react-bootstrap-sweetalert"

const EditFormStep = props => {
	// console.log(props);
	const [stepPembuatan, setStepPembuatan] = useState(props.tepCurrents)
	const [alertEdits, setAlertEdit] = useState(null)

	useEffect(
		() => {
			setStepPembuatan(props.tepCurrents)
		},
		[props]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setStepPembuatan({ ...stepPembuatan, [name]: value })
	}

	const onHendleSubmit = (event) => {
		event.preventDefault()
		props.setShowEditStep(!props.showEditStpes)
		API.updateStepProduksi(stepPembuatan).then(res => {
			props.refreshStep(true)
		})
	}

	const deleteStepById = () => {
		if (props.jumlahStep !== 1) {
			setAlertEdit(
				<SweetAlert
					warning
					showCancel
					confirmBtnText="Ya"
					cencelBtnText="Batal"
					confirmBtnBsStyle="danger"
					cencelBtnBsStyle="info"
					title="Apakah anda yakin?"
					onConfirm={() => {
						API.deleteStepProduksi(stepPembuatan.id_in_step).then(res => {
							props.refreshStep(true)
						})
						setAlertEdit(null)
					}}
					onCancel={() => setAlertEdit(null)}
				>
					Ingin menghapus Step peroses ini?
				</SweetAlert>
			)
		} else {
			setAlertEdit(
				<SweetAlert
					warning
					confirmBtnText="OK"
					confirmBtnBsStyle="danger"
					title="Tdiak Bisa Hapus Semua!"
					onConfirm={() => {
						setAlertEdit(null)
					}}
				>
					Silahkan tambah satu step lagi untuk menghapus step ini!
				</SweetAlert>
			)
		}
	}
	return (
		<>
			{alertEdits}
			<CForm
				onSubmit={onHendleSubmit}
				action="" method="post" encType="multipart/form-data" className="form-horizontal">

				<CFormGroup row>
					<CCol md="3">
						<CLabel htmlFor="bahan-baku">Langkah Ke</CLabel>
					</CCol>
					<CCol xs="12" md="9">
						<CInput value={stepPembuatan.step_ke} onChange={handleInputChange} required placeholder="Bahan baku....." name="step_ke" type="number" id="bahan-baku" />
					</CCol>
				</CFormGroup>

				<CFormGroup row>
					<CCol md="3">
						<CLabel htmlFor="keterangan">Step Pembuatan</CLabel>
					</CCol>
					<CCol xs="12" md="9">
						<textarea className="form-control" value={stepPembuatan.step_keterangan} onChange={handleInputChange} rows="3" required placeholder="keterangan" name="step_keterangan" />
					</CCol>
				</CFormGroup>
				<CFormGroup row>
					<CCol>
						<div className="card-header-actions">
							<CButton className="m-2" type="submit" value="Submit" size="sm" color="success">
								<CIcon name="cil-save" className="mfe-2" /> <span>Perbarui</span>
							</CButton>
							<CButton className="m-2" onClick={() => props.setShowEditStep(!props.showEditStpes)} size="sm" color="secondary">
								Cancel
							</CButton>
							<CButton className="m-2" onClick={deleteStepById} size="sm" color="danger">
								<CIcon name="cil-trash" className="mfe-2" /> <span>Hapus</span>
							</CButton>
						</div>
					</CCol>
				</CFormGroup>

			</CForm>
		</>
	)
}

export default EditFormStep