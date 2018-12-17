export class DisplayContainer {
  constructor(options) {
    this.option = { ...options };
    this.option.x = options.x | 0;
    this.option.y = options.y | 0;
    this.width = this.option.width;
    this.height = this.option.height;
    this.children = [];
    this.parent = null;
    this.zIndex = 0;
    this.name = this.option.name;
    this._x = this.option.x; //相对坐标
    this._y = this.option.y;
  }

  set x(value) {
    return this._setX(value, this.option.x);
  }

  get x() {
    return this._setX(0, this.option.x);
  }

  set y(value) {
    return this._setY(value, this.option.y);
  }

  get y() {
    return this._setY(0, this.option.y);
  }

  _setX(value, x) {
    let obj = this;
    let xx = x;
    while (obj.parent && "x" in obj.parent) {
      xx += obj.parent.x;
      obj = obj.parent;
    }
    return xx + value;
  }
  _setY(value, y) {
    let obj = this;
    let yy = y;
    while (obj.parent && "y" in obj.parent) {
      yy += obj.parent.y;
      obj = obj.parent;
    }
    return yy + value;
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
    child.parent = this;
    this.children.splice(zIndex, 0, child);
  }

  removeChild(child) {
    const index = this.children.findIndex(c => c === child);
    child = null;
    this.children.splice(index, 1);
  }

  removeChildAt(zIndex) {
    const idx = this.children.findIndex(child => child.zIndex === zIndex);
    child = null;
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

  proxyOptions(context) {
    Object.keys(this.option).forEach(key => {
      if (key in context) context[key] = this.option[key];
    });
  }

  render(context) {
    context.save();
    this.proxyOptions(context);
    context.translate(this.x, this.y);
    context.fillStyle = "transparent";
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
  }

  toString() {
    return {
      ...this.option,
      children: this.children,
      parent: this.parent,
      zIndex: this.zIndex
    };
  }
}
