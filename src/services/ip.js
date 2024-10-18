import axios from 'axios';

export async function getIp() {
    return await axios.get('https://api.ipify.org?format=json')
        .then(res => {
            return res.data.ip;
        })
        .catch(async () => {
            return await axios.get('http://ip-api.com/json')
                .then(res => {
                    return res.data.query;
                })
                .catch(error => console.error('IP/Error:', error));
        })
}