import './styles.scss';

function Header({ children, city, state, date }) {
  const formatDate = (date) => {
    const setFirstLetterUppercase = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

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

      { children }

      <p className='header-date'>{formatDate(date)}</p>
    </div>
  );
}

export default Header;