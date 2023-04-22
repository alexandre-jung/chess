import ChessCoordinates from '../ChessCoordinates';

export interface ChessBoardActor {
  move (from: ChessCoordinates, to: ChessCoordinates): void;
}

export interface Command {
  execute (actor: ChessBoardActor): void;
  undo (actor: ChessBoardActor): void;
}
