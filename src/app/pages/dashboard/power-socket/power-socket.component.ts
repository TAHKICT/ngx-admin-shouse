import {Component, Input, OnInit} from '@angular/core';
import {NodesEventsService} from '../../../@core/services/nodes.events.service';
import { TSMap } from 'typescript-map';
import {NodesWebSocketService} from '../../../@core/services/nodes.web-socket.service';
import {PowerSocketEventMessage} from '../../../@core/models/power-socket.event.message';

@Component({
  selector: 'ngx-power-socket-node',
  styleUrls: ['./power-socket.component.scss'],
  template: `
      <nb-card (click)="clickEvent()" [ngClass]="{'off': !on}">
        <div class="icon-container">
          <div class="icon {{ type }}">
            <ng-content></ng-content>
            <i [ngClass]="{'fa fa-plug' : !inProcess, 'ion-load-a animated-spinner' : inProcess}"></i>
          </div>
        </div>
        <div class="details">
          <div class="title">{{ powerSocketNode.description }}</div>
          <div class="status">{{ status }}</div>
        </div>
      </nb-card>
  `,
})
export class PowerSocketComponent implements OnInit {

  @Input() powerSocketNode;
  private on: boolean;
  private inProcess: boolean;
  type = 'primary';
  private nodeId: number;
  status: string;

  constructor (private nodesEventService: NodesEventsService,
               private nodesWebSocketService: NodesWebSocketService){}

  ngOnInit(): void {
    this.on = this.powerSocketNode.switched;
    this.nodeId = this.powerSocketNode.id;
    this.inProcess = this.powerSocketNode.inProcess;

    this.nodesWebSocketService.powerSocketIncomeCalled$.subscribe(
      (message) => this.processEventMessage(message)
    );


    this.generateStatus();
  }

  private processEventMessage(powerSocketMessage: PowerSocketEventMessage) {
    if (powerSocketMessage.nodeId === this.nodeId) {
      this.on = powerSocketMessage.isSwitched;
      this.inProcess = powerSocketMessage.inProcess;
      this.generateStatus();
    }
  }

  private clickEvent() {
    this.inProcess = true;
    console.log('clickEvent: Current state:: ' + this.on + '. Requested state: ' + !this.on);
    let params = new TSMap();
    params.set('nodeId', this.powerSocketNode.id);
    params.set('nodeTypeName', this.powerSocketNode.nodeTypeName)
    params.set('isSwitched', !this.on);
    this.nodesEventService.processNodeEvent(params.toJSON());

    this.generateStatus();
  }

  private generateStatus() {
    if (this.inProcess) {
      this.status = 'IN PROCESS'
    }else {
      this.status = this.on ? 'ON' : 'OFF';
    }
  }
}
