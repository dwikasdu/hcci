import React, { useState, useEffect } from 'react'
import {
    CRow,
    CCol,
    CWidgetProgress
} from '@coreui/react'
import API from '../../../../service/api'

function Jumlah_Status_Produk() {
    const [status, setStatus] = useState([])
    useEffect(() => {
        API.get_jumlah_semua_status_produk().then(res => {
            setStatus(res.data);
        })
    }, [])

    const Statuscolor = (status) => {
        switch (status) {
            case 'SEDANG PROSES': return 'info'
            case 'HALAL': return 'success'
            case 'RAGU-RAGU': return 'warning'
            case 'HARAM': return 'danger'
            default: return 'primary'
        }
    }

    const StatText = (status) => {
        switch (status) {
            case 'SEDANG PROSES': return 'Bahan Baku Sedang Peroses'
            case 'HALAL': return 'Bahan Baku Halal'
            case 'RAGU-RAGU': return 'Bahan Baku Ragu-ragu'
            case 'HARAM': return 'Bahan Baku Haram'
            default: return 'TIDAK DIKENAL'
        }
    }

    return (
        <>
            <CRow>
                {status.map(e => (
                    <CCol key={e.JUMLAH} xs="12" sm="6" lg="3">
                        <CWidgetProgress color={Statuscolor(e.STATUS_BARANG)} value={e.JUMLAH} header={`${e.JUMLAH}`} footer={StatText(e.STATUS_BARANG)} />
                    </CCol>
                ))}
            </CRow>
        </>
    )
}

export default Jumlah_Status_Produk
