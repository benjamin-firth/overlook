// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

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
    // const totalRooms = manager.findTotalRoomsForDate(hotel.today);
    currentPage = 'Manager Page';
    renderPage();
  } else {
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
    <form>
    <div>
      <label>Username:</label>
      <input class="username" name="Username" placeholder="Username" value="manager"></input>
    </div>
    <div>
      <label>Password:</label>
      <input class="password" name="Password" placeholder="Password" value="overlook2019"></input>
    </div>
    <button class="login">Enter Information</button>
    <p class="login-error"></p>
    </form>
  `)
}

function renderCustomerPage() {
  $('main').html(`
    <section>
     <h2>My Room Bookings</h2>
    </section>
    <section>
      <h2>Total Amount Spent</h2>
    </section> 
    <button>Return to Main Page</button> 
  `)
}