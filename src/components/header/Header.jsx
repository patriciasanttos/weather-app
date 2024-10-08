import './styles.scss';

import searchIcon from '../../assets/search.svg';

function Header({ city, state, date }) {
  const setFirstLetterUppercase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const formatDate = (date) => {
    const optionsWeekday = { weekday: 'long' };
    const optionsDay = { day: '2-digit' };
    const optionsMonth = { month: 'long' };
  
    const weekday = date.toLocaleDateString('pt-BR', optionsWeekday);
    const day = date.toLocaleDateString('pt-BR', optionsDay);
    const month = date.toLocaleDateString('pt-BR', optionsMonth);
  
    return `${setFirstLetterUppercase(weekday)} (${day}) - ${setFirstLetterUppercase(month)}`;
  }

  return (
    <div className='header'>
      <p className='header-city'>{city} - {state}</p>

      <div className='header-search-bar-container'>
        <input className='header-search-bar' type='text' placeholder='Pesquisar local' />
        <img className='search-icon' src={searchIcon} alt='Pesquisar' />
      </div>

      <p className='header-date'>{formatDate(date)}</p>
    </div>
  );
}

export default Header;