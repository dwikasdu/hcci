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

const EditForm = props => {
	const [produk, setProduk] = useState(props.currentProduk)

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

	return (
		<CForm
			onSubmit={event => {
				event.preventDefault()

				props.updateProduk(produk.id, produk)
			}}
			action="" method="post" encType="multipart/form-data" className="form-horizontal">

			<CFormGroup row className="my-0" style={{ margin: "0 auto" }}>
				<CCol xs="6">
					<div style={{ padding: "5px 10px" }}>
						<CFormGroup row>

							<CLabel htmlFor="bahan-baku"><strong>Nama Bahan Baku *</strong></CLabel>
							<CInput value={produk.bahan_baku} onChange={handleInputChange} required placeholder="Bahan baku....." name="bahan_baku" type="text" />

						</CFormGroup>
						{/* tambahan */}
						<CFormGroup row>

							<CLabel htmlFor="merk-input"><strong>Merek Bahan *</strong></CLabel>
							<CInput required value={produk.merk} onChange={handleInputChange} placeholder="Merek Bahan" name="merk" type="text" />

						</CFormGroup>

						<CFormGroup row>

							<CLabel htmlFor="produsen-input"><strong>Nama Produsen *</strong></CLabel>
							<CInput required value={produk.produsen} onChange={handleInputChange} placeholder="Produsen" name="produsen" type="text" />

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

						</CFormGroup>

						<CFormGroup row>

							<CLabel htmlFor="expired_date_sertifikat-input"><strong>Expired Sertifikat</strong></CLabel>
							<CInput value={produk.expired_date_sertifikat} onChange={handleInputChange} placeholder="date" name="expired_date_sertifikat" type="date" />

						</CFormGroup>
						{/* tambahan end */}

						<CFormGroup row>

							<CLabel htmlFor="pemasok-input"><strong>Pemasok *</strong></CLabel>
							<CInput value={produk.pemasok} onChange={handleInputChange} required placeholder="Pemasok" name="pemasok" type="text" />

						</CFormGroup>
						<CFormGroup row>

							<CLabel htmlFor="textarea-input"><strong>Alamat Pemasok *</strong></CLabel>
							<CTextarea value={produk.alamat_pemasok} onChange={handleInputChange} required rows="4" placeholder="Alamat Pemasok" name="alamat_pemasok" type="text" />

						</CFormGroup>
					</div>
				</CCol>
			</CFormGroup>
			<CFormGroup row>
				<CCol>
					<div className="card-header-actions">
						<CButton className="m-2" type="submit" value="Submit" size="sm" color="success">
							Update
						</CButton>
						<CButton className="m-2" onClick={() => props.setEditing(false)} size="sm" color="secondary">
							Cancel
						</CButton>
					</div>
				</CCol>
			</CFormGroup>

		</CForm>
	)
}

export default EditForm