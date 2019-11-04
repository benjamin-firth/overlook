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
$('.login-return').on('click', console.log({hotel}));

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

function renderPage() {
  if (currentPage === 'Welcome Page') {
    renderWelcomePage();
  } else if (currentPage === 'Manager Page') {
    renderManagerPage();
  } else if (currentPage === 'Customer Page') {
    renderCustomerPage();
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
    <button class="login-return">Return to Main Page</button> 
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
  showBookings();
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
      </form>
    </section>
    <button class="login-return">Return to Main Page</button> 
  `)
  addDatePicker();
  showBookings();
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

function addDatePicker() {
  flatpickr("#datepicker", {
    dateFormat: "Y/m/d"
  });
} 