
const ws = new WebSocket(`ws://${location.hostname}:7000`);

// if (ws) {
//   ws.onerror = ws.onopen = ws.onclose = null;
//   ws.close();
// }


ws.onerror = function () {
  console.log(`WebSocket error`)
  ws?.dialog?.show('WebSocket error')
};

ws.onopen = function () {
  console.log(`WebSocket connection established`)
  ws?.dialog?.show(`WebSocket connection established`)
};

ws.onmessage = function(event) {
  const msg = JSON.parse(event.data)
  switch (msg.type) {
    case "authError":
      ws?.dialog?.show(`authError: ${msg.text}`)
      console.log(`authError: ${msg.text}`)
      break;
    case "authOк":
      // ws?.dialog?.show(`authOк: ${msg.text}`)
      // console.log(`authOк: ${msg.text}`)
      ws?.form?.authOk(msg)
      break;
    case "game":
        ws?.form?.gameFound(msg)
        console.log(`found: ${msg.text}`)
        break;
    case "step":
        ws?.gameForm?.step(msg)
        console.log(`step: ${msg.text}`)
        break;
    case "enemyStep":
        ws?.gameForm?.enemyStep(msg)
        console.log(`step: ${msg.text}`)
        break;
  }
}

ws.onclose = function () {
  console.log(`WebSocket connection closed`)
  ws?.dialog?.show(`WebSocket connection closed`)
  ws = null
}

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
  if (ws.readyState !== ws.OPEN) {
    return;
  }
  ws.send(JSON.stringify(msg));
}

export function setDialog(dialog) {
  ws.oldDialog = ws.dialog
  ws.dialog = dialog;
}

export function setForm(form) {
  ws.form = form
}

export function setGameForm(gameForm) {
  ws.gameForm = gameForm
}

export function repairDialog() {
  ws.dialog = ws.oldDialog
}

export function addGame(game) {
  ws.game = game
}

export function sendStep(step) {
  let message = {
    game: ws.game.game,
    user: ws.game.kind ? ws.game.whiteUser: ws.game.blackUser,
    enemy: !ws.game.kind ? ws.game.whiteUser: ws.game.blackUser,
    step: step
  }
  sendMessage('step', message);
}


export default ws;