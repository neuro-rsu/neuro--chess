(function () {
    const messages = document.querySelector('#messages');
    const wsButton = document.querySelector('#wsButton');
    const wsSendButton = document.querySelector('#wsSendButton');
    const logout = document.querySelector('#logout');
    const login = document.querySelector('#login');

    function showMessage(message) {
      messages.textContent += `\n${message}`;
      messages.scrollTop = messages.scrollHeight;
    }

    function handleResponse(response) {
      return response.ok
        ? response.json().then((data) => JSON.stringify(data, null, 2))
        : Promise.reject(new Error('Unexpected response'));
    }

    login.onclick = function () {
      // fetch('http://localhost:7000/login', { method: 'POST', credentials: 'same-origin' })
      fetch('http://localhost:7000/login', { method: 'POST' })
        .then(handleResponse)
        .then(showMessage)
        .catch(function (err) {
          showMessage(err.message);
        });
    };

    logout.onclick = function () {
      fetch('http://localhost:7000/login', { method: 'GET'})
        .then(handleResponse)
        .then(showMessage)
        .catch(function (err) {
          showMessage(err.message);
        });
    };

    // logout.onclick = function () {
    //   fetch('/logout', { method: 'DELETE', credentials: 'same-origin' })
    //     .then(handleResponse)
    //     .then(showMessage)
    //     .catch(function (err) {
    //       showMessage(err.message);
    //     });
    // };

    let ws;

    wsButton.onclick = function () {
      if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
      }

      ws = new WebSocket(`ws://${location.hostname}:7000`);
      ws.onerror = function () {
        showMessage('WebSocket error');
      };
      ws.onopen = function () {
        showMessage('WebSocket connection established');
      };
      ws.onmessage = function(event) {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case "authOk":
            console.log(`id: ${msg.text}`);
            break;
          case "authError":
            console.log(`id: ${msg.text}`);
            break;
        }
      };

      ws.onclose = function () {
        showMessage('WebSocket connection closed');
        ws = null;
      };
    };

    wsSendButton.onclick = function () {
      const msg = {
        type: "id",
        text: "111",
        id: 111,
        date: Date.now(),
      };
      if (!ws) {
        showMessage('No WebSocket connection');
        return;
      }
      ws.send(JSON.stringify(msg));
    };
  })();