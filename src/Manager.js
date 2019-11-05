import Hotel from '../src/Hotel';

export default class Manager extends Hotel {
  constructor(user, users, bookings, rooms) {
    super(users, bookings, rooms);
    this.id = user.id;
    this.name = user.name;
    this.password = user.password || 'overlook2019';
  }

  findTotalRoomsForDate(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date);
    return this.rooms.length - bookedRooms.length;
  }

  findTotalRevenueForDate(date) {
    let bookings = this.bookings.filter(booking => booking.date === date);
    let bookedRooms = bookings.map(booking => {
      return this.rooms.find(room => {
        return room.number === booking.roomNumber;
      })
    })
    let revenue = bookedRooms.reduce((acc, bookedRoom) => {
      acc = acc + bookedRoom.costPerNight
      return acc;
    }, 0)
    return parseFloat(revenue.toFixed(2));
  }

  findPercentageOfRoomsOccupied(date) {
    let bookings = this.bookings.filter(booking => booking.date === date);
    let bookedRooms = bookings.map(booking => {
      return this.rooms.find(room => {
        return room.number === booking.roomNumber;
      })
    })
    return bookedRooms.length / this.rooms.length * 100;
  }

  findUserID(name) {
    return this.users.find(user => user.name === name).id;
  }
}