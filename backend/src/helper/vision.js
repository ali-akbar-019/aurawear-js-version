import vision from "@google-cloud/vision";

const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "ai-clothing-488112",
    "private_key_id": "1db6def08121d611ab99eb6636e8214e07adc666",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSFA9q+uDO8RDt\nmgzqcGmpBBSzEc0+PI6pD/RWo8eH+NjAH/dsscO26748QXs99e1K7Yoewno0POGs\nyHpL1xvvZZ+dXhUgubuuedyPgJsPBVNeKJV1OlLMcSCuFvWV/75/hZOGNvixqav3\nI8uJkypOATqzlHSBtrbodBzXIe9a6c8+302fWWF5q5B92PMk6dSTI6aP7rR3UsAY\nClg0uZJ0YJHZtsTYRLUNUZXkTs3absi+YGxFEolIlRfsUOglKgIsdCB9MOooP56F\nzMVa03lupKkTJjOjmch75ixrM8nhNlfBzHSuj6yg5KEeOjACOgOQDOBcSmw80JbR\nB9ms++LZAgMBAAECggEAC/LyJuPwMjUfVl8YdE6X4/IvJI79p+2VMQ6O7Pf8hcJk\nvxYnt6SrfNW53f7c01sP9968/XToXdzx+nxItdRIFXzSmwaFQyBCtEY1gmq5PHMm\nw8ihKlLP74BRGzXZGtgPbidwiwYeF9TjysyGwOOAWNbUZO8rv/kJkafmareBFXWe\nrP8UwcvOI8ShF8RVvyeMs1AFvF4ZgaQk43rjfE6f/uqgx3jOEFWLLjB1KtRv7dgU\ng7ozBMioBRWIHMxwOhxijQ0JJ5SfeGr3b8Wkrli3wx2BKmo8kcIqJMeZTJ91+QNI\nWcTX5aT9wKhorbo7qTMuAdjPZoJ8g2eFANcygllxEQKBgQDzVvpHtsF5op/B324d\nhhQCY/CncRqP27Rftx0oxFLW57iLm32ZgRnH82XWXHVGdxUF1bYiCM82Eef2BbAs\ntMCxy6YsLv6hSrhz0S8BPzkp22hSRVG21gKFEynHcWr26vlcYv8L3Vi4BYkx5QZE\nHyZUT/rNq70M/jyHTJ/HZq/hfQKBgQDdAhOl3NWI9aVC0FCt9gKVqu0O+wl9YKZ3\ner2v3zx57U8Qg8Bsb3uhaoZzMHnECENfEVFlNAV2NdB2yMMLnVQ7GsLE2qFr12LH\nWYv+ZCpiioS6EZuxnXHRo+f/gO6IKhf8jqITPJuyxWAmZR2TPibaj1W5dT9Dalhs\nETlBn45FjQKBgQDZn5jX1/7x/Fmp9lsxdj6g4KZR6Voa/B81VrtyQRng7n1iBZ5v\nUUEwTGJwMmIDse4QOM/ZYk2Gir8LjIzBfqmymHG1pBW/Q+bwVU0XbWZ/I6UJpsrs\nnDrGrpu3rZw+1WhLkpGMF9oHQZQwFiXjeIQ79QdVNtktLJYPXpyqpRB4tQKBgH/S\ng6qaXqYn7L0H3qG+dyA5C4Jujr6E98KCqtLdOg0Kw3+5s8EDeW2SPtDAaKyIWu7R\nBVKTE9WaqkcJNkWxaNYGVD+mc1X77JV/pQgsxpbXpow3QuUnOn0VX0jXOR5nuhfI\nJtUZaLOslD+gm8pdV/twixQIS96h0yItk//wWEjBAoGBAPD+rf420ianR3RRvyPd\n/asG7dtbHBX6LzoCPUoe2t6gBqJ2turZrbST55oIzPvmSo708MKfTggjcZvg4gUH\n1WGKLeIXq9ruwIy0DLstrrRJBkNpQSuduwltxm5R1ztopC4hHrHvdgQE+yw38Ihr\nxuqVM+ZFby1TjuhbtRRag7Pb\n-----END PRIVATE KEY-----\n",
    "client_email": "vision-api-service@ai-clothing-488112.iam.gserviceaccount.com",
    "client_id": "103342889309989358464",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/vision-api-service%40ai-clothing-488112.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
))

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
}
const client = new vision.ImageAnnotatorClient(CONFIG);

export default client;
