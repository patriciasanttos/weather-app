import './styles.scss';

function Header({ children, city, state, date }) {
  const formatDate = (date) => {
    const setFirstLetterUppercase = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  
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