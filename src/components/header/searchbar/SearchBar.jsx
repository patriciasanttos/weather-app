import { useState, useRef, useEffect } from 'react';
import { getPlaces } from '../../../services/places';

import './styles.scss';
import searchIcon from '../../../assets/search.svg';

function SearchBar({ setLocation }) {
    const [ query, setQuery ] = useState('');
    const [ suggestions, setSuggestions ] = useState([]);

    const searchContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (searchContainerRef.current && !searchContainerRef.current.contains(event.target))
            return setSuggestions([]);
        };
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query)
                search(query);

            else
                setSuggestions([]);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const search = async () => {
        const normalizedQuery = query
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/gi, '')
            .trim()
            .replace(/\s+/g, '_')
            .toLowerCase();

        const gettedPlaces = await getPlaces(normalizedQuery);

        setSuggestions(gettedPlaces);
    }

    const onSelectSuggestion = (place) => {
        setLocation({
            city: place.name,
            state: place.state,
            lat: place.lat,
            lon: place.lon,
            date: new Date(Date.now())
        });
    }

    return (
        <div ref={searchContainerRef} className='search-bar-container'>
            <input 
                className='search-bar' 
                type='text' 
                placeholder='Pesquisar local' 
                onChange={e => setQuery(e.target.value)}
            />
            <img className='search-icon' src={searchIcon} alt='Pesquisar' />

            {suggestions.length > 0 && (
                <ul className='suggestions-list'>
                {suggestions.map((suggestion, index) => (
                    <li
                        className='suggestion-item'
                        key={index}
                        onClick={() => onSelectSuggestion(suggestion)}
                    >
                        <div className='suggestion-name'>{suggestion.name}</div>
                        <div className='suggestion-description'>{suggestion.state}</div>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;