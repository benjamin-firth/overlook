import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';

let dataUsers, dataBookings, dataRooms, hotel;

describe('Hotel Class testing', function() {
  beforeEach(() => {
    dataBookings = 
      [
        {
          id: 1572293130156,
          userID: 19,
          date: "2019/11/06",
          roomNumber: 18,
          roomServiceCharges: [ ]
      },
        {
          id: 1572293130159,
          userID: 21,
          date: "2019/11/12",
          roomNumber: 8,
          roomServiceCharges: [ ]
        },
        {
          id: 1572293130159,
          userID: 19,
          date: "2019/10/29",
          roomNumber: 10,
          roomServiceCharges: [ ]
        },
        {
          id: 1572293130159,
          userID: 1,
          date: "2019/11/22",
          roomNumber: 4,
          roomServiceCharges: [ ]
        },
        {
          id: 1572293130160,
          userID: 16,
          date: "2019/11/06",
          roomNumber: 7,
          roomServiceCharges: [ ]
        },
        {
          id: 1572293130160,
          userID: 1,
          date: "2019/11/22",
          roomNumber: 1,
          roomServiceCharges: [ ]
        }
      ];
    
    dataUsers = 
      [
        {
          id: 1,
          name: "Leatha Ullrich"
        },
        {
          id: 2,
          name: "Rocio Schuster"
        },
        {
          id: 3,
          name: "Kelvin Schiller"
        },
        {
          id: 4,
          name: "Kennedi Emard"
        },
        {
          id: 5,
          name: "Rhiannon Little"
        }
      ];

    dataRooms = 
      [
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4
        },
        {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38
        },
        {
          number: 3,
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 491.14
        },
        {
          number: 4,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 429.44
        },
        {
          number: 5,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 340.17
        }
      ];
    hotel = new Hotel(dataUsers, dataBookings, dataRooms);
  })
  
  
  
  it('should return a date', function() {
    expect(hotel.getToday()).to.have.length(10);
  });

  it('should return all bookings for a specific user', function() {
    expect(hotel.findCustomerBookings(1)).to.deep.equal(
      [
        {
          id: 1572293130159,
          userID: 1,
          date: "2019/11/22",
          roomNumber: 4,
          roomServiceCharges: [ ]
        },
        {
          id: 1572293130160,
          userID: 1,
          date: "2019/11/22",
          roomNumber: 1,
          roomServiceCharges: [ ]
        }
      ]
    );
  })
  
  it('should return available rooms for a date', function() {
    expect(hotel.findAvailableRooms('2019/11/22')).have.length(3);
  })

});