let headers: { [header: string]: string } = {
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
}

const Options = () => {
    if (ENVIRONMENT == "dev") {
        headers['Access-Control-Allow-Origin'] = '*'
        return new Response("", { headers })
    } else {
        return new Response("", { status: 500 })
    }
};

export default Options;
