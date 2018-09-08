import {Component, Input, OnInit} from '@angular/core';
import {NodesEventsService} from '../../../@core/services/nodes.events.service';
import {NodesWebSocketService} from '../../../@core/services/nodes.web-socket.service';
import {TSMap} from 'typescript-map';
import {LightSwitchEventMessage} from '../../../@core/models/light-switch.event.message';

@Component({
  selector: 'ngx-light-switch-node',
  styleUrls: ['./light-switch.component.scss'],
  template: `
    <nb-card (click)="clickEvent()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
          <i [ngClass]="{'nb-lightbulb' : !inProcess, 'ion-load-a animated-spinner' : inProcess}"></i>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ lightSwitchNode.description }}</div>
        <div class="status">{{ status }}</div>
      </div>
    </nb-card>
  `,
})
export class LightSwitchComponent implements OnInit {

  @Input() lightSwitchNode;
  private on: boolean;
  private inProcess: boolean;
  type = 'primary';
  private nodeId: number;
  status: string;

  constructor (private nodesEventService: NodesEventsService,
               private nodesWebSocketService: NodesWebSocketService) {}

  ngOnInit(): void {
    this.on = this.lightSwitchNode.switched;
    this.nodeId = this.lightSwitchNode.id;
    this.inProcess = this.lightSwitchNode.inProcess;

    this.nodesWebSocketService.lightSwitchIncomeCalled$.subscribe(
      (message) => this.processEventMessage(message),
    );


    this.generateStatus();
  }

  private processEventMessage(message: LightSwitchEventMessage) {
    console.log('processEventMessage: ' + message.nodeId + ' ' + message.turnedOn);
    if (message.nodeId === this.nodeId) {
      this.on = message.turnedOn;
      this.generateStatus();
    }
  }

  private clickEvent() {
    // this.inProcess = true;
    this.on = !this.on;
    console.log('clickEvent: Current state:: ' + this.on + '. Requested state: ' + !this.on);
    const params = new TSMap();
    params.set('nodeId', this.lightSwitchNode.id);
    params.set('nodeTypeName', this.lightSwitchNode.nodeTypeName);
    params.set('requestedState', this.on === true ? 'on' : 'off');
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
