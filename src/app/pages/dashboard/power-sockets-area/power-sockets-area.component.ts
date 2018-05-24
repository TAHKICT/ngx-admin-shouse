import {Component, OnInit} from "@angular/core";
import {NodesDataService} from "../../../@core/services/nodes.data.service";

@Component({
  selector: 'ngx-power-sockets-area',
  styleUrls: ['./power-sockets-area.component.scss'],
  template: `
    <div class="row">
      <ngx-power-socket-node
        *ngFor="let node of powerSocketNodes"
        [powerSocketNode]="node"
        type="primary"
        ngClass="col-xxxl-3 col-md-6">
      </ngx-power-socket-node>      
    </div>
  `
})
export class PowerSocketsAreaComponent implements OnInit{
  powerSocketNodes  = [];

  constructor(private nodesDataService: NodesDataService){}

  ngOnInit(): void {
    this.powerSocketNodes = this.nodesDataService.getNodes('PowerSocketNode');
  }
}
