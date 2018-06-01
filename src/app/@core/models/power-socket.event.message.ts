export class PowerSocketEventMessage{
  nodeId: number;
  isSwitched: boolean;
  inProcess: boolean;

  constructor(nodeId, isSwitched, inProcess){
    this.nodeId = nodeId;
    this.isSwitched = isSwitched;
    this.inProcess = inProcess;
  }
}
