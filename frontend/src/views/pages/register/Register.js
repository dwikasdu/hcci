import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardFooter,
  CButton,
  CTextarea,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CLabel,
  CAlert,
  CFormGroup,
  CCardGroup,
  CInputRadio
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router"
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import HeaderFooter from '../header_footer/HeaderFooter'
import axios from 'axios'

import $ from 'jquery'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Select from "react-select"
import API from "../../../service/api"
import './Register.css'

const Register = () => {
  const history = useHistory();

  const [namaProvinsi, setNamaProvinsi] = useState(null);
  const [selectedProvinsi, setSelectProvinsi] = useState(null);

  const [namaKabupaten, setKabupaten] = useState(null);
  const [selectedKabupaten, setSelectKabupaten] = useState(null);

  const [getKomunitas, setKomunitas] = useState([])
  const [selectedKomunitas, setSelKom] = useState({ NAMA_KOMUNITAS: '' })
  const [getInputKomChange, setInputKomChange] = useState('')

  useEffect(function () {
    API.getMasterKomunitas().then(res => {
      setKomunitas(res.data);
    })
    API.getProvinsi().then(res => {
      const data = res.data;
      const opsi = data.map(d => ({
        "value": d.id,
        "label": d.name
      }));
      setNamaProvinsi(opsi)
    });
    API.getKabupaten().then(res => {
      const setKabu = res.data;
      const kbptn = setKabu.map(d => ({
        "value": d.id,
        "label": d.name,
        "province_id": d.province_id
      }))
      setKabupaten(kbptn)
    });
    AOS.init({
      offset: 200,
      duration: 900,
      easing: 'ease-in-out-sine',
      delay: 200,
      mirror: true
    });
  }, []);

  $(document).ready(function () {
    if ($("#typeahead .dropdown-item").hasClass("disabled")) {
      $("#typeahead").hide()
    }
  })

  let kode_provinsi = '';
  let valKabupaten = '';
  let nama_provinsi = '';
  if (selectedProvinsi !== null) {
    kode_provinsi = selectedProvinsi.value;
    nama_provinsi = selectedProvinsi.label;
    valKabupaten = namaKabupaten.filter(ele => ele.province_id === kode_provinsi);
  }
  let nama_kabupaten = '';
  if (selectedKabupaten !== null) {
    nama_kabupaten = selectedKabupaten.label
  }

  function handleChangeProvinsi(e) {
    setSelectKabupaten(null)
    $('.kabu-paten > div > div > div:first').text('Kabupaten').css({ color: "#bbb" })
  }
  function handleChangeKabupaten(e) {
    $('.kabu-paten > div > div > div:first').css({ color: "#333333" })
  }

  const registered = {
    nama_perusahaan: '',
    username: '',
    password: '',
    password_confirmation: '',
    alamat: '',
    no_telpon: '',
    email: '',
    nama_penanggungjawab: '',
    nomor_telpon_penanggungjawab: '',
    email_penanggungjawab: '',
    provinsi: '',
    kabupaten: '',
    komunitas: '',
    informasi_lainnya: '',

    nama_or_merk_produk: '',
    jenis_produk: '',
    nama_pemilik: '',
    alamat_pemilik: '',
    nomor_hp_pemilik: '',
    alamat_penanggungjawab_halal: '',
    daerah_pemasaran: '',
    sistem_pemasaran: '',
    nomor_lapak: '',
    lokasi_lapak: ''
  }
  const [dataRegister, setDataRegister] = useState(registered)

  const handleInputChange = event => {
    const { name, value } = event.target
    setDataRegister({
      ...dataRegister,
      [name]: value
    })
  }

  const DataPemasaran = {
    daerah_pemasaran: ''
  }
  const [daerah, setDaerahPemasaran] = useState(DataPemasaran)
  const handleDaerahPemasaran = event => {
    const { name, value } = event.target
    setDaerahPemasaran({
      ...daerah,
      [name]: value
    })
  }

  var daerahPemasaran = '';
  if (daerah.daerah_pemasaran === 'lainnya') {
    daerahPemasaran = dataRegister.daerah_pemasaran;
  } else {
    daerahPemasaran = daerah.daerah_pemasaran;
  }

  const DatasisPemasaran = {
    sistem_pemasaran: ''
  }
  const [sistemPemasaran, setSisPemasaran] = useState(DatasisPemasaran)
  const handleSisPemasaran = event => {
    const { name, value } = event.target
    setSisPemasaran({
      ...sistemPemasaran,
      [name]: value
    })
  }

  var SystemPemasaran = '';
  if (sistemPemasaran.sistem_pemasaran === 'lainnya') {
    SystemPemasaran = dataRegister.sistem_pemasaran;
  } else {
    SystemPemasaran = sistemPemasaran.sistem_pemasaran;
  }

  const DataChekbox = {
    infoLainnya: ''
  }
  const [dataCheck, setDataChek] = useState(DataChekbox)
  const handleInformasiDari = event => {
    const { name, value } = event.target
    setDataChek({
      ...dataCheck,
      [name]: value
    })
  }

  var dataInfoLain = '';
  var dataInfoDari = '';
  if (dataCheck.infoLainnya === 'lainnya') {
    dataInfoLain = dataRegister.informasi_lainnya;
  } else {
    dataInfoDari = dataCheck.infoLainnya;
  }

  const [location, setLocation] = useState({
    lat: "",
    lng: ""
  })
  const GetLocation = () => {
    if (dataRegister.alamat.length > 5) {
      axios.get(`https://maps.google.com/maps/api/geocode/json?key=AIzaSyB1buGDWqPdh1IcvWLZHOhimbj81Mrlf4o&address=${dataRegister.alamat}&sensor=true`).then(res => {
        setLocation(res.data.results[0].geometry.location);
        console.log(res.data.results[0].geometry.location);
      }).catch(res => {
        console.log(res.data);
      })
    }
  }

  const data = {
    nama_perusahaan: dataRegister.nama_perusahaan,
    username: dataRegister.username,
    password: dataRegister.password,
    password_confirmation: dataRegister.password_confirmation,
    alamat: dataRegister.alamat,
    no_telpon: dataRegister.no_telpon,
    email: dataRegister.email,
    nama_penanggungjawab: dataRegister.nama_penanggungjawab,
    nomor_telpon_penanggungjawab: dataRegister.nomor_telpon_penanggungjawab,
    email_penanggungjawab: dataRegister.email_penanggungjawab,
    provinsi: nama_provinsi,
    kabupaten: nama_kabupaten,
    last_update: '',
    otorisator: '',
    lattitude: location.lat,
    longitude: location.lang,
    komunitas: selectedKomunitas === undefined || selectedKomunitas.NAMA_KOMUNITAS === '' ? getInputKomChange : selectedKomunitas.NAMA_KOMUNITAS,
    informasi_dari: dataInfoDari,
    informasi_lainnya: dataInfoLain,
    nama_or_merk_produk: dataRegister.nama_or_merk_produk,
    jenis_produk: dataRegister.jenis_produk,
    nama_pemilik: dataRegister.nama_pemilik,
    alamat_pemilik: dataRegister.alamat_pemilik,
    nomor_hp_pemilik: dataRegister.nomor_hp_pemilik,
    alamat_penanggungjawab_halal: dataRegister.alamat_penanggungjawab_halal,
    daerah_pemasaran: daerahPemasaran,
    sistem_pemasaran: SystemPemasaran,
    nomor_lapak: dataRegister.nomor_lapak,
    lokasi_lapak: dataRegister.lokasi_lapak
  }

  const [validasi, setValidasi] = useState(null)
  const postCustomer = data => {
    API.Register(data).then(res => {
      if (res.isRegistered === true) {
        setValidasi(<CAlert color="success">{res.message}</CAlert>)
        setTimeout(() => {
          history.push("/login");
          localStorage.clear();
        }, 2000);
      } else {
        setValidasi(
          <CAlert color="danger">{res.message}</CAlert>
        )
      }
    }).catch(err => {
      setValidasi(
        <CAlert color="danger">Something Went Wrong</CAlert>
      )
    })
  };

  $(window).on('scroll', function () {
    if ($(this).scrollTop()) {
      $('.back-to-top').addClass('active')
      $('#header').addClass('header-scrolled')
    } else {
      $('.back-to-top').removeClass('active')
      $('#header').removeClass('header-scrolled')
    }
  });
  return (
    <>
      <HeaderFooter>
        <section id="halaman-register" className="halaman-register hero d-flex align-items-center">
          <CContainer style={{ zIndex: "1" }}>
            <CRow className="justify-content-center">
              <CCol>
                <CCardGroup>
                  <CCard>
                    <CForm className="mt-5" onSubmit={e => {
                      e.preventDefault();
                      if (
                        dataRegister.password_confirmation !== dataRegister.password ||
                        selectedProvinsi === null || selectedKabupaten === null ||
                        dataCheck.infoLainnya === '' ||
                        data.username.indexOf(' ') >= 0 ||
                        daerahPemasaran === ''
                      ) {
                        setValidasi(
                          <CAlert color="danger">
                            <strong>Pastikan Form yang anda isi telah sesuai!</strong>
                            <br />
                            <ol>
                              {dataRegister.password_confirmation !== dataRegister.password ? (<li>Password Tidak sama dengan sebelumnya</li>) : null}
                              {selectedProvinsi === null || selectedKabupaten === null ? (<li>Isi provinsi dan kabupaten dengan benar</li>) : null}
                              {data.username.indexOf(' ') >= 0 ? (<li>username tidak boleh menggunakan spasi!</li>) : null}
                              {daerahPemasaran === '' ? (<li>Pastikan daerah pemasaran telah ditentukan</li>) : null}
                              {dataCheck.infoLainnya === '' ? (<li>Wajib mengisi informasi yang didapatkan</li>) : null}
                            </ol>
                          </CAlert>
                        )
                      } else {
                        postCustomer(data);
                      }
                    }}>
                      <center data-aos="zoom-in-up">
                        <h1>REGISTER</h1>
                        <span>Isi data diri anda dengan lengkap dan benar</span>
                      </center>
                      <br />
                      <CCardBody>
                        {/* nama perusahaan */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" /></svg>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.nama_perusahaan} onChange={handleInputChange} type="text" required name="nama_perusahaan" placeholder="Nama Usaha *" autoComplete="off" />
                        </CInputGroup>
                        {/* username */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.username} onChange={handleInputChange} type="username" required name="username" placeholder="Username *" autoComplete="off" />
                        </CInputGroup>
                        {/* email */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.email} onChange={handleInputChange} type="email" required name="email" placeholder="Email Aktif *" autoComplete="email" />
                        </CInputGroup>
                        {/* password */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.password} onChange={handleInputChange} type="password" required name="password" placeholder="Password *" autoComplete="new-password" />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.password_confirmation} onChange={handleInputChange} type="password" required name="password_confirmation" placeholder="Repeat Password *" />
                        </CInputGroup>
                        {/* Provinsi */}
                        <CFormGroup>
                          <Select
                            required
                            defaultValue={selectedProvinsi}
                            onChange={e => { handleChangeProvinsi(e); setSelectProvinsi(e) }}
                            options={namaProvinsi}
                            placeholder="Provinsi *"
                          />
                        </CFormGroup>
                        {/* kabupaten */}
                        <CFormGroup>
                          {selectedProvinsi !== null ? (
                            <Select
                              required
                              defaultValue={selectedKabupaten}
                              onChange={e => { handleChangeKabupaten(e); setSelectKabupaten(e) }}
                              options={valKabupaten}
                              placeholder="Kabupaten *"
                              className="kabu-paten"
                            />
                          ) : (
                            <CInput readOnly type="text" className="form-control" placeholder="Kabupaten *" />
                          )}
                        </CFormGroup>
                        {/* No telpon */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.no_telpon} onChange={handleInputChange} type="number" required name="no_telpon" placeholder="Nomor Teplon Usaha *" autoComplete="off" />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CTextarea onBlur={GetLocation} value={dataRegister.alamat} onChange={handleInputChange} required name="alamat" placeholder="Alamat Lengkap Usaha *" autoComplete="off" />
                        </CInputGroup>



                        {/* Nama/Merk Produk */}
                        <CFormGroup>
                          <CInput value={dataRegister.nama_or_merk_produk} onChange={handleInputChange} type="text" name="nama_or_merk_produk" placeholder="Nama/Merk Produk" autoComplete="off" />
                        </CFormGroup>
                        {/* Jenis Produk */}
                        <CFormGroup>
                          <CInput value={dataRegister.jenis_produk} onChange={handleInputChange} type="text" name="jenis_produk" placeholder="Jenis Produk" autoComplete="off" />
                        </CFormGroup>
                        {/* Daerah Pemasaran */}


                        <CLabel htmlFor="informasi"><b>Daerah Pemasaran *</b></CLabel>
                        <br />
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleDaerahPemasaran} custom id="daerah-pemasaran1" name="daerah_pemasaran" value="Provinsi" />
                          <CLabel variant="custom-checkbox" htmlFor="daerah-pemasaran1">Provinsi</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleDaerahPemasaran} custom id="daerah-pemasaran2" name="daerah_pemasaran" value="Nasional" />
                          <CLabel variant="custom-checkbox" htmlFor="daerah-pemasaran2">Nasional</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleDaerahPemasaran} custom id="daerah-pemasaran3" name="daerah_pemasaran" value="Internasional" />
                          <CLabel variant="custom-checkbox" htmlFor="daerah-pemasaran3">Internasional</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleDaerahPemasaran} custom id="daerah-pemasaran4" name="daerah_pemasaran" value="lainnya" />
                          <CLabel variant="custom-checkbox" htmlFor="daerah-pemasaran4">Lainnya...</CLabel>
                        </CFormGroup>
                        <CFormGroup>
                          <br />
                          {daerah.daerah_pemasaran === 'lainnya' ? (
                            <>
                              <CInput value={dataRegister.daerah_pemasaran} onChange={handleInputChange} type="text" required name="daerah_pemasaran" placeholder="Daerah Pemasaran..." autoComplete="off" />
                              <br />
                            </>
                          ) : ''}
                        </CFormGroup>


                        {/* Sistem Pemasaran */}
                        <CLabel htmlFor="informasi"><b>Sistem Pemasaran</b></CLabel>
                        <br />
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleSisPemasaran} custom id="sistem-pemasaran1" name="sistem_pemasaran" value="Retail" />
                          <CLabel variant="custom-checkbox" htmlFor="sistem-pemasaran1">Retail</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleSisPemasaran} custom id="sistem-pemasaran2" name="sistem_pemasaran" value="Non Retail" />
                          <CLabel variant="custom-checkbox" htmlFor="sistem-pemasaran2">Non Retail</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleSisPemasaran} custom id="sistem-pemasaran3" name="sistem_pemasaran" value="lainnya" />
                          <CLabel variant="custom-checkbox" htmlFor="sistem-pemasaran3">Lainnya...</CLabel>
                        </CFormGroup>
                        <CFormGroup>
                          <br />
                          {sistemPemasaran.sistem_pemasaran === 'lainnya' ? (
                            <>
                              <CInput value={dataRegister.sistem_pemasaran} onChange={handleInputChange} type="text" name="sistem_pemasaran" placeholder="Sistem Pemasaran..." autoComplete="off" />
                              <br />
                            </>
                          ) : ''}
                        </CFormGroup>

                        {/* Nomor Lapak */}
                        <CFormGroup>
                          <CInput value={dataRegister.nomor_lapak} onChange={handleInputChange} type="text" name="nomor_lapak" placeholder="Nomor Lapak" autoComplete="off" />
                        </CFormGroup>
                        {/* Lokasi Lapak */}
                        <CFormGroup>
                          <CInput value={dataRegister.lokasi_lapak} onChange={handleInputChange} type="text" name="lokasi_lapak" placeholder="Lokasi Lapak" autoComplete="off" />
                        </CFormGroup>


                        {/* penanggung jawab */}
                        <CLabel htmlFor="pemilikusaha"><b>Pemilik Usaha *</b></CLabel>
                        {/* Nama pemilik */}
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput required value={dataRegister.nama_pemilik} onChange={handleInputChange} type="text" name="nama_pemilik" placeholder="Nama Pemilik *" autoComplete="off" />
                          </CInputGroup>
                        </CFormGroup>
                        {/* No Hp pemilik */}
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput required value={dataRegister.nomor_hp_pemilik} onChange={handleInputChange} type="text" name="nomor_hp_pemilik" placeholder="Nomor Telpon pemilik *" autoComplete="off" />
                          </CInputGroup>
                        </CFormGroup>
                        {/* Alamat pemilik */}
                        <CFormGroup>
                          <CTextarea required value={dataRegister.alamat_pemilik} onChange={handleInputChange} type="text" name="alamat_pemilik" placeholder="Alamat pemilik *" autoComplete="off" />
                        </CFormGroup>


                        {/* penanggung jawab */}
                        <CLabel htmlFor="peanggungjawab"><b>Penanggung Jawab *</b></CLabel>
                        {/* nama penanggungjawab */}
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput value={dataRegister.nama_penanggungjawab} onChange={handleInputChange} type="name" required name="nama_penanggungjawab" id="peanggungjawab" placeholder="Nama Penanggung jawab *" autoComplete="off" />
                          </CInputGroup>
                        </CFormGroup>
                        {/* nomor-telpon */}
                        <CFormGroup>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" /></svg>
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput value={dataRegister.nomor_telpon_penanggungjawab} onChange={handleInputChange} type="number" name="nomor_telpon_penanggungjawab" id="nomor-telpon" placeholder="Nomor Telpon *" autoComplete="off" />
                          </CInputGroup>
                        </CFormGroup>
                        {/* email */}
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput value={dataRegister.email_penanggungjawab} onChange={handleInputChange} type="email" required name="email_penanggungjawab" placeholder="Email Penanggung jawab *" autoComplete="off" />
                        </CInputGroup>
                        {/* Alamat Penanggungjawab halal */}
                        <CFormGroup>
                          <CTextarea required value={dataRegister.alamat_penanggungjawab_halal} onChange={handleInputChange} type="text" name="alamat_penanggungjawab_halal" placeholder="Alamat Lengkap Penanggung jawab *" autoComplete="off" />
                        </CFormGroup>
                        {/* Nama Komunitas */}
                        <CLabel htmlFor="informasi"><b>Nama Komunitas</b></CLabel>
                        <CFormGroup>
                          <Typeahead
                            id="typeahead"
                            inputProps={{ required: true }}
                            labelKey={option => `${option.NAMA_KOMUNITAS}`}
                            options={getKomunitas}
                            placeholder="Nama komunitas *"
                            onInputChange={(e) => setInputKomChange(e)}
                            onChange={(e) => setSelKom(e[0])}
                          />
                        </CFormGroup>
                        {/* Infromasi dari */}
                        <CLabel htmlFor="informasi"><b>Dapat Infromasi dari ? *</b></CLabel>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleInformasiDari} custom id="inline-radio1" name="infoLainnya" value="Instagram" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Instagram</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleInformasiDari} custom id="inline-radio2" name="infoLainnya" value="Facebook" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Facebook</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleInformasiDari} custom id="inline-radio3" name="infoLainnya" value="Iklan" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio3">Iklan</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleInformasiDari} custom id="inline-radio4" name="infoLainnya" value="Internet" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio4">Internet</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio">
                          <CInputRadio onChange={handleInformasiDari} custom id="inline-radio5" name="infoLainnya" value="lainnya" />
                          <CLabel variant="custom-checkbox" htmlFor="inline-radio5">Lainnya...</CLabel>
                        </CFormGroup>
                        <CFormGroup>
                          <br />
                          {dataCheck.infoLainnya === 'lainnya' ? (
                            <CInput value={dataRegister.informasi_lainnya} onChange={handleInputChange} type="text" required name="informasi_lainnya" placeholder="Informasi Lainnya..." autoComplete="off" />
                          ) : ''}
                        </CFormGroup>


                        <CFormGroup>
                          {validasi}
                        </CFormGroup>

                      </CCardBody>
                      <CCardFooter className="p-4">
                        <CRow>
                          <CCol>
                            <div className="card-header-actions">
                              <CButton type="submit" color="success" block>Buat Akun</CButton>
                            </div>
                          </CCol>
                        </CRow>
                      </CCardFooter>
                    </CForm>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </section>
      </HeaderFooter>
    </>
  )
}

export default Register
