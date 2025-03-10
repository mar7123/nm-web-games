export class Velocity {
  private _vX: number;
  private _vY: number;

  public constructor({ vX = 0, vY = 0 }: { vX?: number; vY?: number }) {
    this._vX = vX;
    this._vY = vY;
  }

  public get vX(): number {
    return this._vX;
  }

  public SetVX = (vX: number) => {
    this._vX = vX;
  };

  public get vY(): number {
    return this._vY;
  }
  public SetVY = (vY: number) => {
    this._vY = vY;
  };

  public toJSON(): object {
    return {
      vX: this._vX,
      vY: this._vY,
    };
  }

  public static fromJSON(json: any): Velocity {
    return new Velocity({ vX: json.vX, vY: json.vY });
  }
}
