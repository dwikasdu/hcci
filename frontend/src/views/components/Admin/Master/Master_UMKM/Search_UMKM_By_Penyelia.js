import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../../service/api/connection'

export default function Search_UMKM_By_Penyelia(query, pageNumber, numPerPage, id_user) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [dataUMKM, setProdukHalal] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [totalSemua, setAllTotal] = useState(0)

    useEffect(() => {
        setProdukHalal([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `${API_URL}/admin/Search_umkm_by_penyelia?id=${id_user}&search=${query}&page=${pageNumber}&numPerPage=${numPerPage}`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTimeout(() => {
                setProdukHalal(prevProdukHalal => {
                    return [...new Set([...prevProdukHalal, ...res.data.data])]
                })
                setHasMore(res.data.data.length > 0)
                setAllTotal(res.data.data.result)
                setLoading(false)
            }, 1500);
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber, numPerPage, id_user])


    return { loading, error, dataUMKM, hasMore, totalSemua }
}