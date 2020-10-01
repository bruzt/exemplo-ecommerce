import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTYwMTU3MjY4MSwiZXhwIjoxNjAxNjE1ODgxfQ.JpElfBPKykRJ7_18UwRiQ8a27okAAVZn0IYxp2zKFaM'
    }
});