import React, { useState, useContext } from 'react'
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CInput,
	CLabel
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../../service/api'
import { AuthContext } from "../../../../../service/auth/UserProvider"
import SweetAlert from "react-bootstrap-sweetalert"

const FormStep = props => {
	const querySearch = new URLSearchParams(window.location.search).get('_id');
	const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';

	const { state } = useContext(AuthContext);

	var penanggung_jwb = '';
	if (state.isAuthenticated === true) {
		penanggung_jwb = state.user.nama_penanggung_jawab
	}

	const initialFormState = {
		step_ke: '',
		keterangan: '',
	}
	const [stepPembuatan, setStepPembuatan] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setStepPembuatan({
			...stepPembuatan,
			in_kode_barang: param_id,
			otorisator: penanggung_jwb,
			// step_ke: '' ,
			// keterangan: '' ,
			[name]: value
		})
	}

	const [loading, setLoading] = useState(false)
	const [alertEdits, setAlertEdit] = useState(null)
	const onHendleSubmit = (event) => {
		event.preventDefault()
		setLoading(true)
		setStepPembuatan(initialFormState)
		API.insertStepProduksi(stepPembuatan).then(res => {
			setLoading(false)
			toast(`😊 ${res.message}`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				type: "success"
			});
			setAlertEdit(
				<SweetAlert
					success
					confirmBtnText="OK"
					confirmBtnBsStyle="success"
					title="Tahapan peroses berhasil ditambahkan"
					onConfirm={() => {
						setAlertEdit(null)
						props.refreshStep(true)
						// window.location.reload()
					}}
				>
				</SweetAlert>
			)
			// window.location.reload()
		})
	}
	return (
		<>
			{alertEdits}
			<ToastContainer />
			<CForm
				onSubmit={onHendleSubmit}
				action="" method="post" encType="multipart/form-data" className="form-horizontal">

				<CFormGroup row>
					<CCol md="3">
						<CLabel htmlFor="bahan-baku">Langkah Ke</CLabel>
					</CCol>
					<CCol xs="12" md="9">
						<CInput value={stepPembuatan.step_ke} onChange={handleInputChange} required placeholder="Bahan baku....." name="step_ke" type="number" />
					</CCol>
				</CFormGroup>

				<CFormGroup row>
					<CCol md="3">
						<CLabel htmlFor="keterangan">Step Pembuatan</CLabel>
					</CCol>
					<CCol xs="12" md="9">
						<textarea className="form-control" value={stepPembuatan.keterangan} onChange={handleInputChange} rows="3" required placeholder="keterangan" name="keterangan" />
					</CCol>
				</CFormGroup>
				{loading ? (
					<span className="card-header-action" style={{ float: "right" }}>
						<button className="btn btn-success" type="button" disabled>
							<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
							Loading...
						</button>
					</span>
				) : (
					<CButton className="card-header-actions" type="submit" value="Submit" color="success">
						<svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
						Tambah Step Pembuatan
					</CButton>
				)}
			</CForm>
		</>
	)
}

export default FormStep