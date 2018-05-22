import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-power-socket-node',
  styleUrls: ['./power-socket.component.scss'],
  template: `
    <!--<div class="col-xxxl-3 col-md-6">-->
      <nb-card (click)="on = !on" [ngClass]="{'off': !on}">
        <div class="icon-container">
          <div class="icon {{ type }}">
            <ng-content></ng-content>
          </div>
        </div>
  
        <div class="details">
          <div class="title">{{ powerSocketNode.description }}</div>
          <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
        </div>
      </nb-card>
    <!--</div>-->
  `,
})
export class PowerSocketComponent implements OnInit{

  @Input() powerSocketNode;
  @Input() type = 'primary';
  @Input() on: boolean;

  @Input() title: string;

  ngOnInit(): void {
    this.title = 'Light';
    this.on = this.powerSocketNode.switched == 'true' ? true : false;
  }
}
