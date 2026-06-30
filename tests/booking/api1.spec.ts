import {test, expect } from '../booking/fixtures/api.fixture'
import { z } from 'zod'

test('get all bookings', async ({ request , url}) => {
    const response = await request.get(`${url}/booking`);

    //expect (response.ok()).toBeTruthy(); //verify Status Code = 200 OK
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    expect(bookings.length).toBeGreaterThan(0);
    console.log('Total bookings:', bookings)

    //define schema
    const schema = z.array(z.object({
        bookingid: z.number(),
        id: z.string().optional()
    }));

    //validate schema
    expect(() => {
        schema.parse(bookings)
    }).not.toThrow();

});

test('get booking by id', async ({ request , url }) => {
    const bookingId = 1;
    const response = await request.get(`${url}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const booking = await response.json();

    //define schema
    const schema = z.object({
        firstname: z.string(),
        lastname: z.string(),
        totalprice: z.number(),
        depositpaid: z.boolean(),
        bookingdates: z.object({
            checkin: z.string(),
            checkout: z.string()
        }),
        additionalneeds: z.string().optional()
    })

    //verify schema
    expect(() => {
        schema.parse(booking)
    }).not.toThrow();

    //verify date time format with zod decode
    const bookingDates = booking.bookingdates;
    const dateSchema = z.object({
        checkin: z.string().refine(date => !isNaN(Date.parse(date)), {
            message: "Invalid date format"
        }),
        checkout: z.string().refine(date => !isNaN(Date.parse(date)), {
            message: "Invalid date format"
        })
    });

    expect(() => {
        dateSchema.parse(bookingDates)
    }).not.toThrow();

});

test('create a new booking', async ({ request , url }) => {
    const requestPayload = {
        firstname: "John",
        lastname: "Doe",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-11-01",
            checkout: "2026-11-05"
        },
        additionalneeds: "Breakfast"
    };

    const response = await request.post(`${url}/booking`, {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const schema = z.object({
        bookingid: z.number(),
        booking: z.object()
    });

    expect(response.status()).toBe(200);
    const createdBooking = await response.json();


    expect(() => {
        schema.parse(createdBooking);
    }).not.toThrow();

    const bookingData = createdBooking.booking;
    expect(bookingData).toMatchObject(requestPayload);

});

test('update a booking', async ({ request , url, bookingid, token }) => {
    //update booking by id
    const requestPayload = {
        firstname: "James",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: "2025-11-02",
            checkout: "2025-11-06"
        },
        additionalneeds: "Breakfast"
    }

    const response = await request.put(`${url}/booking/${bookingid}`, {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    expect(response.status()).toBe(200);
    const updatedBooking = await response.json();
    expect(updatedBooking).toMatchObject(requestPayload);

})

test('update part of current booking', async ({request , url, bookingid, token}) => {
    const requestPayload = {
        firstname: "John",
        lastname: "Cooper",  
    }

    const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    expect(response.status()).toBe(200);
    const updatedBooking = await response.json();
    expect(requestPayload.firstname).toBe(updatedBooking.firstname)
    expect(requestPayload.lastname).toBe(updatedBooking.lastname)
});

test('delete a booking', async ({request , url, bookingid, token}) => {
   
    const response = await request.delete(`${url}/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });

    expect(response.status()).toBe(201);
   const getresponse = await request.get(`${url}/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        }
    });
    expect (getresponse.status()).toBe(404);
  
});



