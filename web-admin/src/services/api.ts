import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTYwMTY0MzU1MywiZXhwIjoxNjAxNjg2NzUzfQ.pMiWvkGOGKkOGGBSQXf4ZvKq47Uli-hv3GvT3GvtR_o'
    }
});