export const handleLongDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("pt-Br", { dateStyle: "long" });
  };

 export const handleShortDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("pt-Br", { dateStyle: "short" });
  };