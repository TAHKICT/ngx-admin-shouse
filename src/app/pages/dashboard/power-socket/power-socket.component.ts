import {Component, Input, OnInit} from '@angular/core';
import {NodesEventsService} from "../../../@core/services/nodes.events.service";
import { TSMap } from "typescript-map"

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

  constructor (private nodesEventService: NodesEventsService){}

  ngOnInit(): void {
    this.on = this.powerSocketNode.isSwitched == 'true' ? true : false;
  }

  private clickEvent(){
    let params = new TSMap();
    params.set('nodeId', this.powerSocketNode.id);
    params.set('nodeTypeName', this.powerSocketNode.nodeTypeName)
    params.set('isSwitched', !this.on);
    this.nodesEventService.processNodeEvent(params.toJSON());
  }
}
