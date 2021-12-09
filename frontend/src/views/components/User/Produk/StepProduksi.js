import React from 'react'
import {
    CBadge,
    CDataTable
} from '@coreui/react'
// import API from '../../../../service/api'

const getBadge = status => {
    switch (status) {
        case 'SEDANG PROSES': return 'secondary'
        case 'HALAL': return 'success'
        case 'HARAM': return 'danger'
        case 'RAGU-RAGU': return 'warning'
        default: return 'primary'
    }
}
// const fields = [ { key: 'STEP'}, lable: 'TAHAPAN', 'KETERANGAN']

const fields = [
    { key: 'step_ke', label: 'STEP KE' },
    { key: 'step_keterangan', label: 'KETERANGAN' }
]
function StepProduksi(props) {

    // const kode_barang = props.kode;
    // const [stepProduk, setStepProduk] = useState([])

    // useEffect(() => {
    //     API.getStepProduksi(kode_barang).then(res => {
    //         setStepProduk(res.data);
    //     });
    // }, [kode_barang])
    return (
        <CDataTable
            items={props.data}
            fields={fields}
            size="sm"
            border={true}
            itemsPerPage={10}
            pagination
            scopedSlots={{
                'STATUS':
                    (item) => (
                        <td>
                            <CBadge color={getBadge(item.STATUS)}>
                                {item.STATUS}
                            </CBadge>
                        </td>
                    )
            }}
        />
    )
}

export default StepProduksi
