import { Coordinate } from "./coordinate";
import { PuckState } from "./puck_state";
import { Velocity } from "./velocity";

export class PaddleState extends PuckState {
  private _id: string;

  public constructor({
    id,
    coordinate = new Coordinate({}),
    velocity = new Velocity({}),
  }: {
    id: string;
    coordinate?: Coordinate;
    velocity?: Velocity;
  }) {
    super({ coordinate: coordinate, velocity: velocity });
    this._id = id;
  }

  public get id(): string {
    return this._id;
  }

  public toJSON(): object {
    return {
      id: this._id,
      ...super.toJSON(),
    };
  }

  public static fromJSON(json: any): PaddleState {
    const parent: PuckState = PuckState.fromJSON(json);
    return new PaddleState({
      id: json.id,
      coordinate: parent.coordinate,
      velocity: parent.velocity,
    });
  }
}
