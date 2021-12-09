import React from 'react'
import {
    CBadge,
    CDataTable
} from '@coreui/react'
// import API from '../../../../service/api'

function BillOfMaterials(props) {
    const getBadge = status => {
        switch (status) {
            case 'SEDANG PROSES': return 'secondary'
            case 'HALAL': return 'success'
            case 'HARAM': return 'danger'
            case 'RAGU-RAGU': return 'warning'
            default: return 'primary'
        }
    }
    // const fields = ['BAHAN_BAKU', 'PEMASOK', 'STATUS']

    const fields = [
        { key: 'bahan_baku', label: 'Bahan Baku' },
        { key: 'merk', label: 'Merek' },
        { key: 'produsen', label: 'Produsen' },
        { key: 'lembaga_penerbit', label: 'Lembaga Penerbit' },
        { key: 'sertifikat_halal', label: 'Nomor' },
        { key: 'expired_date_sertifikat', label: 'Tanggal Expired' },
        { key: 'pemasok', label: 'Pemasok' },
        { key: 'alamat_pemasok', label: 'Alamat Pemasok' },
        { key: 'STATUS', label: 'STATUS' },
    ]

    // const kode_barang = props.data;
    // const [billOfMaterials, setBillOfMaterials] = useState([])

    // useEffect(() => {
    //     API.getbillOfMaterials(kode_barang).then(res => {
    //         setBillOfMaterials(res.data);
    //     });
    // }, [kode_barang])
    return (
        <CDataTable
            items={props.data}
            fields={fields}
            size="sm"
            border={true}
            // itemsPerPage={10}
            // pagination
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

export default BillOfMaterials
