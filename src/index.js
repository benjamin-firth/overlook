// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/scooby-doo.jpg'

import Hotel from './Hotel';

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

let hotel;

Promise.all([userData, bookingData, roomData])
  .then(allData => {
    userData = allData[0];
    bookingData = allData[1];
    roomData = allData[2];
    hotel = new Hotel(userData, bookingData, roomData);
    console.log(hotel);
  })

$('.login').on('click', login);

function login(e) {
  e.preventDefault();
  $('.login-error').text('');
  if ($('.password').val() !== 'overlook2019') {
    return $('.login-error').text('Password Incorrect!').addClass('error');
  }
  if ($('.username').val() === 'manager') {
    window.location = "./manager-deck.html";
  } else {
    window.location = "./user-deck.html";
  }
}