import {Injectable} from '@angular/core';

@Injectable()
export class NodesService {

  private nodes = [
    {
      id: 5,
      nodeTypeName: 'PowerSocketNode',
      nodeLocation: {
        nodeLocationId: 0,
        nodeLocationName: 'Kitchen',
      },
      description: 'ночной',
      switched: false,
      active: false,
    },
    {
      id: 3,
      nodeTypeName: 'PowerSocketNode',
      nodeLocation: {
        nodeLocationId: 0,
        nodeLocationName: 'Kitchen',
      },
      description: 'возле шкафа',
      switched: false,
      active: false,
    },
  ];

  constructor() { }

  public getAllNodes() {
    return this.nodes;
  }
}
