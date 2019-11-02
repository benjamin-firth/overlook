class Manager extends Hotel {
  constructor(user, users, bookings, rooms) {
    super(users, bookings, rooms);
    this.id = user.id;
    this.name = user.name;
    this.password = user.password || 'overlook2019';
  }

  findTotalRoomsForDate(date) {
    let bookedRooms = this.bookings.filter(booking => booking.date === date);
    return this.rooms.length - bookedRooms;
  }

  
}