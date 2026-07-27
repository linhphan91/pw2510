import { test, expect } from '@playwright/test';
import { z } from 'zod'

test('get Status', async ({ request }) => {
    const response = await request.get('https://simple-tool-rental-api.click/status');
    expect(response.status()).toBe(200);
    const status = await response.json();

    //define schema
    const schema = z.object({
        status: z.string()
    })

    //verify schema
    expect(() => {
        schema.parse(status)
    }).not.toThrow();

    expect(status.status).toBe('UP');

})

test('get all tools', async ({ request }) => {
    const response = await request.get('https://simple-tool-rental-api.click/tools');

    //response status code is 200
    expect(response.status()).toBe(200);
    const tools = await response.json();
    expect(tools.length).toBeGreaterThan(0);
    console.log('Total tools:', tools)

    //define schema
    const schema = z.array(z.object({
        id: z.number(),
        category: z.string(),
        name: z.string(),
        inStock: z.boolean()

    }));

    //validate schema
    expect(() => {
        schema.parse(tools)
    }).not.toThrow();

});

test('get tool by id', async ({ request }) => {
    const toolId = 5774;
    const response = await request.get(`https://simple-tool-rental-api.click/tools/${toolId}`);
    expect(response.status()).toBe(200);
    const tool = await response.json();

    //define schema
    const schema = z.object({
        id: z.number(),
        category: z.string(),
        name: z.string(),
        inStock: z.boolean()
    })

    //verify schema
    expect(() => {
        schema.parse(tool)
    }).not.toThrow();
})

test('create an order', async ({ request }) => {
    const randomEmail = `johnlin+${Math.floor(Math.random() * 1000)}@mailinator.com`;
    const randomName = `John${Math.floor(Math.random() * 1000)}`;
    //register a new api client
    const requestPayload = {
        clientName: randomName,
        clientEmail: randomEmail
    }

    const authenResponse = await request.post('https://simple-tool-rental-api.click/api-clients', {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    });
   

    expect(authenResponse.status()).toBe(201);
    const authData = await authenResponse.json()
    const token = authData.accessToken;

    //create a new order
    const payload = {
        toolId: 5774,
        customerName: "John"
    }
    const response1 = await request.post('https://simple-tool-rental-api.click/orders', {
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response1.status()).toBe(201);
    const order = await response1.json();
    console.log('Order created:', order);

    //define schema
    const schema = z.object({
        created: z.boolean(),
        orderId: z.string()
    })

    //verify schema
    expect(() => {
        schema.parse(order)
    }).not.toThrow(); 
})

test('get all order', async ({ request }) => {
    const randomEmail = `johnlin+${Math.floor(Math.random() * 1000)}@mailinator.com`;
    const randomName = `John${Math.floor(Math.random() * 1000)}`;
    //register a new api client
    const requestPayload = {
        clientName: randomName,
        clientEmail: randomEmail
    }

    const authenResponse = await request.post('https://simple-tool-rental-api.click/api-clients', {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    });
   

    expect(authenResponse.status()).toBe(201);
    const authData = await authenResponse.json()
    const token = authData.accessToken;

    //get all orders
    const response1 = await request.get('https://simple-tool-rental-api.click/orders', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response1.status()).toBe(200);
    const order = await response1.json();
    

    //define schema
    const schema = z.array(z.object({
        orderId : z.string(),
        toolId : z.number(),
        customerName : z.string(),
        quantiy : z.number(),
        created: z.date(),
        comment: z.string()  
    }))

    //verify schema
    expect(() => {
        schema.parse(order)
    }).not.toThrow(); 
})

test('get an order', async ({ request }) => {
   const randomEmail = `johnlin+${Math.floor(Math.random() * 1000)}@mailinator.com`;
    const randomName = `John${Math.floor(Math.random() * 1000)}`;
    //register a new api client
    const requestPayload = {
        clientName: randomName,
        clientEmail: randomEmail
    }

    const authenResponse = await request.post('https://simple-tool-rental-api.click/api-clients', {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    })
   
    expect(authenResponse.status()).toBe(201);
    const authData = await authenResponse.json()
    const token = authData.accessToken;

    const payload = {
        toolId: 5774,
        customerName: "John"
    }
    const response1 = await request.post('https://simple-tool-rental-api.click/orders', {
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response1.status()).toBe(201);
    const orderResponse = await response1.json();
    const orderId = orderResponse.orderId;


    //get an order
    const response2 = await request.get(`https://simple-tool-rental-api.click/orders/${orderId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response2.status()).toBe(200);
    const order = await response2.json();

    //define schema
    const schema = z.object({
        orderId : z.string(),
        toolId : z.number(),
        customerName : z.string(),
        quantity : z.number(),
        created: z.string(),
        comment: z.string()
    })
       
    //verify schema
    expect(() => {
        schema.parse(order)
    }).not.toThrow(); 
})

test('update an order', async ({ request }) => {
    const randomEmail = `johnlin+${Math.floor(Math.random() * 1000)}@mailinator.com`;
    const randomName = `John${Math.floor(Math.random() * 1000)}`;
    const randomOrderId = 5774;
    //register a new api client
    const requestPayload = {
        clientName: randomName,
        clientEmail: randomEmail
    }

    const authenResponse = await request.post('https://simple-tool-rental-api.click/api-clients', {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    });
   

    expect(authenResponse.status()).toBe(201);
    const authData = await authenResponse.json()
    const token = authData.accessToken;

    const payLoad = {
        toolId: 5774,
        customerName: "John"
    }
    const response1 = await request.post('https://simple-tool-rental-api.click/orders', {
        data: payLoad,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response1.status()).toBe(201);
    const orderResponse = await response1.json();
    const orderId = orderResponse.orderId;

    //update a new order
    const payload = {
        customerName: randomName
    }
    const response2 = await request.patch(`https://simple-tool-rental-api.click/orders/${orderId}`, {
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response2.status()).toBe(204);
   
})

test('delete an order', async ({ request }) => {
    const randomEmail = `johnlin+${Math.floor(Math.random() * 1000)}@mailinator.com`;
    const randomName = `John${Math.floor(Math.random() * 1000)}`;
    const randomOrderId = 5774;
    //register a new api client
    const requestPayload = {
        clientName: randomName,
        clientEmail: randomEmail
    }

    const authenResponse = await request.post('https://simple-tool-rental-api.click/api-clients', {
        data: requestPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    });
   

    expect(authenResponse.status()).toBe(201);
    const authData = await authenResponse.json()
    const token = authData.accessToken;

    const payLoad = {
        toolId: randomOrderId,
        customerName: randomName
    }
    const response1 = await request.post('https://simple-tool-rental-api.click/orders', {
        data: payLoad,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response1.status()).toBe(201);
    const orderResponse = await response1.json();
    const orderId = orderResponse.orderId;

    //update a new order
    const payload = {
        customerName: randomName
    }
    const response2 = await request.delete(`https://simple-tool-rental-api.click/orders/${orderId}`, {
        data: payload,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        }
    })
    expect(response2.status()).toBe(204);
   
})