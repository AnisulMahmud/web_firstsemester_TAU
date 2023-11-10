/**
 * DO NOT EDIT THIS FILE!
 *
 * Grader will use its own special and different version of this file
 * and your changes to this file are not used in the grading process.
 * All your code should go into the file "messages-as-json.js"
 */

function fetchUserData() {
  const API_URL = 'http://localhost:3000/';

  // Callback to handle the response
  const handleResponse = (response) => {
    const contentType = response.headers.get('content-type');

    if (!contentType.includes('application/json')) {
      // server sent something else than JSON
      throw new Error(`Sorry, content-type '${contentType}' not supported`);
    }

    if (!response.ok) {
      // server sent error status code (4xx or 5xx)
      return new Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }

    // NOTE: intentionally return unparsed text and leave parsing as an exercise
    //       normally we would return JSON directly with "return response.json();"
    return response.text();
  };

  // fetch user data from the server
  fetch(API_URL, { headers: { Accept: 'application/json' } })
    .then(handleResponse)
    .then((jsonText) => {
      // dispatch custom event with the fetched data
      document.dispatchEvent(
        new CustomEvent('userDataReady', {
          detail: { jsonText },
          bubbles: true,
          cancelable: false
        })
      );
    })
    .catch((error) => {
      // handle any errors (log and inform user)
      console.error(error);
      alert(`Failed to load user data from ${API_URL}. Is the server running?`);
    });
}

