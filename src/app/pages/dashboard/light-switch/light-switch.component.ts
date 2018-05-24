import {Component, Input} from "@angular/core";

@Component({
  selector: 'ngx-light-switch-node',
  styleUrls: ['./light-switch.component.scss'],
  template: `
    <nb-card (click)="switchEvent()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ lightSwitchNode.description }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class LightSwitchComponent{

  @Input() lightSwitchNode;
  @Input() type = 'primary';
  @Input() on = false;

  private switchEvent(){
    this.on = !this.on;
  }
}
