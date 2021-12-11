import React from 'react'
import { Link } from 'react-router-dom'
import './headerFooter.css'

function Header() {
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
        </>
    )
}

export default Header
