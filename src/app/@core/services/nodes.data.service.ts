import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NodesDataService {
  // Make observable incoming node message event
  private dataIsReadyCallSource = new Subject<any>();
  public dataIsReadyCalled$ = this.dataIsReadyCallSource.asObservable();

  private allNodes = [];
  private dataReady = false;

  constructor(private httpClient: HttpClient){
    this.init();
  }

  private init(){
    this.loadNodes().subscribe(loadedNodes => {
      this.getInProgessNodesIds().subscribe( inProcessNodesIds =>{
          loadedNodes.forEach(function (node) {
            inProcessNodesIds.forEach( function (nodeId) {
                      if(node.id == nodeId) {
                        node.inProcess = true;
                      }
                    });
                  });

          this.allNodes = loadedNodes;
          this.dataReady = true;
          this.dataIsReadyCallSource.next();
          console.log('loaded nodes:');
          console.log(loadedNodes);
      });
    });
  }

  private loadNodes(): Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:8282/web-rest-api/user/admin-ui/content/get-nodes');
  }

  private getInProgessNodesIds(){
    return  this.httpClient.get<any[]>('http://localhost:8282/web-rest-api/user/admin-ui/content/get-in-process-nodes-id-list');
  }

  public getNodesByType(type){
    console.log('getNodesByType: ' + type);
    console.log('this.allNodes:');
    console.log(this.allNodes);
    let typedNodes = [];

    this.allNodes.forEach(function (node) {
      if(node.nodeTypeName == type){
        typedNodes.push(node);
      }});

    return typedNodes;
    // return this.addInProcessFlag(typedNodes);
  }

  public isDataReady(){
    return this.dataReady;
  }


}
