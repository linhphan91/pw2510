// C R U D (Create - Retrieve - Update - Delete)
import { test, expect } from '@playwright/test';
import { z } from 'zod'

test('get all bookings', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');

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

test('get booking by id', async ({ request }) => {
    const bookingId = 1;
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
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

test('create a new booking', async ({ request }) => {
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

    const response = await request.post('https://restful-booker.herokuapp.com/booking/', {
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

test('update a booking', async ({ request }) => {
    //get auth token
    const authenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    expect(authenResponse.status()).toBe(200);
    const authData = await authenResponse.json()
    const token = authData.token;

    //get an existing booking id
    const bookingsResponse = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(bookingsResponse.status()).toBe(200);
    const bookings = await bookingsResponse.json();
    // expect(bookings.length).toBeGreaterThan(0);
    // const bookingId = bookings[0].bookingid;

    /*
    get random booking id
    */
    const randomIndex = Math.floor(Math.random() * bookings.length);
    const bookingId = bookings[randomIndex].bookingid;

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

    const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
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




