import Hotel from '../src/Hotel';

export default class Customer extends Hotel {
  constructor(user, users, bookings, rooms) {
    super(users, bookings, rooms);
    this.id = user.id;
    this.name = user.name;
    this.password = user.password || 'overlook2019';
    this.selectedDateRooms = [];
  }

  findMyBookings() {
    let myBookings = this.findCustomerBookings(this.id);
    return myBookings.map(booking => {
      return { date: booking.date, roomNumber: booking.roomNumber, id: booking.id };
    }) 
  }

  findTotalSpent() {
    let myBookings = this.findCustomerBookings(this.id);
    let myBookedRooms = myBookings.map(booking => {
      return this.rooms.find(room => {
        return room.number === booking.roomNumber;
      })
    })
    return Number(myBookedRooms.reduce((acc, bookedRoom) => {
      acc = acc + bookedRoom.costPerNight
      return acc;
    }, 0).toFixed(2))
  }
}