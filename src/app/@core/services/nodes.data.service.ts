import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NodesDataService {

  private allNodes = [];
  private activeNodes = [];
  private nodesAreLoaded = false;

  constructor(private httpClient: HttpClient){}

  getNodesByType(type){
    let typedNodes = [];

    this.httpClient.get<any[]>('http://localhost:8282/web-rest-api/user/admin-ui/content/get-nodes')
      .subscribe(nodes => {
        this.allNodes = nodes;

        this.allNodes.forEach(function (node) {
          if(node.nodeTypeName == type){
            typedNodes.push(node);
          }
        });

        this.nodesAreLoaded = true;
      }, () => {}, () => { });

    return typedNodes;
  }
}
