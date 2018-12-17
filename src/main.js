import { Stage, Box, DisplayContainer } from "../lib";

export class MainStage extends Stage {
  initState() {
    super.initState();
    this.container = new DisplayContainer({
      name: "container1",
      x: 10,
      y: 10,
      width: 200,
      height: 200,
      fillStyle: "#00f"
    });
    this.box1 = new Box({
      name: "box1",
      x: 50,
      y: 10,
      width: 100,
      height: 100,
      fillStyle: "#0f0"
    });
    this.box2 = new Box({
      name: "box2",
      x: 20,
      y: 20,
      width: 20,
      height: 20,
      fillStyle: "#f00",
      strokeStyle: "#0f0"
    });
  }

  didMount() {
    super.didMount();
    this.appendChild(this.container);
    this.container.appendChild(this.box2);
    this.container.appendChild(this.box1);
    console.log(this.box2.x);
  }
}
