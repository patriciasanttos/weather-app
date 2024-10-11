export default async function getDates() {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const today = new Date();
  
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const fifteenDaysBefore = new Date(today);
    fifteenDaysBefore.setDate(today.getDate() - 14);
  
    return {
      yesterday: formatDate(yesterday),
      daysBefore: formatDate(fifteenDaysBefore),
    };
}