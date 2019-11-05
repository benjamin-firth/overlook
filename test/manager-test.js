import chai from 'chai';
const expect = chai.expect;

import Manager from '../src/Manager';

let dataUsers, dataBookings, dataRooms, manager;

describe('Manager class testing', function() {
  beforeEach(() => {
    dataBookings = 
    [
      {
        id: 1572293130156,
        userID: 19,
        date: "2019/11/06",
        roomNumber: 1,
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
        date: "2019/11/15",
        roomNumber: 4,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 16,
        date: "2019/11/22",
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
        number: 7,
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
    manager = new Manager({ id: 100, name: 'John Adams'}, dataUsers, dataBookings, dataRooms)
  })

  it('should have an ID', function() {
    expect(manager.id).to.equal(100);
  });

  it('should have a name', function() {
    expect(manager.name).to.equal('John Adams');
  })

  it('should find total amount of available rooms for a given date', function() {
    expect(manager.findTotalRoomsForDate("2019/11/22")).to.equal(3);
  })

  it('should find total revenue for a given date', function() {
    expect(manager.findTotalRevenueForDate("2019/11/22")).to.equal(849.54);
  })

  it('should find percentage of occupied rooms on a given date', function() {
    expect(manager.findPercentageOfRoomsOccupied("2019/11/22")).to.equal(40);
  })

  it('should find any user id', function() {
    expect(manager.findUserID("Kennedi Emard")).to.equal(4);
  })
});