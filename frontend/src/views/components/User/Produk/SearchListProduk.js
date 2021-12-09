import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../service/api/connection'
import { AuthContext } from "../../../../service/auth/UserProvider"

export default function SearchListProduk(query, pageNumber) {
    const { state } = useContext(AuthContext);

    var id_user = '';
    if (state.isAuthenticated === true) {
        id_user = state.user.ID_USER;
    }

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [dataProduk, setProdukHalal] = useState([])
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
            url: `${API_URL}/api/SearchMasterProduk?id=${id_user}&search=${query}&page=${pageNumber}&numPerPage=6`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTimeout(() => {
                setProdukHalal(prevProdukHalal => {
                    return [...new Set([...prevProdukHalal, ...res.data.data])]
                })
                setHasMore(res.data.data.length > 0)
                setAllTotal(res.data.result)
                setLoading(false)
            }, 2000);
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber, id_user])


    return { loading, error, dataProduk, hasMore, totalSemua }
}