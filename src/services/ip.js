import axios from 'axios';

export async function getIp() {
    return await axios.get('https://api.ipify.org?format=json')
        .then(res => {
            return res.data.ip;
        })
        .catch(error => console.error('Erro ao obter o IP:', error))
}