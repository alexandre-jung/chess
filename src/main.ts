import './style.css';

import {
  ChessBoard,
  ChessCoordinates,
  ChessPieceFactory,
  ChessPiecePicker,
} from './chessboard';
import { ChessHistory, MoveCommand } from './history';
import { RobotPlayer } from './utils';

const app = document.querySelector('#app');
if (!app) throw new Error('#app not found');

const chessboard = new ChessBoard();
const whitePicker = new ChessPiecePicker('white');
const blackPicker = new ChessPiecePicker('black');

app.appendChild(chessboard.element);
app.insertAdjacentElement('afterbegin', blackPicker.element);
app.insertAdjacentElement('beforeend', whitePicker.element);

const initialPlacement = [
  { coordinate: 'a1', piece: 'rook', color: 'white' },
  { coordinate: 'b1', piece: 'knight', color: 'white' },
  { coordinate: 'c1', piece: 'bishop', color: 'white' },
  { coordinate: 'd1', piece: 'queen', color: 'white' },
  { coordinate: 'e1', piece: 'king', color: 'white' },
  { coordinate: 'f1', piece: 'bishop', color: 'white' },
  { coordinate: 'g1', piece: 'knight', color: 'white' },
  { coordinate: 'h1', piece: 'rook', color: 'white' },
  { coordinate: 'a2', piece: 'pawn', color: 'white' },
  { coordinate: 'b2', piece: 'pawn', color: 'white' },
  { coordinate: 'c2', piece: 'pawn', color: 'white' },
  { coordinate: 'd2', piece: 'pawn', color: 'white' },
  { coordinate: 'e2', piece: 'pawn', color: 'white' },
  { coordinate: 'f2', piece: 'pawn', color: 'white' },
  { coordinate: 'g2', piece: 'pawn', color: 'white' },
  { coordinate: 'h2', piece: 'pawn', color: 'white' },
  { coordinate: 'a8', piece: 'rook', color: 'black' },
  { coordinate: 'b8', piece: 'knight', color: 'black' },
  { coordinate: 'c8', piece: 'bishop', color: 'black' },
  { coordinate: 'd8', piece: 'queen', color: 'black' },
  { coordinate: 'e8', piece: 'king', color: 'black' },
  { coordinate: 'f8', piece: 'bishop', color: 'black' },
  { coordinate: 'g8', piece: 'knight', color: 'black' },
  { coordinate: 'h8', piece: 'rook', color: 'black' },
  { coordinate: 'a7', piece: 'pawn', color: 'black' },
  { coordinate: 'b7', piece: 'pawn', color: 'black' },
  { coordinate: 'c7', piece: 'pawn', color: 'black' },
  { coordinate: 'd7', piece: 'pawn', color: 'black' },
  { coordinate: 'e7', piece: 'pawn', color: 'black' },
  { coordinate: 'f7', piece: 'pawn', color: 'black' },
  { coordinate: 'g7', piece: 'pawn', color: 'black' },
  { coordinate: 'h7', piece: 'pawn', color: 'black' },
];

const factory = new ChessPieceFactory(50);

for (const placement of initialPlacement) {
  const target = ChessCoordinates.fromString(placement.coordinate);
  const piece = factory.createAndGet(placement.color, placement.piece);
  chessboard.setPiece(piece, target);
}

const moves = [
  ['d2', 'd4'],
  ['d1', 'd3'],
  ['c1', 'f4'],
  ['g1', 'f3'],
];

const history = new ChessHistory();

moves.forEach(([from, to]) => {
  history.push(
    new MoveCommand(
      ChessCoordinates.fromString(from),
      ChessCoordinates.fromString(to)
    )
  );
});

history.getAll().forEach((command) => command.execute(chessboard));

function playGame() {
  const player = new RobotPlayer(history, chessboard);
  player.intervalInMs = 1000;
  setTimeout(player.play, player.intervalInMs);
}

function rewindGame() {
  history.getAll().forEach((command) => command.undo(chessboard));
}

document.addEventListener('keydown', (event) => {
  if (event.key == 'ArrowLeft') {
    const c = history.getCurrentOrNullAndMoveBack();
    if (c) c.undo(chessboard);
    else console.log('cannot undo');
  } else if (event.key == 'ArrowRight') {
    const c = history.advanceAndGetCurrentOrNull();
    if (c) c.execute(chessboard);
    else console.log('cannot redo');
  } else if (event.key == ' ') {
    const c = new MoveCommand(
      ChessCoordinates.fromString('a1'),
      ChessCoordinates.fromString('a5')
    );
    c.execute(chessboard);
    history.push(c);
  } else if (event.key == 'Backspace') {
    rewindGame();
    history.rewind();
  } else if (event.key == 'Enter') {
    playGame();
  }
  console.log(history);
});
