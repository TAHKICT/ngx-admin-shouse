import {Component} from "@angular/core";

@Component({
  selector: 'ngx-power-socket-node1',
  styleUrls: ['./power-socket.component.scss'],
  template: `
    <div class="col-xxxl-3 col-md-6">
      <ngx-status-card title="Light" type="primary">
        <i class="nb-lightbulb"></i>
      </ngx-status-card>
    </div>
  `,
})
export class LightSwitchComponent{

}
