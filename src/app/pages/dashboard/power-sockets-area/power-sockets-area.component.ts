import {Component, OnInit} from "@angular/core";
import {NodesService} from "../../../@core/data/nodes.service";

@Component({
  selector: 'ngx-power-sockets-area',
  styleUrls: ['./power-sockets-area.component.scss'],
  template: `
    <div class="row">
      <ngx-power-socket-node
        *ngFor="let node of nodes"
        [powerSocketNode]="node"
        ngClass="col-xxxl-3 col-md-6">
        <i class="nb-lightbulb"></i>
      </ngx-power-socket-node>
    </div>
  `
})
export class PowerSocketsAreaComponent implements OnInit{
  nodes : Array<any>;

  constructor(private nodesService: NodesService){}

  ngOnInit(): void {
    this.nodes = this.nodesService.getAllNodes();
  }
}
