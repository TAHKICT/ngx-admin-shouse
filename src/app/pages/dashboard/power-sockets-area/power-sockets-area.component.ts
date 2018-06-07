import {Component, OnInit} from "@angular/core";
import {NodesDataService} from "../../../@core/services/nodes.data.service";
import {AppConfig} from "../../../config/app.config";

@Component({
  selector: 'ngx-power-sockets-area',
  styleUrls: ['./power-sockets-area.component.scss'],
  template: `
    <div class="row">
      <ngx-power-socket-node
        *ngFor="let node of powerSocketNodes"
        [powerSocketNode]="node"
        ngClass="col-xxxl-3 col-md-6">
      </ngx-power-socket-node>      
    </div>
  `
})
export class PowerSocketsAreaComponent implements OnInit{
  private powerSocketNodes  = [];
  private nodeTypeName;

  constructor(private nodesDataService: NodesDataService,
              private appConfig: AppConfig){}

  ngOnInit(): void {
    this.nodeTypeName = this.appConfig.get('Nodes').PowerSocket.type;

    if(this.nodesDataService.isDataReady()) {
      console.log('this.nodesDataService.isDataReady()');
      this.powerSocketNodes = this.nodesDataService.getNodesByType(this.nodeTypeName);
    }else{
      console.log('this.nodesDataService.isDataReady()-------------');
      this.nodesDataService.dataIsReadyCalled$.subscribe(
        () => {
          this.powerSocketNodes = this.nodesDataService.getNodesByType(this.nodeTypeName);
          console.log('this.powerSocketNodes:');
          console.log(this.powerSocketNodes);
        }
      );
    }
  }
}
