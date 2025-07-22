export const getFormattedDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options); 
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good day";
  return "Good evening";
};



export function getAbbreviatedDay(dt: number): string {
  return new Date(dt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
}



export function getCurrentTimeFormatted() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

 
  hours = hours % 12;
  hours = hours ? hours : 12; 

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${ampm}`;
}


