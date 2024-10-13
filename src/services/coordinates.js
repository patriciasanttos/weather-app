import axios from 'axios';

export async function getCoordinates(ip) {
    const apiKey = import.meta.env.VITE_GEOLOCATION_API_KEY

    return await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`)
        .then(res => {
            return res.data;
        })
        .catch(error => console.error('Coordinates/Error:', error))
}