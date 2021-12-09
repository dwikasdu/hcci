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
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../../../service/api'
import CIcon from '@coreui/icons-react'
import SweetAlert from "react-bootstrap-sweetalert"

const EditForm = props => {
	const [produk, setProduk] = useState(props.currentProduk)
	const [alertEdits, setAlertEdit] = useState(null)

	useEffect(
		() => {
			setProduk(props.currentProduk)
		},
		[props]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setProduk({ ...produk, [name]: value })
	}
	const onHendleSubmit = (event) => {
		event.preventDefault()
		props.setEditBahan(!props.editBahan)
		const data = {
			id_bahan_baku: produk.id_bahan_baku,
			bahan_baku: produk.bahan_baku,
			pemasok: produk.pemasok,
			alamat_pemasok: produk.alamat_pemasok,
			sertifikat_halal: produk.sertifikat_halal,
			merk: produk.merk,
			produsen: produk.produsen,
			lembaga_penerbit: produk.lembaga_penerbit,
			expired_date_sertifikat: produk.expired_date_sertifikat
		}
		API.updateBillOfMaterials(data).then(res => {
			props.refreshProduk(true)
		})
	}

	const deleteBillOfMaterialsById = () => {
		if (props.jumlahProduk !== 1) {
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
						API.deleteBillOfMaterials(produk.id_bahan_baku).then(res => {
							props.refreshProduk(true)
						})
						setAlertEdit(null)
					}}
					onCancel={() => setAlertEdit(null)}
				>
					Ingin menghapus Item ini?
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
					Silahkan tambah satu item lagi untuk menghapus item ini!
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
								<CTextarea value={produk.alamat_pemasok} onChange={handleInputChange} required rows="4" placeholder="Alamat Pemasok" name="alamat_pemasok" type="text" />

							</CFormGroup>
						</div>
					</CCol>
				</CFormGroup>

				<CFormGroup row>
					<CCol>
						<div className="card-header-actions">
							<CButton className="m-2" type="submit" value="Submit" size="sm" color="success">
								<CIcon name="cil-save" className="mfe-2" /> <span>Perbarui</span>
							</CButton>
							<CButton className="m-2" onClick={() => props.setEditBahan(!props.editBahan)} color="secondary">
								Batal
							</CButton>
							<CButton className="m-2" onClick={deleteBillOfMaterialsById} size="sm" color="danger">
								<CIcon name="cil-trash" className="mfe-2" /> <span>Hapus</span>
							</CButton>
						</div>
					</CCol>
				</CFormGroup>

			</CForm>
		</>
	)
}

export default EditForm
