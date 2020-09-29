import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTYwMTM4NDAxNSwiZXhwIjoxNjAxNDI3MjE1fQ.P2Frc71enY447r4RgUZbTmzbTY1i-mcBAqUNIhXSaBo'
    }
});