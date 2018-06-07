import {Injectable} from "@angular/core";
import {Observable, Subscription} from "rxjs/Rx";
import {Message} from '@stomp/stompjs';
import {StompService, StompState} from '@stomp/ng2-stompjs';
import {Subject} from 'rxjs/Subject';
import {AppConfig} from "../../config/app.config";
import {PowerSocketEventMessage} from "../models/power-socket.event.message";
import {NodesEventsService} from "./nodes.events.service";

@Injectable()
export class NodesWebSocketService{

  // Make observable incoming node message event
  private nodeMessageIncomeCallSource = new Subject<any>();
  nodeMessageIncomeCalled$ = this.nodeMessageIncomeCallSource.asObservable();

  // Make observable incoming power socket message event
  private powerSocketIncomeCallSource = new Subject<PowerSocketEventMessage>();
  powerSocketIncomeCalled$ = this.powerSocketIncomeCallSource.asObservable();

  constructor (private _stompService: StompService,
               private config: AppConfig) {}

  public init(){
    console.log('NodesWebSocketService init');
    this.subscribe();
  }

  private subscription: Subscription;
  private messages: Observable<Message>; //stream of messages
  private subscribed: boolean; //subscription status

  private subscribe() {
    if (this.subscribed) {
      return;
    }

    this.messages = this._stompService.subscribe(this.config.get('WebSocket').Node.QueueToReceive);
    this.subscription = this.messages.subscribe(this.on_next);

    this._stompService.state
      .subscribe((state: number) => {
        console.log(`Stomp connection status: ${StompState[state]}`);
        if(state == 2){
          this.subscribed = true;
          this.sendEvent({"whichNodesInProcess" : 111});
        }
      });
  }

  //a function to be run on_next message
  private on_next = (message: Message) => {
    let mess = JSON.parse(message.body);

    if(mess.global === 'Server started'){
      console.log('Server started');
    }

    if(JSON.parse(message.body).recipientOfTheMessage === "node"){
      console.log('Got web socket message for nodeId: ' + JSON.parse(message.body).nodeId);
      this.nodeMessageIncomeCallSource.next(JSON.parse(message.body));
    }


    if(JSON.parse(message.body).type === "nodesInProcess"){
      console.log('Nodes in process: ' + JSON.parse(message.body));
      this.powerSocketIncomeCallSource.next(new PowerSocketEventMessage(JSON.parse(message.body).nodeId, false, true));
    }

    if(JSON.parse(message.body).nodeTypeName === this.config.get('Nodes').PowerSocket.type) {
      let isSwitched = false;
      if(JSON.parse(message.body).isSwitched == true || JSON.parse(message.body).isSwitched == 'true'){
        isSwitched = true;
      }
      this.powerSocketIncomeCallSource.next(new PowerSocketEventMessage(JSON.parse(message.body).nodeId, isSwitched, false));
    }
  }

  public sendNodeChangeMessage(nodeId, value) {
    console.log('send');
    let message = (value === true) ? JSON.stringify({nodeId: nodeId, value: 'checked'}) : JSON.stringify({nodeId: nodeId, value: 'unchecked'});
    this._stompService.publish(this.config.get('WebSocket').Node.QueueToPublish, message);
    // this._stompService.publish('/s-house-rest-api-web-websocket/to-server', message);
  }

  public sendEvent(message) {
    console.log('send event params through WEB socket: ' + message);
    this._stompService.publish(this.config.get('WebSocket').Node.QueueToPublish, JSON.stringify(message));
  }
}
