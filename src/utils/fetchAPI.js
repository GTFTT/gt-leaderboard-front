/**
 * This file contains important function for communication with api serever
 */

// vendor
import _ from 'lodash';
import qs from 'qs';

// export const API = 'http://localhost:8000';
export const API = 'https://gt-leaderboard-api.herokuapp.com';

class ResponseError extends Error {
    constructor(response, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = 'Response Error';
        this.response = response;
        this.status = status || 500;
    }
}

/**
 * This function is used to make server request. It automatically handles all transformations and, set authorization token and get aut tiken
 * @param {*} method    - request method, one of: "POST", "PUT", "GET", etc.
 * @param {*} endpoint  - request endpoint, for example: '/users'
 * @param {*} [ query ] - query parameters in form of js object: {myParam: "text", queryFilter: "bla"}, null if no value
 * @param {*} [ body ]  - js object for some methods, null if no body
 * 
 * @param {*} [ options = {} ]        - additional options for request
 * @param {*} [ options.rawResponse ] - Do not transform received response into json and return as is
 */
export async function fetchAPI(method, endpoint = '', query = {}, body = {}, options = {}) {
    const { rawResponse = false } = options;

    const omittedQuery = _.omitBy( query, value => _.isString(value) && _.isEmpty(value)); //Remove empty strings

    const queryString = qs.stringify(omittedQuery, {
        skipNulls:   true,
        arrayFormat: 'repeat',
    });

    const request = {
        method,
        headers: {
            'content-type':                   'application/json',
            'Access-Control-Request-Headers': '*',
        },
    };

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        request.body = JSON.stringify(body);
    }

    const response = await fetch.apply(null, [ `${API}${endpoint}${queryString ? `?${queryString}` : ''}`, request, ...arguments ]);

    const { status } = response;

    switch (true) {
        case status >= 200 && status < 300:
            return rawResponse ? await response : await response.json();
        default:
            throw new ResponseError(await response.json(), status);
    }
}
