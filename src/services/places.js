import axios from 'axios';

export async function getPlaces(query) {
    const apiKey = import.meta.env.VITE_AUTOCOMPLETE_API_KEY;

    return await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&language=pt-BR`)
        .then(res => {
            return res.data.results
                .map(place => ({
                    name: place.formatted,
                    state: place.components.state,
                    lat: place.geometry.lat,
                    lon: place.geometry.lng
                }));
        })
        .catch(error => console.error('Places/Error:', error))
}