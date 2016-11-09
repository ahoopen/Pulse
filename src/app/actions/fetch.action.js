import { checkHttpStatus, parseJSON } from '../utils';

export const receiveProtectedData = (response) => ({
    type: FETCH_PROTECTED_DATA,
    payload: response
});

/**
 * Fetches protected data.
 * Authorization json-webtoken is send
 *
 * @param token json webtoken
 * @returns {function(*, *)}
 */
export const fetchData = (token) => {

    return (dispatch, state) => {
        return fetch('/api/intern/', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(pushState(null, '/login'));
                }
            })
    }

};
