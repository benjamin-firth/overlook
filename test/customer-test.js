import chai, { expect } from 'chai';
import spies from 'chai-spies';

import Customer from '../src/Customer';

chai.use(spies);

let dataUsers, dataBookings, dataRooms, customer;

describe('Customer Class testing', function() {
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
          date: "2019/11/15",
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
    customer = new Customer({ id: 1, name: 'Fred' }, dataUsers, dataBookings, dataRooms)
    chai.spy.on(customer, 'findCustomerBookings', () => {
      return [
        {
          id: 1572293130159,
          userID: 1,
          date: "2019/11/15",
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
    })
  })

  it('should have an ID', function() {
    expect(customer.id).to.equal(1);
  })

  it('should have a name', function() {
    expect(customer.name).to.equal('Fred');
  })

  it('should show bookings for customer', function() {
    expect(customer.findMyBookings()).to.deep.equal(
      [
        {
          date: "2019/11/15",
          id: 1572293130159,
          roomNumber: 4,
        },
        {
          date: "2019/11/22",
          id: 1572293130160,
          roomNumber: 1,
        }
      ]
    )
  })

  it('should show total money spent from all bookings for user', function() {
    expect(customer.findTotalSpent()).to.equal(787.84);
  })

  
})