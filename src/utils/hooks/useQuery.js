import axios from 'axios'

const useQuery = (type, url, headers) => {
    axios.get(url, headers).then(response => {
        return response
    }).catch(error => {
        return error
    })

}