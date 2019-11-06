// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import flatpickr from "flatpickr";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/scooby-doo.jpg'

import Hotel from './Hotel';
import Manager from './Manager';
import Customer from './Customer';

let currentPage = 'Welcome Page';


let userData = 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(data => data.users)
  .catch(err => console.log(err));

let bookingData = 
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json())
  .then(data => data.bookings)
  .catch(err => console.log(err));

let roomData =
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json())
  .then(data => data.rooms)
  .catch(err => console.log(err));

var hotel;
var manager;
var customer;

Promise.all([userData, bookingData, roomData])
.then(allData => {
  userData = allData[0];
  bookingData = allData[1];
  roomData = allData[2];
  hotel = new Hotel(userData, bookingData, roomData);
})

$('.login').on('click', login);
// Listen on the form for change, but also address why radio buttons won't un-click.
$('body').click(fireClickEvents);

function login(e) {
  e.preventDefault();
  $('.login-error').text('');
  if ($('.password').val() !== 'overlook2019') {
    return $('.login-error').text('Password Incorrect!').addClass('error');
  }
  if ($('.username').val() === 'manager') {
    manager = new Manager({ id: 1, name: 'Betsy' }, userData, bookingData, roomData);
    currentPage = 'Manager Page';
    renderPage();
  } else {
    customer = new Customer({ id: 7, name: 'Dell Rath' }, userData, bookingData, roomData);
    currentPage = 'Customer Page';
    renderPage();
  }
}

function renderPage(dateSelected) {
  if (currentPage === 'Welcome Page') {
    renderWelcomePage();
  } else if (currentPage === 'Manager Page') {
    renderManagerPage();
  } else if (currentPage === 'Customer Page') {
    renderCustomerPage();
  } else if (currentPage === 'Booking Page') {
    renderBookingPage(dateSelected);
  } else if (currentPage === 'Customer Page Manager View') {
    renderManagerCustomerPage();
  }
}

function renderManagerPage() {
  let today = manager.getToday();
  let todaysRooms = manager.findTotalRoomsForDate(today);
  let todaysRevenue = manager.findTotalRevenueForDate(today);
  let percentFilled = manager.findPercentageOfRoomsOccupied(today);
  $('main').html(`
    <section class="manager-widget">
      <h2>Total Rooms Available</h2>
      <h1>${todaysRooms}<h1>
    </section>>
    <section class="manager-widget">
      <h2>Total Revenue</h2>
      <h1>$${todaysRevenue}<h1>
    </section>
    <section class="manager-widget">
      <h2>Percentage Rooms Occupied</h2>
      <h1>${percentFilled}%<h1>
    </section>
    <section class="manager-widget">
      <h2>Search for Customer</h2>
      <div>
        <label for="customer-name">Customer Name:</label>
        <input class="username" id="customer-name" name="Username"></input>
      </div>
      <button id="find-customer-info">Find Customer Info</button>
    </section>
  `)
}

function renderWelcomePage() {
  $('main').html(`
    <form class="welcome-widget" type="text">
      <div>
        <label for="username-input">Username:</label>
        <input class="username" id="username-input" name="Username" placeholder="Username" value="manager"></input>
      </div>
      <div>
        <label for="password-input">Password:</label>
        <input class="password" name="Password" placeholder="Password" id="password-input" value="overlook2019"></input>
      </div>
      <button class="login">Enter Information</button>
      <p class="login-error"></p>
    </form>
  `)
}

function renderCustomerPage() {
  let mySpending = customer.findTotalSpent();
  $('main').html(`
    <section class="customer-widget">
      <h2 class="widget-title">Bookings I've Made</h2>
      <div class="booking-scroll">
        <ul class="booking-list"></ul>
      </div>
    </section>
    <section class="customer-widget" >
      <h2 class="widget-title">Amount I've Spent</h2>
      <h1>$${mySpending}</h1>
    </section>
    <section class="customer-widget" >
      <h2 class="widget-title">Make a Booking</h2>
      <form type="text">
        <input name="calendar" id="datepicker" placeholder="Select a Date"></input>
        <button type="button" id="find-rooms" class="find-rooms">Find Available Rooms</button>
      </form>
    </section>`);
    // $('#find-rooms').click(showAvailableRooms);
  addDatePicker();
  showBookings();
}

function renderManagerCustomerPage() {
  let mySpending = customer.findTotalSpent();
  $('main').html(`
    <section class="customer-widget">
      <h2 class="widget-title">Bookings I've Made</h2>
      <div class="booking-scroll">
        <ul class="booking-list"></ul>
      </div>
    </section>
    <section class="customer-widget">
      <h2 class="widget-title">Amount I've Spent</h2>
      <h1>$${mySpending}</h1>
    </section>
    <section class="customer-widget">
      <h2 class="widget-title">Make a Booking</h2>
      <form type="text">
        <input name="calendar" id="datepicker" placeholder="Select a Date"></input>
        <button type="button" id="find-rooms" class="find-rooms">Find Available Rooms</button>
      </form>
    </section>`);
    // $('#find-rooms').click(showAvailableRooms);
  addDatePicker();
  showBookings('manager');
}

