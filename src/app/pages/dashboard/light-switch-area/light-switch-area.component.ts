import {Component, OnInit} from '@angular/core';
import {NodesDataService} from '../../../@core/services/nodes.data.service';
import {AppConfig} from '../../../config/app.config';

@Component({
  selector: 'ngx-light-switches-area',
  styleUrls: ['./light-switches-area.component.scss'],
  template: `
    <div class="row">
      <ngx-light-switch-node
        *ngFor="let node of lightSwitchNodes"
        [lightSwitchNode]="node"
        ngClass="col-xxxl-3 col-md-6">
      </ngx-light-switch-node>
    </div>
  `,
})
export class LightSwitchAreaComponent implements OnInit {
  lightSwitchNodes  = [];
  private nodeTypeName;

  constructor (private nodesDataService: NodesDataService,
              private appConfig: AppConfig) {}

  ngOnInit(): void {
    this.nodeTypeName = this.appConfig.get('Nodes').LightSwitch.type;

    if (this.nodesDataService.isDataReady()) {
      this.lightSwitchNodes = this.nodesDataService.getNodesByType(this.nodeTypeName);
    }else {
      this.nodesDataService.dataIsReadyCalled$.subscribe(
        () => {
          this.lightSwitchNodes = this.nodesDataService.getNodesByType(this.nodeTypeName);
        },
      );
    }
  }
}
