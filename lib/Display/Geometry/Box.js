import { DisplayContainer } from "../Display";

export class Box extends DisplayContainer {
  render(context) {
    context.save();
    context.translate(this.x, this.y);
    this.proxyOptions(context);
    context.rect(0, 0, this.width, this.height);
    if (this.option.fillStyle) {
      context.fill();
    }
    if (this.option.strokeStyle) {
      context.stroke();
    }
    context.restore();
  }
}
