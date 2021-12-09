import React from 'react'
import './headerFooter.css'

function Footer() {
    return (
        <>
            {/* <!-- ======= Footer ======= --> */}
            <footer id="footer" className="footer">
                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>HCCI</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Created by <a href="/">cloudmicrosystem.com</a>
                    </div>
                </div>
            </footer>
            {/* <!-- End Footer --> */}
            <a href="/" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
        </>
    )
}

export default Footer
