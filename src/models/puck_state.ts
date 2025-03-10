import { Coordinate } from "./coordinate";
import { Velocity } from "./velocity";

export class PuckState {
  private _coordinate: Coordinate;
  private _velocity: Velocity;

  public constructor({
    coordinate = new Coordinate({}),
    velocity = new Velocity({}),
  }: {
    coordinate?: Coordinate;
    velocity?: Velocity;
  }) {
    this._coordinate = coordinate;
    this._velocity = velocity;
  }

  public get coordinate(): Coordinate {
    return this._coordinate;
  }

  public get velocity(): Velocity {
    return this._velocity;
  }

  public toJSON(): object {
    return {
      coordinate: this._coordinate,
      velocity: this._velocity,
    };
  }

  public static fromJSON(json: any): PuckState {
    return new PuckState({
      coordinate: Coordinate.fromJSON(json.coordinate),
      velocity: Velocity.fromJSON(json.velocity),
    });
  }
}
