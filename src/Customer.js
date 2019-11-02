class Customer extends Hotel {
  constructor(user, users, bookings, rooms) {
    super(users, bookings, rooms);
    this.id = user.id;
    this.name = user.name;
    this.password = user.password || 'overlook2019';
  }
}