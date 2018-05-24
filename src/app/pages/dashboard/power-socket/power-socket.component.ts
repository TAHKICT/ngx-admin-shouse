import {Component, Input, OnInit} from '@angular/core';

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

  ngOnInit(): void {
    this.on = this.powerSocketNode.switched == 'true' ? true : false;
  }

  private clickEvent(){
    this.on = !this.on;
  }
}
