import faunadb from 'faunadb';

declare global {
    const FAUNA_SECRET: string;
}

export const faunaClient = new faunadb.Client({
    secret: FAUNA_SECRET,
});

export const getFaunaError = (error: any) => {
    const { code, description } = error.requestResult.responseContent.errors[0];
    let status;

    switch (code) {
        case 'instance not found':
            status = 404;
            break;
        case 'instance not unique':
            status = 409;
            break;
        case 'permission denied':
            status = 403;
            break;
        case 'unauthorized':
        case 'authentication failed':
            status = 401;
            break;
        default:
            status = 500;
    }

    return { code, description, status };
}
