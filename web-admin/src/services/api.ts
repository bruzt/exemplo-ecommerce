import axios from 'axios';

let token: string = null;

if(process.browser){
    token = sessionStorage.getItem('token');
}

export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        authorization: (token) ? `Bearer ${token}` : undefined
    }
});