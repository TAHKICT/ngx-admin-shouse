export class PowerSocketEventMessage{
  nodeId: number;
  isSwitched: boolean;

  constructor(nodeId, isSwitched){
    this.nodeId = nodeId;
    this.isSwitched = isSwitched;
  }
}
