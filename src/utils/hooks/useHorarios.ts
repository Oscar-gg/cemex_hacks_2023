

export const UseHorarios = (id:string) => {

    // Example usage:
    const hours = generateHoursArray();
    // console.log(hours)
    const reservations = [];
    for (const hour of hours) {
        // console.log(hour)
        const reservation = {hour: hour, reserved: false, email: "ale@test.mx"};
        reservations.push(reservation);
    }

    return reservations;
}

const generateHoursArray = () => {
    const hoursArray = [];
    
    for (let hour = 7; hour <= 20; hour++) {
      // Format the hour as "hh:00 am/pm"
      const formattedHour = (hour % 12 || 12) + ':00 ' + (hour < 12 ? 'am' : 'pm');
      
      hoursArray.push(formattedHour);
    }
    
    return hoursArray;
  }

