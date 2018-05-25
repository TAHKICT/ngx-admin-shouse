import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NodesDataService implements OnInit{

  private allNodes = [];
  private activeNodes = [];
  private nodesAreLoaded = false;

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.loadAllNodes();
  }

  private loadAllNodes() {

    this.httpClient.get<any[]>('http://localhost:8282/web-rest-api/user/admin-ui/content/get-nodes')
      .subscribe(nodes => this.allNodes = nodes, () => {}, () => {
        this.allNodes.forEach(function (node) {
          if(node.active == true){
            this.activeNodes.push(node);
          }
        })
        console.log("allNodes size: " + this.allNodes.length);
        console.log("activeNodes size: " + this.activeNodes.length);
        this.nodesAreLoaded = true;
      });
  }

  getNodes(){
      return this.allNodes;
  }

  getNodesByType(type){
    console.log('get nodes by type')
    let typedNodes = [];
    this.allNodes.forEach(function (node) {
      if(node.nodeTypeName == type){
        typedNodes.push(node);
      }
    })
    return typedNodes;
  }
}
