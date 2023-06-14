import WebsocketNotif from './websocket-notif';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);

    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message);
    try {
      const reviewData = JSON.parse(message.data);

      if (typeof reviewData === 'string') {
        throw new Error('is not review message');
      }

      WebsocketNotif.sendNotification({
        title: reviewData.name,
        options: {
          body: reviewData.review,
          icon: 'icons/192x192.png',
          image: 'https://i.ibb.co/nBh3jrM/roompy-android-web.png',
          vibrate: [200, 100, 200],
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
};

const sendDataToWebsocket = (reviewData) => {
  const data = JSON.stringify(reviewData);

  socket.send(data);
};

export { WebSocketInitiator, sendDataToWebsocket };
