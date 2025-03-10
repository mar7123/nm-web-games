export class Coordinate {
  private _x: number;
  private _y: number;

  public constructor({ x = 0, y = 0 }: { x?: number; y?: number }) {
    this._x = x;
    this._y = y;
  }

  public get x(): number {
    return this._x;
  }

  public SetX = (x: number) => {
    this._x = x;
  };

  public get Y(): number {
    return this._y;
  }
  public SetY = (y: number) => {
    this._y = y;
  };

  public toJSON(): object {
    return {
      x: this._x,
      y: this._y,
    };
  }

  public static fromJSON(json: any): Coordinate {
    return new Coordinate({ x: json.x, y: json.y });
  }
}
