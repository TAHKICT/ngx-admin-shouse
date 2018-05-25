import {Injectable} from "@angular/core";
import {NodesWebSocketService} from "./nodes.web-socket.service";

@Injectable()
export class NodesEventsService{

  constructor(private nodesWebSocketService: NodesWebSocketService){}

  processNodeEvent(eventParamsInJSON){
    this.nodesWebSocketService.sendEvent(eventParamsInJSON);
  }

}
