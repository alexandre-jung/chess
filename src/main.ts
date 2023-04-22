import './style.css';

import ChessBoard from './ChessBoard';
import ChessPiecePicker from './ChessPiecePicker';
import ChessPieceFactory from './ChessPieceFactory';
import ChessCoordinates from './ChessCoordinates';
import { ChessHistory, MoveCommand } from './history';

const app = document.querySelector('#app');
if (!app) throw new Error('#app not found');

const chessboard = new ChessBoard();
const whitePicker = new ChessPiecePicker('white');
const blackPicker = new ChessPiecePicker('black');

app.appendChild(chessboard.element);
app.insertAdjacentElement('afterbegin', blackPicker.element);
app.insertAdjacentElement('beforeend', whitePicker.element);

const initialPlacement = [
  { c: 'a1', piece: 'rook', color: 'white' },
  { c: 'b1', piece: 'knight', color: 'white' },
  { c: 'c1', piece: 'bishop', color: 'white' },
  { c: 'd1', piece: 'queen', color: 'white' },
  { c: 'e1', piece: 'king', color: 'white' },
  { c: 'f1', piece: 'bishop', color: 'white' },
  { c: 'g1', piece: 'knight', color: 'white' },
  { c: 'h1', piece: 'rook', color: 'white' },
  { c: 'a2', piece: 'pawn', color: 'white' },
  { c: 'b2', piece: 'pawn', color: 'white' },
  { c: 'c2', piece: 'pawn', color: 'white' },
  { c: 'd2', piece: 'pawn', color: 'white' },
  { c: 'e2', piece: 'pawn', color: 'white' },
  { c: 'f2', piece: 'pawn', color: 'white' },
  { c: 'g2', piece: 'pawn', color: 'white' },
  { c: 'h2', piece: 'pawn', color: 'white' },
  { c: 'a8', piece: 'rook', color: 'black' },
  { c: 'b8', piece: 'knight', color: 'black' },
  { c: 'c8', piece: 'bishop', color: 'black' },
  { c: 'd8', piece: 'queen', color: 'black' },
  { c: 'e8', piece: 'king', color: 'black' },
  { c: 'f8', piece: 'bishop', color: 'black' },
  { c: 'g8', piece: 'knight', color: 'black' },
  { c: 'h8', piece: 'rook', color: 'black' },
  { c: 'a7', piece: 'pawn', color: 'black' },
  { c: 'b7', piece: 'pawn', color: 'black' },
  { c: 'c7', piece: 'pawn', color: 'black' },
  { c: 'd7', piece: 'pawn', color: 'black' },
  { c: 'e7', piece: 'pawn', color: 'black' },
  { c: 'f7', piece: 'pawn', color: 'black' },
  { c: 'g7', piece: 'pawn', color: 'black' },
  { c: 'h7', piece: 'pawn', color: 'black' },
];

const factory = new ChessPieceFactory(50);

for (const placement of initialPlacement) {
  const target = ChessCoordinates.fromString(placement.c);
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
  history.push(new MoveCommand(
    ChessCoordinates.fromString(from),
    ChessCoordinates.fromString(to),
  ));
});

history.getAll().forEach(command => command.execute(chessboard));

document.addEventListener('keydown', event => {
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
      ChessCoordinates.fromString('a5'),
    );
    c.execute(chessboard);
    history.push(c);
  }
  console.log(history);
});
