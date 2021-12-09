import axios from 'axios'
import { API_URL } from './connection'

const Get = (path, body) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${API_URL}/${path}`, body)
            .then((result) => {
                resolve(result.data);
            }, (err) => {
                reject.apply(err);
            })
    })
    return promise
}

export default Get;