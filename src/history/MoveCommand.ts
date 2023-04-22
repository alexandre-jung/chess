import { ChessBoardActor, Command } from './interfaces';
import ChessCoordinates from '../ChessCoordinates';

export class MoveCommand implements Command {
  private readonly from: ChessCoordinates;
  private readonly to: ChessCoordinates;

  constructor (from: ChessCoordinates, to: ChessCoordinates) {
    this.from = from;
    this.to = to;
  }

  execute (actor: ChessBoardActor): void {
    actor.move(this.from, this.to);
  }

  undo (actor: ChessBoardActor): void {
    actor.move(this.to, this.from);
  }
}
