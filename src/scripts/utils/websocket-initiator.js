import WebsocketNotif from './websocket-notif';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);

    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    try {
      console.log('websocket onmessage handler => ', message);
      const payload = JSON.parse(message.data);
      const reviewData = JSON.parse(localStorage.getItem(payload.reviewNotificationId));

      if (!reviewData) {
        throw new Error('is not review message');
      }

      WebsocketNotif.sendNotification({
        title: reviewData.name,
        options: {
          body: reviewData.review,
          icon: 'icons/192x192.png',
          image: reviewData.image,
          vibrate: [200, 100, 200],
        },
      });

      localStorage.removeItem(payload.reviewNotificationId);
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
