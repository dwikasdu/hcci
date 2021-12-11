import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import './Homes.css'
import $ from 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
import SVGbackground from '../SVG/SVGbackground'

const Home = () => {
  const [accordion, setAccordion] = useState(1)
  // const [btClass, setBtnClass] = useState(false)

  // const hanleClickMobilebtn = (e) => {
  //   setBtnClass(!btClass)
  //   e.preventDefault()
  // }
  useEffect(function () {
    AOS.init({
      offset: 200,
      duration: 900,
      easing: 'ease-in-out-sine',
      delay: 200,
      mirror: true
    });
  }, []);

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
    <div className="front-home">
      {/* <!-- ======= Header ======= --> */}
      <header id="header" className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Link className="logo d-flex align-items-center" shape="pill" color="link" to="/">
            {/* <!-- <img src="assets/img/logo.png" alt=""> --> */}
            <span><strong>HC-UM</strong></span>
          </Link>

          {/* <nav id="navbar" className={btClass !== false ? "navbar navbar-mobile" : "navbar"}>
            <ul>
              <li><Link className="nav-link scrollto active" shape="pill" color="link" to="/">Home</Link></li>
              <li><a className="nav-link scrollto" href="#about">About</a></li>
              <li><Link className="nav-link scrollto" shape="pill" color="link" to="#faq">Faq</Link></li>
              <li className="dropdown"><a href="/"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                <ul>
                  <li><a href="/">Drop Down 1</a></li>
                  <li className="dropdown"><a href="/"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                    <ul>
                      <li><a href="/">Deep Drop Down 1</a></li>
                      <li><a href="/">Deep Drop Down 2</a></li>
                      <li><a href="/">Deep Drop Down 3</a></li>
                      <li><a href="/">Deep Drop Down 4</a></li>
                      <li><a href="/">Deep Drop Down 5</a></li>
                    </ul>
                  </li>
                  <li><a href="/">Drop Down 2</a></li>
                  <li><a href="/">Drop Down 3</a></li>
                  <li><a href="/">Drop Down 4</a></li>
                </ul>
              </li>
              <li><a className="nav-link scrollto" href="#contact">Kontak</a></li>
              <li><Link className="getstarted scrollto" shape="pill" color="link" to="/login">Masuk</Link></li>
            </ul>
            <i onClick={hanleClickMobilebtn}
              className={`bi mobile-nav-toggle ${btClass !== false ? "bi-x" : "bi-list"}`}></i>
          </nav> */}

          <nav id="navbar" className="navbar">
            <Link className="getstarted scrollto" shape="pill" color="link" to="/login">Masuk</Link>
          </nav>
          {/* <!-- .navbar --> */}

        </div>
      </header>
      {/* <!-- End Header --> */}


      {/* <!-- ======= Hero Section ======= --> */}
      <section id="hero" className="hero d-flex align-items-center">

        <div className="container">
          <div className="row">
            <div data-aos="zoom-in-up" className="col-lg-6 d-flex flex-column justify-content-center">
              <h1>Selamat Datang Di Website HC-UM.</h1>
              <h2>Halal Center Universitas Negeri Malang</h2>
              <div>
                <div className="text-center text-lg-start">
                  <Link style={{ textDecoration: "none" }} className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center" shape="pill" color="link" to="/register">
                    <span>Daftar Sekarang</span>
                    <svg style={{ marginLeft: "10px" }} fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" /></svg>
                  </Link>
                </div>
              </div>
            </div>
            <div data-aos="fade-right" data-aos-delay="100" className="col-lg-6 hero-img">
              {/* <!-- <img src="assets/img/hero-img.png" className="img-fluid" alt=""> --> */}
              <SVGbackground />
            </div>
          </div>
        </div>

      </section>
      {/* <!-- End Hero --> */}

      <main id="main">
        <section id="faq" className="faq" data-aos="zoom-in-up">
          <div className="container">
            <header className="section-header">
              <h2 data-aos="zoom-in-up" data-aos-delay="80">F.A.Q</h2>
              <p data-aos="zoom-in-up" data-aos-delay="90">Sering Ditanyakan</p>
            </header>


            <div id="accordion">
              <CCard className="mb-0">
                <CCardHeader id="headingOne">
                  <CButton
                    block
                    className="text-left m-0 p-0"
                    onClick={() => setAccordion(accordion === 1 ? null : 1)}
                  >
                    <h5 className="m-0 p-0">Apa itu HC-UM?</h5>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion === 1}>
                  <CCardBody>
                    <div className="ml-3">
                      HC-UM adalah Sistem Penjaminan Mutu Halal yang dilakukan oleh Halal Center Universitas Negeri Malang (HC-UM)
                    </div>
                  </CCardBody>
                </CCollapse>
              </CCard>
              <CCard className="mb-0">
                <CCardHeader id="headingTwo">
                  <CButton
                    block
                    className="text-left m-0 p-0"
                    onClick={() => setAccordion(accordion === 2 ? null : 2)}
                  >
                    <h5 className="m-0 p-0">Untuk siapa HC-UM ditujukan ?</h5>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion === 2}>
                  <CCardBody>
                    <div className="ml-3">
                      HC-UM ditujukan untuk pelaku usaha baik UKM/IKM sebagai wujud untuk mendukung produk halal bagi masyarakat
                    </div>
                  </CCardBody>
                </CCollapse>
              </CCard>
              <CCard className="mb-0">
                <CCardHeader id="headingThree">
                  <CButton
                    block
                    className="text-left m-0 p-0"
                    onClick={() => setAccordion(accordion === 3 ? null : 3)}
                  >
                    <h5 className="m-0 p-0">Bagaimana cara daftar ?</h5>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion === 3}>
                  <CCardBody>
                    <ul>
                      <li>Register Perusahaan</li>
                      <li>Register Produk</li>
                      <li>Register Bahan Baku</li>
                      <li>Akad Pernyataan Halal</li>
                    </ul>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </div>

          </div>
        </section>

        {/* 
          <section id="contact" className="contact">
            <div className="container">

              <header className="section-header">
                <h2>Contact</h2>
                <p>Contact Us</p>
              </header>
              <div className="row gy-4">
                <div className="col-lg-6">

                  <div className="row gy-4">
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-geo-alt"></i>
                        <h3>Address</h3>
                        <p>A108 Adam Street,<br />New York, NY 535022</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-telephone"></i>
                        <h3>Call Us</h3>
                        <p>+1 5589 55488 55<br />+1 6678 254445 41</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-envelope"></i>
                        <h3>Email Us</h3>
                        <p>info@example.com<br />contact@example.com</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-clock"></i>
                        <h3>Open Hours</h3>
                        <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-lg-6">
                  <form action="" method="post" className="php-email-form">
                    <div className="row gy-4">

                      <div className="col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                      </div>

                      <div className="col-md-6 ">
                        <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                      </div>

                      <div className="col-md-12">
                        <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                      </div>

                      <div className="col-md-12">
                        <textarea className="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                      </div>

                      <div className="col-md-12 text-center">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>

                        <button type="submit">Send Message</button>
                      </div>

                    </div>
                  </form>

                </div>
              </div>
            </div>
          </section>
         */}
      </main>

      {/* <!-- ======= Footer ======= --> */}
      <footer id="footer" className="footer">

        <div className="footer-top">
          <div className="container">
            <div className="row gy-4">
              <div data-aos="zoom-in-up" data-aos-delay="70" className="col-lg-5 col-md-12 footer-info">
                <a href="/" className="logo d-flex align-items-center">
                  <span>HC-UM</span>
                </a>
                <span>Memberikan pelayanan pemeriksaan kualitas produk yang menjamin mutu dan kehalalannya</span>
                {/* <div className="social-links mt-3">
                    <a href="/" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="/" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="/" className="instagram"><i className="bi bi-instagram bx bxl-instagram"></i></a>
                    <a href="/" className="linkedin"><i className="bi bi-linkedin bx bxl-linkedin"></i></a>
                  </div> */}
              </div>

              <div data-aos="zoom-in-up" data-aos-delay="80" className="col-lg-2 col-6 footer-links">
                <h4>Panduan</h4>
                <ul>
                  <li><i className="bi bi-chevron-right"></i> <a href="/">Cara Mendaftar</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="/">Mengisi Produk</a></li>
                  <li><i className="bi bi-chevron-right"></i> <a href="/">Alur Pendampingan</a></li>
                </ul>
              </div>

              {/* <div className="col-lg-2 col-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><i className="bi bi-chevron-right"></i> <a href="/">Web Design</a></li>
                    <li><i className="bi bi-chevron-right"></i> <a href="/">Web Development</a></li>
                    <li><i className="bi bi-chevron-right"></i> <a href="/">Product Management</a></li>
                    <li><i className="bi bi-chevron-right"></i> <a href="/">Marketing</a></li>
                    <li><i className="bi bi-chevron-right"></i> <a href="/">Graphic Design</a></li>
                  </ul>
                </div> */}

              <div data-aos="zoom-in-up" data-aos-delay="90" className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4>Kontak kami</h4>
                <span>
                  Malang <br />
                  Indonesia <br /><br />
                  <strong>Phone:</strong> +62 80000000<br />
                  <strong>Email:</strong> info@HC-UM.com<br />
                </span>

              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>HC-UM</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
            Created by <a href="/">Cloudmicrosystem</a>
          </div>
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      <a href="/" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
    </div>
  )
}

export default Home;