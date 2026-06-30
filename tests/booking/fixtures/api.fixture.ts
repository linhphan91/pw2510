import { test as base, type Page } from '@playwright/test';

type ApiFixtures = {
    token : string;
    url: string;
    bookingid: string;
}

export const test = base.extend<ApiFixtures> ({
    token: async ({ request }, use) => {
        const authenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
                data: {
                    username: 'admin',
                    password: 'password123'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            const authData = await authenResponse.json()
            const token = authData.token;
            await use(token);
    },

    bookingid: async ({ request }, use) => {
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
            const bookings = await response.json();
            // const randomIndex = Math.floor(Math.random() * bookings.length);
            // const bookingId = bookings[randomIndex].bookingid;
            const bookingId = bookings.bookingid;
            await use(bookingId);
    },
    url: 'https://restful-booker.herokuapp.com'
})

export const expect = test.expect;