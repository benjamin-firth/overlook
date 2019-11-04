export default class Hotel {
  constructor(users, bookings, rooms) {
    this.users = users;
    this.bookings = bookings;
    this.rooms = rooms;
    this.today = this.getToday();
    this.currentUser;
  }

  getToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = String(today.getFullYear());
    return yyyy + '/' + mm + '/' + dd;
  }

  findCustomerBookings(id) {
    return this.bookings.filter(booking => booking.userID === id) 
  }
}