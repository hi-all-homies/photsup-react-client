import { AuthService } from "./auth-service";

let socket;
let isClosed = false;
let subscribers = [];

const handleMessage = (event) => {
    let message = JSON.parse(event.data);
    subscribers.forEach(sub => sub(message))
};

export const WebSocketService = {

    startListen(url){
        if (!socket || (socket.readyState === WebSocket.CLOSED)){
            let token = AuthService.getToken();
            socket = new WebSocket(`${url}?jwt=${token}`);
            isClosed = false;

            socket.onmessage = handleMessage;
            console.log('ws connection is open');
            
            socket.onclose = event => {
               if (!isClosed){
                this.startListen(url);
               }
            };
        }
    },

    stopListen(){
        isClosed = true;
        socket.close();
        subscribers = [];
        console.log('socket is closed')      
    },

    subscribe(callback){
        subscribers.push(callback);
        console.log('subscribing')
    },

    unsubscribe(callback){
        subscribers = subscribers.filter(sub => sub !== callback);
        console.log('unsubscribing..')
    }
}