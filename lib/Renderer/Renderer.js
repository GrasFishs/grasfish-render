export class Renderer {
  constructor(el, width = window.innerWidth, height = window.innerHeight) {
    this.el = el;
    this.canvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    el.innerHTML = "";
    el.appendChild(this.canvas);
  }

  appendChild(child) {
    child.parent = this;
    if (!child.zIndex) {
      child.zIndex = this.children.length;
    }
    if (!this.children.includes(child)) {
      this.children.push(child);
    }
  }

  appendChildAt(child, zIndex) {
    child.zIndex = zIndex;
    this.children.splice(zIndex, 0, child);
  }

  removeChild(child) {
    const index = this.children.findIndex(c => c === child);
    this.children.splice(index, 1);
  }

  removeChildAt(zIndex) {
    const idx = this.children.findIndex(child => child.zIndex === zIndex);
    if (idx) {
      this.children.splice(idx, 1);
    } else {
      this.children.splice(
        zIndex >= this.children.length
          ? this.children.length - 1
          : zIndex < 0
          ? 0
          : zIndex,
        1
      );
    }
  }

  initState() {
    this.children = [];
  }

  didMount() {}

  render() {
    //window.requestAnimationFrame(this.render.bind(this));
    this.context.clearRect(0, 0, this.width, this.height);
    this._traverRender(this, this.context);
  }

  _traverRender(obj, context) {
    if (obj.children.length > 0) {
      for (let child of obj.children) {
        child.render(context);
        console.log(child.name);
        this._traverRender(child, context);
      }
    }
    return;
  }

  toString() {
    return {
      name: "Render",
      children: this.children
    };
  }
}
