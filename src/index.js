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
    <button class="login-return">Logout</button> 
  `)
}

function renderWelcomePage() {
  $('main').html(`
    <form type="text">
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
    </section>
    <button class="login-return">Logout</button>`);
    $('#find-rooms').click(showAvailableRooms);
  addDatePicker();
  showBookings();
}

function showAvailableRooms() {
  let dateSelected = $('#datepicker').val();
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
  $('#filter-rooms').click(findFilterChoice);
}

function showBookings() {
  let myBookings = customer.findMyBookings();
  myBookings.forEach(booking => {
    $('.booking-list').append(`
      <h2>${booking.date}</h2>
      <h3>Room ${booking.roomNumber}</h3>
    `)
  })
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
    <button type="button">Book this Room</button>
    `)
  })
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
    <button type="button">Book this Room</button>
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
