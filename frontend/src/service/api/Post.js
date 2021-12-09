import axios from 'axios'
import { API_URL } from './connection'

const Post = (path, body) => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${API_URL}/${path}`, body)
            .then((result) => {
                resolve(result.data);
            }, (err) => {
                reject.apply(err);
            })
    })
    return promise
}

export default Post;