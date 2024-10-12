import './styles.scss';

import searchIcon from '../../../assets/search.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const locales = [
    "São Paulo - SP",
    "Campinas - SP",
    "Santos - SP",
    "Sorocaba - SP",
    "Ribeirão Preto - SP",
    "São José dos Campos - SP",
    "Guarulhos - SP",
    "Bauru - SP",
    "Jundiaí - SP",
    "Piracicaba - SP",
  
    "Belo Horizonte - MG",
    "Uberlândia - MG",
    "Juiz de Fora - MG",
    "Contagem - MG",
    "Betim - MG",
    "Montes Claros - MG",
    "Uberaba - MG",
    "Governador Valadares - MG",
    "Sete Lagoas - MG",
    "Divinópolis - MG"
];

function SearchBar() {
    const [suggestions, setSuggestions] = useState([]);
    const searchContainerRef = useRef(null);

    const search = (item) => {
        if (!item)
            return setSuggestions([]);

        const searchResult = locales.filter(city => {
            city = city
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\w\s]/gi, '')
                .toLowerCase();

            return city.includes(item);
        })

        setSuggestions(searchResult);
        console.log(searchResult);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setSuggestions([]);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <div ref={searchContainerRef} className='search-bar-container'>
            <input 
                className='search-bar' 
                type='text' 
                placeholder='Pesquisar local' 
                onChange={e => search(e.target.value)}
            />
            <img className='search-icon' src={searchIcon} alt='Pesquisar' />

            {suggestions.length > 0 && (
                <ul className='suggestions-list'>
                {suggestions.map((suggestion, index) => (
                    <li
                        className='suggestion-item'
                        key={index}
                    >
                    {suggestion}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;