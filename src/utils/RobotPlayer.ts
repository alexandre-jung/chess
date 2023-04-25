import { Command } from '../history/interfaces';
import { ChessBoard } from '../chessboard';
import { ChessHistory } from '../history';

export class RobotPlayer {
  private current = 0;
  private readonly commands: Command[];
  private readonly chessboard: ChessBoard;
  #intervalInMs = 0;

  constructor(history: ChessHistory, chessboard: ChessBoard) {
    this.commands = history.getAll();
    this.chessboard = chessboard;
  }

  get intervalInMs(): number {
    return this.#intervalInMs;
  }

  set intervalInMs(intervalInMs: number) {
    this.#intervalInMs = intervalInMs;
  }

  play = async () => {
    if (this.current < this.commands.length) {
      console.log(`playing ${this.current}th / ${this.commands.length} move`);
      const command = this.commands[this.current++];
      command.execute(this.chessboard);
      setTimeout(this.play, this.#intervalInMs);
    }
  };
}
