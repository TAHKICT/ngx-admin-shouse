import {Injectable} from "@angular/core";
import {Observable, Subscription} from "rxjs/Rx";
import {Message} from '@stomp/stompjs';
import {StompService} from '@stomp/ng2-stompjs';
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
    // this.messages = this._stompService.subscribe('/to-user/messages');
    this.subscription = this.messages.subscribe(this.on_next);
    this.subscribed = true;
  }

  //a function to be run on_next message
  private on_next = (message: Message) => {

    if(JSON.parse(message.body).nodeTypeName === this.config.get('Nodes').PowerSocket.type) {
      console.log('make powerSocketMessage object')
      let powerSocketMessage = new PowerSocketEventMessage(JSON.parse(message.body).nodeId, JSON.parse(message.body).isSwitched);
      // this.nodesEventService.powerSocketEvent(powerSocketMessage);
      this.powerSocketIncomeCallSource.next(powerSocketMessage);
    }
    //
    // let mess = JSON.parse(message.body);
    // console.log('Received web socket message: ' + JSON.parse(message.body).nodeId);
    // console.log('Received web socket message: ' + JSON.parse(message.body).nodeTypeName);
    // console.log('Received web socket message: ' + JSON.parse(message.body).isSwitched);
    // console.log('Received web socket message: ' + mess.nodeId);
    // console.log('Received web socket message: ' + mess.nodeTypeName);
    // console.log('Received web socket message: ' + mess.isSwitched);
    // this.nodeMessageIncomeCallSource.next({nodeMessage: mess});
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
