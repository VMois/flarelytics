
import Storage, {Event} from './storage'
import Env from './env'

const calculateTimeOnPage = (events: [Event]): number => {
    let time_on_page = 0;
    let visible_timestamp: Date | undefined = undefined;
    for (const event of events) {
        if (event.state == "visible") {
            visible_timestamp = event.timestamp
        }

        if (event.state == "hidden") {
            if (visible_timestamp !== undefined) {
                time_on_page += Math.round(event.timestamp.getTime() - visible_timestamp.getTime())
            }
        }
     }
     return time_on_page
};

const calculateMedian = (numbers: number[]): number => {
    const sorted = Array.from(numbers).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}


const Statistics = async (_: Request, env: Env): Promise<Response> => {
    const headers = {
        "Content-type": "application/json",
    };

    const storage = new Storage();
    await storage.init(env);

    const events_by_tracking_id = await storage.getEventsByTrackingId();

    const page_to_times_on_page: { [page: string]: number[] } = {};
    for (const item of events_by_tracking_id) {
        const events = item.events;

        if (events.length > 0) {
            const timeOnPage = Math.round(calculateTimeOnPage(events) / 1000);
            const page = events[0].page
            if (page_to_times_on_page[page] === undefined) {
                page_to_times_on_page[page] = []
            }
            page_to_times_on_page[page].push(timeOnPage);
        }
    }

    const median: { [page: string]: number } = {}
    for (const page in page_to_times_on_page) {
        median[page] = calculateMedian(page_to_times_on_page[page]);
    }
    const results = {
        "time_on_page": median,
    }
    return new Response(JSON.stringify(results, null, 2), { headers });
}

export default Statistics;
