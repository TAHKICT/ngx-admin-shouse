import {Component, Input, OnInit} from '@angular/core';
import {NodesEventsService} from "../../../@core/services/nodes.events.service";
import { TSMap } from "typescript-map"
import {NodesWebSocketService} from "../../../@core/services/nodes.web-socket.service";
import {PowerSocketEventMessage} from "../../../@core/models/power-socket.event.message";

@Component({
  selector: 'ngx-power-socket-node',
  styleUrls: ['./power-socket.component.scss'],
  template: `
      <nb-card (click)="clickEvent()" [ngClass]="{'off': !on}">
        <div class="icon-container">
          <div class="icon {{ type }}">
            <ng-content></ng-content>
            <i class="fa fa-plug"></i>
          </div>
        </div>
  
        <div class="details">
          <div class="title">{{ powerSocketNode.description }}</div>
          <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
        </div>
      </nb-card>
  `,
})
export class PowerSocketComponent implements OnInit{

  @Input() powerSocketNode;
  private type = 'primary';
  private on = false;
  private nodeId: number;

  constructor (private nodesEventService: NodesEventsService,
               private nodesWebSocketService: NodesWebSocketService){}

  ngOnInit(): void {
    this.on = this.powerSocketNode.isSwitched == 'true' ? true : false;
    this.nodeId = this.powerSocketNode.id;

    this.nodesWebSocketService.powerSocketIncomeCalled$.subscribe(
      (message) => {
        let powerSocketMessage = message as PowerSocketEventMessage;
        console.log('powerSocketMessage: ' + powerSocketMessage.nodeId + ' ' + powerSocketMessage.isSwitched + '.this.nodeId: ' + this.nodeId);
        if(powerSocketMessage.nodeId == this.nodeId){
          console.log('this.on = powerSocketMessage.isSwitched;')
          this.on = powerSocketMessage.isSwitched;
        }
      }
    );
  }

  private clickEvent(){
    let params = new TSMap();
    params.set('nodeId', this.powerSocketNode.id);
    params.set('nodeTypeName', this.powerSocketNode.nodeTypeName)
    params.set('isSwitched', !this.on);
    this.nodesEventService.processNodeEvent(params.toJSON());
  }
}