function showAvailableRooms() {
  let dateSelected = $('#datepicker').val();
  customer.date = $('#datepicker').val();
  currentPage = 'Booking Page';
  renderPage(dateSelected);
}

function renderBookingPage(dateSelected) {
  $('main').html(`
    <section class="booking-widget">
      <h2 class="widget-title">Available Rooms</h2>
      <h3>Select Room by Style:</h3>
      <form>
        <input name="radio-button" type="radio" data-name="single room">Single Room</input>
        <input name="radio-button" type="radio" data-name="junior suite">Junior Suite</input>
        <input name="radio-button" type="radio" data-name="residential suite">Residential Suite</input>
        <input name="radio-button" type="radio" data-name="suite">Suite</input>
        <button id="filter-rooms" type="button">Filter Rooms</button>
      </form>
      <div class="booking-scroll">
        <ul class="available-list"></ul>
      </div>
    </section>> 
  `)
  showAvailableRoomInfo(dateSelected);
  // $('#filter-rooms').click(findFilterChoice);
  // $('.book-room').click(getRoomToBook)
}


function showBookings(userType) {
  let myBookings = customer.findMyBookings();
  if (userType === 'manager') {
    myBookings.forEach(booking => {
      $('.booking-list').append(`
      <h2 class="delete-date">${booking.date}</h2>
      <h3 class="delete-room">Room ${booking.roomNumber}</h3>
      <button class="delete-booking" data-confirmID="${booking.id}" >Delete Booking</button>
      `)
    })
  } else {
    myBookings.forEach(booking => {
      $('.booking-list').append(`
      <h2>${booking.date}</h2>
      <h3>Room ${booking.roomNumber}</h3>
      `)
    })
  }
}

function showAvailableRoomInfo(dateSelected) {
  customer.selectedDateRooms = customer.findAvailableRooms(dateSelected);
  customer.selectedDateRooms.forEach(room => {
    $('.available-list').append(`
    <h3>Room Number: ${room.number}</h3>
    <h3>Room Type: ${room.roomType}</h3>
    <h3>Bed Size: ${room.bedSize}</h3>
    <h3>Number of Beds: ${room.numBeds}</h3>
    <h3>Nightly Price: $${room.costPerNight}</h3>
    <button class="book-room" type="button" data-number="${room.number}">Book this Room</button>
    `)
  })
  if (customer.selectedDateRooms.length === 0) {
    $('.available-list').append(`
      <h2 class="error">We apologize!</h2>
      <h3 class="error">It looks like the dungeons are full that day...</h3>
      <button class="return-customer">Go Back to Where it's a Little Less Spooky...</button>
    `)
  }
}

function filterRooms(unfilteredRooms, type) {
  let filteredRooms = unfilteredRooms.filter(room => room.roomType === type);
  $('.available-list').html('');
  filteredRooms.forEach(room => {
    $('.available-list').append(`
    <h3>Room Number: ${room.number}</h3>
    <h3>Room Type: ${room.roomType}</h3>
    <h3>Bed Size: ${room.bedSize}</h3>
    <h3>Number of Beds: ${room.numBeds}</h3>
    <h3>Nightly Price: $${room.costPerNight}</h3>
    <button type="button" class="book-room" data-number="${room.number}">Book this Room</button>
    `)
  })
}

function addDatePicker() {
  flatpickr("#datepicker", {
    dateFormat: "Y/m/d"
  });
} 

function findFilterChoice() {
  let roomType = $('input[name=radio-button]:checked').attr('data-name');
  filterRooms(customer.selectedDateRooms, roomType);
}

function getRoomToBook(paramTarget) {
  let chosenRoom = paramTarget.data('number');
  postNewBooking(customer.id, customer.date, chosenRoom);
  currentPage = 'Customer Page';
  renderPage();
}

function getBookingToDelete(paramTarget) {
  let chosenBookingID = paramTarget.data('confirmID');
  deleteBooking(chosenBookingID);
  currentPage = 'Manager Page';
  renderPage();
}

function postNewBooking(id, date, room) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: id,
      date: date,
      roomNumber: room
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

function deleteBooking(id) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
    })
  })
  .then(response => response)
  .then(data => console.log(data))
  .catch(err => console.log(err));
}

function goToCustomerInfo(name) {
  let userID = manager.findUserID(name);
  customer = new Customer({ id: userID, name: name }, userData, bookingData, roomData);
  currentPage = 'Customer Page Manager View';
  renderPage();
}

function fireClickEvents() {
  if (event.target.id === 'filter-rooms') {
    findFilterChoice();
  } else if ($(event.target).hasClass('book-room')) {
    let paramTarget = $(event.target);
    getRoomToBook(paramTarget);
  } else if (event.target.id === 'find-rooms') {
    showAvailableRooms();
  } else if (event.target.id === 'find-customer-info') {
    let name = $('#customer-name').val();
    goToCustomerInfo(name);
  } else if ($(event.target).hasClass('delete-booking')) {
    let paramTarget = $(event.target);
    getBookingToDelete(paramTarget);
  }
}