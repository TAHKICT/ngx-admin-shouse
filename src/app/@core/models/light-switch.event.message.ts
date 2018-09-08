export class LightSwitchEventMessage {
  nodeId: number;
  turnedOn: boolean;

  constructor(nodeId, turnedOn) {
    this.nodeId = nodeId;
    this.turnedOn = turnedOn;
  }
}
