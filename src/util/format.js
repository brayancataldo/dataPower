export const handleLongDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("pt-Br", { dateStyle: "long" });
  };

 export const handleShortDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("pt-Br", { dateStyle: "short" });
  };

  export const formatDate = (date, type) => {
    date = new Date(date);
    const day = `${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
    const month = `${date.getMonth() + 1 < 10 ? "0" : ""}${
      date.getMonth() + 1
    }`;
    const year = date.getFullYear();
    if(type === 'yyyy-mm-dd'){
    return `${year}-${month}-${day}`;
  }
  if(type === 'mm-dd-yyyy'){
    return `${month}-${day}-${year}`;
  }
  return `${day}/${month}/${year}`;
};