import React, { useState, useContext } from 'react'
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CTextarea,
	CInput,
	CLabel,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../../service/api'
import { AuthContext } from "../../../../../service/auth/UserProvider"
import SweetAlert from "react-bootstrap-sweetalert"

const AddForm = props => {
	const querySearch = new URLSearchParams(window.location.search).get('_id');
	const querynameSearch = new URLSearchParams(window.location.search).get('_key');
	const param_id = querySearch !== null ? parseInt(window.atob(querySearch)) : '';
	const param_name = querynameSearch !== null ? window.atob(querynameSearch) : '';

	const { state } = useContext(AuthContext);

	var ID_users = '';
	var penanggung_jwb = '';
	if (state.isAuthenticated === true) {
		ID_users = state.user.ID_USER;
		penanggung_jwb = state.user.nama_penanggung_jawab
	}

	const initialFormState = {
		bahan_baku: '',
		pemasok: '',
		alamat_pemasok: '',
		sertifikat_halal: '',
		merk: '',
		produsen: '',
		lembaga_penerbit: '',
		expired_date_sertifikat: '',
	}
	const [produk, setProduk] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setProduk({
			...produk,
			in_kode_barang: param_id,
			kontent: param_name,
			id_user: ID_users,
			status: '0',
			keterangan: '',
			otorisator: penanggung_jwb,
			id_bahan_baku: '',
			// bahan_baku: '',
			// pemasok: '',
			// alamat_pemasok: '',
			keterangan_bom: '',
			status_bahan_baku: '0',
			// sertifikat_halal: '',
			locked: '',
			step_id: '',
			step_ke: '',
			step_keterangan: '',
			// merk: '',
			// produsen: '',
			// lembaga_penerbit: '',
			// expired_date_sertifikat: '',
			[name]: value
		})
	}

	const [loadingSubmit, setLoading] = useState(false)
	const [alertEdits, setAlertEdit] = useState(null)
	const onHendleSubmit = (event) => {
		event.preventDefault()
		setLoading(true)

		setProduk(initialFormState);
		API.insertBillOfMaterials(produk).then(res => {
			toast(`Bahan berhasil ditambahkan.`, {
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
						props.refreshProduk(true);
						// window.location.reload()
					}}
				>
				</SweetAlert>
			)
			// window.location.reload()
			setLoading(false)
		})
	}


	return (
		<>
			{alertEdits}
			<ToastContainer />
			<CForm onSubmit={onHendleSubmit} method="post" className="form-horizontal">

				<CFormGroup row className="my-0" style={{ margin: "0 auto" }}>
					<CCol xs="6">
						<div style={{ padding: "5px 10px" }}>

							<CFormGroup row>

								<CLabel htmlFor="bahan-baku"><strong>Nama Bahan Baku</strong></CLabel>
								<CInput value={produk.bahan_baku} onChange={handleInputChange} required placeholder="Bahan baku....." name="bahan_baku" type="text" />

							</CFormGroup>
							{/* tambahan */}
							<CFormGroup row>

								<CLabel htmlFor="merk-input"><strong>Merek Bahan</strong></CLabel>
								<CInput value={produk.merk} onChange={handleInputChange} placeholder="Merek Bahan" name="merk" type="text" />

							</CFormGroup>

							<CFormGroup row>

								<CLabel htmlFor="produsen-input"><strong>Nama Produsen</strong></CLabel>
								<CInput value={produk.produsen} onChange={handleInputChange} placeholder="Produsen" name="produsen" type="text" />

							</CFormGroup>

							<CFormGroup row>
								<CLabel htmlFor="lembaga_penerbit-input"><strong>Lembaga Penerbit</strong></CLabel>
								<CInput value={produk.lembaga_penerbit} onChange={handleInputChange} placeholder="Lembaga Penerbit" name="lembaga_penerbit" type="text" />
							</CFormGroup>
						</div>
					</CCol>
					<CCol xs="6">
						<div style={{ padding: "5px 10px" }}>
							<CFormGroup row>
								<CLabel htmlFor="text-input"><strong>Nomor Sertifikat Halal</strong></CLabel>

								<CInput value={produk.sertifikat_halal} onChange={handleInputChange} placeholder="010610421..." name="sertifikat_halal" type="text" />
								{/* <CFormText className="help-block"><i>Masukkan kode sertifikat halal jika ada</i></CFormText> */}

							</CFormGroup>

							<CFormGroup row>

								<CLabel htmlFor="expired_date_sertifikat-input"><strong>Expired Sertifikat</strong></CLabel>
								<CInput value={produk.expired_date_sertifikat} onChange={handleInputChange} placeholder="date" name="expired_date_sertifikat" type="date" />

							</CFormGroup>
							{/* tambahan end */}

							<CFormGroup row>

								<CLabel htmlFor="pemasok-input"><strong>Pemasok</strong></CLabel>
								<CInput value={produk.pemasok} onChange={handleInputChange} required placeholder="Pemasok" name="pemasok" type="text" />

							</CFormGroup>
							<CFormGroup row>

								<CLabel htmlFor="textarea-input"><strong>Alamat Pemasok</strong></CLabel>
								<CTextarea value={produk.alamat_pemasok} onChange={handleInputChange} required rows="1" placeholder="Alamat Pemasok" name="alamat_pemasok" type="text" />

							</CFormGroup>
						</div>
					</CCol>
				</CFormGroup>
				<CFormGroup style={{ padding: "0 10px" }}>
					{loadingSubmit ? (
						<span className="card-header-action" style={{ float: "right" }}>
							<button className="btn btn-success" type="button" disabled>
								<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
								Loading...
							</button>
						</span>
					) : (
						<CButton className="card-header-actions" type="submit" value="Submit" color="success">
							<svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
							Tambah
						</CButton>
					)}
				</CFormGroup>
			</CForm>
		</>
	)
}

export default AddForm