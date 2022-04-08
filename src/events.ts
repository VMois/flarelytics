import Storage, { RawEvent } from "./storage";


const Events = async (request: any) => {
    const headers = { 
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
    };

    const event: RawEvent = await request.json();
    console.log("Received event: ", event);

    const storage = new Storage();
    await storage.init();
    
    try {
        await storage.saveEvent(event)
        return new Response("", { headers })
    } catch (error) {
        console.log(`Error. Couldn't store event: ${error}`)
        return new Response("", { status: 500 })
    }
};

export default Events;
