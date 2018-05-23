import {Component, OnInit} from "@angular/core";
import {NodesDataService} from "../../../@core/services/nodes.data.service";

@Component({
  selector: 'ngx-power-sockets-area',
  styleUrls: ['./power-sockets-area.component.scss'],
  template: `
    <div class="row">
      <ngx-switched-node
        *ngFor="let node of nodes"
        [node]="node"
        type="primary"
        ngClass="col-xxxl-3 col-md-6">
        <i class="fa fa-plug"></i>
      </ngx-switched-node>      
    </div>
  `
})
export class PowerSocketsAreaComponent implements OnInit{
  nodes  = [];

  constructor(private nodesDataService: NodesDataService){}

  ngOnInit(): void {
    this.nodes = this.nodesDataService.getNodes('PowerSocketNode');
  }
}
