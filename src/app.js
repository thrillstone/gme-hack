export class App {
  message = 'Hello World!';
  activate() {
    this.players = [];
    this.session = new Paho.MQTT.Client("mr1mep4ha6mvat.messaging.solace.cloud", Number(8443), "leaderboard");
    this.session.onMessageArrived = (msg) => {
      console.log(msg.payloadString.split("|||"));
      const data = msg.payloadString.split("|||");
      data.forEach((item, i) => {
        if (i === data.length - 1) {
          return;
        }
        if (i % 2 === 0) {
          const index = i / 2;
          if (index > this.players.length - 1) {
            this.players.push({
              name: item
            });
          } else {
            this.players[index].name = item;
          }
        } else {
          this.players[(i - 1)/2].value = item;
        }
      });
    };
    this.session.connect({
      userName: "objective-pike",
      password: "qpVct2Qc6",
      onSuccess: () => {
        this.session.subscribe("iot/objective-pike/leaderboard");
      }
    });
    
  }
}
