import * as Realm from 'realm-web';

declare global {
    const REALM_APPID: string;
    const REALM_API_TOKEN: string;
    const ENVIRONMENT: string;
    const DB_NAME: string;
}

type Document = globalThis.Realm.Services.MongoDB.Document;
type RawEventCollection = globalThis.Realm.Services.MongoDB.MongoDBCollection<RawEvent>;

export interface RawEvent extends Document {
    tracking_id: string
    domain: string
    page: string
    state: string
    timestamp: Date
}

export default class Storage {
    events: RawEventCollection;
    
    async init() {
        const App = new Realm.App(REALM_APPID);
        const credentials = Realm.Credentials.apiKey(REALM_API_TOKEN);
        const user = await App.logIn(credentials);
        this.events = user.mongoClient('mongodb-atlas').db(DB_NAME).collection<RawEvent>('events');
    }

    async saveEvent(event: RawEvent) {
        await this.events.insertOne({
            "tracking_id": event.tracking_id,
            "domain": event.domain,
            "page": event.page,
            "state": event.state,
            "timestamp": new Date(),
        })
    }

    async getEventsByTrackingId(): Promise<any> {
        const query = [
            {
                $sort: {timestamp: 1},
            },
            {
                $group: { 
                    _id: { tracking_id: "$tracking_id"}, 
                    events: { $push: "$$ROOT" }, 
                }
            },
        ]
        return await this.events.aggregate(query);
    }
}