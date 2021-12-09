import React, { useState } from 'react'
import {
	CButton,
	CCol,
	CForm,
	CFormGroup,
	CTextarea,
	CInput,
	CLabel,
	CModalFooter
} from '@coreui/react'


const AddForm = props => {
	// console.log(props);

	const initialFormState = {
		id: null,
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
			kontent: props.namaProduk,
			id_user: '',
			status: '0',
			keterangan: '',
			otorisator: '',
			keterangan_bom: '',
			status_bahan_baku: '0',
			id_in_step: '',
			id_bahan_baku: '',
			locked: '',
			step_id: '',
			step_ke: '',
			step_keterangan: '',
			[name]: value
		})
	}
	return (
		<>
			<CForm
				onSubmit={event => {
					event.preventDefault()
					if (!produk.bahan_baku || !produk.pemasok || !produk.alamat_pemasok) return
					props.setLarge(false)
					props.addProduk(produk)
					setProduk(initialFormState)
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
				<CModalFooter>
					<CButton className="card-header-actions" type="submit" value="Submit" size="sm" color="success">
						<svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M20 14H14V20H10V14H4V10H10V4H14V10H20V14Z" /></svg>
						Tambah
					</CButton>
				</CModalFooter>
			</CForm>

		</>
	)
}

export default AddForm