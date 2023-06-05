
const ws = new WebSocket(`ws://${location.hostname}:7000`);

// if (ws) {
//   ws.onerror = ws.onopen = ws.onclose = null;
//   ws.close();
// }

ws.onerror = function () {
  showMessage('WebSocket error');
};

ws.onopen = function () {
  showMessage('WebSocket connection established');
};

ws.onmessage = function(event) {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
};

ws.onclose = function () {
  showMessage('WebSocket connection closed');
  ws = null;
};

function isObject(obj) {
  return obj && obj.constructor && obj.constructor === Object;
}

export function sendMessage(type, data) {
  const msg = {
    type: type,
    text: data,
    id: 1,
    date: Date.now(),
  };
  if (!ws) {
    return;
  }
  ws.send(JSON.stringify(msg));
}

export default ws;