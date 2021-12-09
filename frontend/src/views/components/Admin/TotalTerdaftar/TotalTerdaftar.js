import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCardHeader
} from '@coreui/react'
import {
    CChartBar
} from '@coreui/react-chartjs'
import API from '../../../../service/api'

function TotalTerdaftar() {
    const data = [{
        "MONTH": '',
        "REGISTERED": 0
    }]
    const [terdaftar, setTerdaftar] = useState(data)
    var result = Object.keys(terdaftar).map((key) => terdaftar[key].REGISTERED);
    var bulan = Object.keys(terdaftar).map((key) => terdaftar[key].MONTH);

    let newDate = new Date()
    let year = newDate.getFullYear();

    useEffect(() => {
        API.getTerdaftarTiapBulan(year).then(res => {
            setTerdaftar(res.data);
        });
    }, [year]);
    return (
        <>
            <CCardGroup className="cols-12" >
                <CCard>
                    <CCardHeader>
                        <strong>UMKM Terdaftar Tiap Bulan</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CChartBar
                            datasets={[
                                {
                                    label: 'UMKM TERDAFTAR',
                                    backgroundColor: '#f87979',
                                    data: result
                                }
                            ]}
                            labels={bulan}
                            options={{
                                tooltips: {
                                    enabled: true
                                }
                            }}
                        />
                    </CCardBody>
                </CCard>
            </CCardGroup>
            <br />
        </>
    )
}

export default TotalTerdaftar
