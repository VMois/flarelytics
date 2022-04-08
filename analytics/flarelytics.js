const domain = window.location.hostname.replace("www.", "");
let serverURL = "https://flarelytics.vmois.dev";
if (domain == "localhost" || domain == "127.0.0.1") {
    serverURL = "http://localhost:8787"
}

function sendEvent(id, state) {
    let data = {
        "tracking_id": id,
        "domain": domain,
        "page": window.location.pathname,
        "state": state,
    }
    fetch(`${serverURL}/event`, {
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
}


setTimeout(startTracking, 10 * 1000);