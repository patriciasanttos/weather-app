import SearchBar from './searchbar/SearchBar';
import './styles.scss';

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

      <SearchBar />

      <p className='header-date'>{formatDate(date)}</p>
    </div>
  );
}

export default Header;