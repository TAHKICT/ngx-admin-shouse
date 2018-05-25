import {Component, OnInit} from "@angular/core";
import {NodesDataService} from "../../../@core/services/nodes.data.service";

@Component({
  selector: 'ngx-light-switches-area',
  styleUrls: ['./light-switches-area.component.scss'],
  template: `
    <div class="row">
      <ngx-light-switch-node
        *ngFor="let node of lightSwitchNodes"
        [lightSwitchNode]="node"
        type="primary"
        ngClass="col-xxxl-3 col-md-6">
        <i class="nb-lightbulb"></i>
      </ngx-light-switch-node>      
    </div>
  `
})
export class LightSwitchAreaComponent implements OnInit{
  lightSwitchNodes  = [];

  constructor(private nodesDataService: NodesDataService){}

  ngOnInit(): void {
    this.lightSwitchNodes = this.nodesDataService.getNodesByType('LightSwitchNode');
  }
}
