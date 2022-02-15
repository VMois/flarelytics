// TODO: more flexible way to build it with right URL
const serverURL = "http://localhost:8787"

function sendEvent(id, state) {
    let data = {
        "id": id,
        "page": window.location.pathname,
        "state": state,
    }
    fetch(`${serverURL}/api/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true,
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function logState(state) {
    console.log(`Flarelytics: page is ${state}`)
}

function startTracking() {
    tracking_id = crypto.randomUUID()

    if (document.visibilityState == "visible") {
        state = "visible"
        logState(state)
        sendEvent(tracking_id, state)
    }

    document.addEventListener("visibilitychange", () => {
        let new_state = ""
        if (document.visibilityState === "visible") {
            new_state = "visible"
        } else if (document.visibilityState === "hidden") {
            new_state = "hidden"
        }

        if (new_state != state) {
          state = new_state
          logState(state)
          sendEvent(tracking_id, state)
        }
    });

    window.addEventListener("pagehide", event => {
        if (!event.persisted) {
            state = "closed"
            logState(state)
            sendEvent(tracking_id, state)
        }
    }, false);
}


setTimeout(startTracking, 10 * 1000);