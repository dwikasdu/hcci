import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../service/api/connection'

export default function Search_Produk_Halal(query, pageNumber, id_user) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [dataProduk, setProdukHalal] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setProdukHalal([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: `${API_URL}/admin/search_kunjungan_by_penyelia?id=${id_user}&search=${query}&page=${pageNumber}&numPerPage=6`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTimeout(() => {
                setProdukHalal(prevProdukHalal => {
                    return [...new Set([...prevProdukHalal, ...res.data.data])]
                })
                setHasMore(res.data.data.length > 0)
                setLoading(false)
            }, 1000);
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber, id_user])


    return { loading, error, dataProduk, hasMore }
}