import React from 'react'
import { Link } from 'react-router-dom'
import './headerFooter.css'

function HeaderFooter({ children }) {
    return (
        <>
            {/* <!-- ======= Header ======= --> */}
            <header id="header" className="header fixed-top">
                <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <Link className="logo d-flex align-items-center" shape="pill" color="link" to="/">
                        {/* <!-- <img src="assets/img/logo.png" alt=""> --> */}
                        <span><strong>HC-UM</strong></span>
                    </Link>

                    {/* <nav id="navbar" className={this.state.btn_class !== false ? "navbar navbar-mobile" : "navbar"}>
                    <ul>
                        <li><Link className="nav-link scrollto active" shape="pill" color="link" to="/">Home</Link></li>
                        <li><Link className="nav-link scrollto" shape="pill" color="link" to="/#faq">Faq</Link></li>
                    </ul>
                    <i onClick={this.hanleClickMobilebtn.bind(this)}
                        className={`bi mobile-nav-toggle ${this.state.btn_class !== false ? "bi-x" : "bi-list"}`}></i>
                    </nav> */}
                    <nav id="navbar" className="navbar">
                        <Link className="getstarted scrollto" shape="pill" color="link" to="/">Home</Link>
                    </nav>
                    {/* <!-- .navbar --> */}

                </div>
            </header>
            {/* <!-- End Header --> */}

            {children}

            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer" className="footer">
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>HC-UM</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Created by <a href="/">cloudmicrosystem.com</a>
                    </div>
                </div>
            </footer>
            {/* <!-- End Footer --> */}
            <a href="/" className="back-to-top d-flex align-items-center justify-content-center">
                <svg fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M15,20H9V12H4.16L12,4.16L19.84,12H15V20Z" /></svg>
            </a>
        </>
    )
}

export default HeaderFooter
