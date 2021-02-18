/**
 * Returns a promise where the data is the rep log collection
 *
 * @return {Promise<Response>}
*/

function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(response => {
            return response.json();
        });
}

export function createRepLog(repLog) {
    return fetchJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`, {
        method: 'DELETE'
    })
}

export function getRepLogs() {
    return fetchJson('/reps')
        .then((data) => data.items);
}