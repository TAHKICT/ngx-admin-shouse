import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-switched-node',
  styleUrls: ['./switched-node.component.scss'],
  template: `
    <nb-card (click)="switchEvent()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{  node.description  }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class SwitchedNodeComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  @Input() node;

  switchEvent(){
    console.log('switchEventddddd');
    this.on = !this.on;
  }
}
