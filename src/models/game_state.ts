import { PaddleState } from "./paddle_state";
import { PuckState } from "./puck_state";

export class GameState {
  private _id: string;
  private _puck: PuckState = new PuckState({});
  private _paddle1: PaddleState | null = null;
  private _paddle2: PaddleState | null = null;
  private _score1: number = 0;
  private _score2: number = 0;

  public constructor({
    id,
    puck = new PuckState({}),
    paddle1,
    paddle2,
    score1 = 0,
    score2 = 0,
  }: {
    id: string;
    puck?: PuckState;
    paddle1?: PaddleState | null;
    paddle2?: PaddleState | null;
    score1?: number;
    score2?: number;
  }) {
    this._id = id;
    this._puck = puck;
    this._paddle1 = paddle1 ?? null;
    this._paddle2 = paddle2 ?? null;
    this._score1 = score1;
    this._score2 = score2;
  }

  public get id(): string {
    return this._id;
  }

  public get puck(): PuckState {
    return this._puck;
  }

  public SetPuck = (puck: PuckState) => {
    this._puck = puck;
  };

  public get paddle1(): PaddleState | null {
    return this._paddle1;
  }

  public SetPaddle1 = (paddle1: PaddleState) => {
    this._paddle1 = paddle1;
  };

  public get paddle2(): PaddleState | null {
    return this._paddle2;
  }

  public SetPaddle2 = (paddle2: PaddleState) => {
    this._paddle2 = paddle2;
  };

  public get score1(): number {
    return this._score1;
  }

  public SetScore1 = (score1: number) => {
    this._score1 = score1;
  };

  public get score2(): number {
    return this._score2;
  }

  public SetScore2 = (score2: number) => {
    this._score2 = score2;
  };

  public toJSON(): object {
    return {
      id: this._id,
      puck: this._puck,
      paddle1: this._paddle1,
      paddle2: this._paddle2,
      score1: this._score1,
      score2: this._score2,
    };
  }

  public static fromJSON(json: any): GameState {
    return new GameState({
      id: json.id,
      puck: PuckState.fromJSON(json.puck),
      paddle1: json.paddle1 != null ? PaddleState.fromJSON(json.paddle1) : null,
      paddle2: json.paddle2 != null ? PaddleState.fromJSON(json.paddle2) : null,
      score1: json.score1,
      score2: json.score2,
    });
  }
}
