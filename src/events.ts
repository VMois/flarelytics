import {faunaClient, getFaunaError} from "./utils";
import faunadb from 'faunadb';

interface Event {
  id: string
  domain: string
  page: string
  state: string
}

const {Create, Collection} = faunadb.query;


const Events = async (request: any) => {
    const headers = { 
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    }

    const event: Event = await request.json()
    console.log("Received event: ", event)

    try {
        await faunaClient.query(
            Create(
            Collection("Events"),
            {
                data: {
                    "id": event.id,
                    "domain": event.domain,
                    "page": event.page,
                    "state": event.state,
                    "timestamp": Math.round(Date.now() / 1000),
                }
            }
            )
        );
        return new Response("", { headers })
    } catch (error) {
        const faunaError = getFaunaError(error);
        console.log(`Fauna query failed ${faunaError.description}`)
        return new Response("", { headers, status: faunaError.status})
    }
};

export default Events;