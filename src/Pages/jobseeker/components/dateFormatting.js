export const dateFormatting = (date) => {
     const months = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "June",
       "Jul",
       "Aug",
       "Sept",
       "Oct",
       "Nov",
       "Dec",
     ];
     const dateObj = new Date(date);
     const day = dateObj.getDate();
     const month = dateObj.getMonth() + 1;
     const year = dateObj.getFullYear();
     return `${months[month - 1]}, ${year}`;
   };