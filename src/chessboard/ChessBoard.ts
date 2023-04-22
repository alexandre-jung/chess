import { ChessSquare } from './ChessSquare';
import { ChessCoordinates } from './ChessCoordinates';
import { ChessPiecePool } from './ChessPiecePool';
import { ChessPieceFactory } from './ChessPieceFactory';
import { ChessPiece } from './ChessPiece';
import { ChessDragAndDropData } from './ChessDragAndDropData';
import { ChessBoardActor } from '../history/interfaces';

export class ChessBoard implements ChessBoardActor {
  readonly #board: ChessSquare[][];
  readonly #element: HTMLDivElement;
  readonly #pool = new ChessPiecePool();
  readonly #factory = new ChessPieceFactory(50);

  constructor() {
    this.#board = ChessBoard.createAndGetBoard();
    this.#element = ChessBoard.createAndGetDOM(this.#board);
    this.setupEvents();
  }

  private static createAndGetBoard() {
    let board = new Array(8).fill(null);
    board = board.map(() => new Array(8));

    for (let i = 0; i < 64; i++) {
      const y = Math.floor(i / 8);
      const x = i % 8;
      const coordinates = ChessCoordinates.fromIndexes(x, y);
      const color = y % 2 == x % 2 ? 'white' : 'black';
      board[y][x] = new ChessSquare(color, coordinates);
    }

    return board;
  }

  private static createAndGetDOM(board: ChessSquare[][]) {
    const element = document.createElement('div');
    element.addEventListener('dragover', (event) => event.preventDefault());
    element.addEventListener('dragenter', (event) => event.preventDefault());

    board.forEach((row) => {
      const rowElement = document.createElement('div');
      rowElement.style.display = 'flex';
      row.forEach((square) => rowElement.appendChild(square.element));
      element.appendChild(rowElement);
    });

    return element;
  }

  private setupEvents() {
    this.#board.forEach((row) => {
      row.forEach((square) => {
        square.dropZone.addEventListener('drop', (data) => {
          this.handleDrop(square, data);
        });
      });
    });
  }

  private handleDrop(square: ChessSquare, data: ChessDragAndDropData) {
    const piece = this.getOrCreateAndGetFromData(data);

    const sourceSquare = piece.parent;
    if (sourceSquare) {
      console.log(`move ${piece} from ${sourceSquare.coordinates}`);
    } else {
      console.log(`${piece} created`);
    }

    square.piece = piece;

    // TODO handle invalid moves

    const destinationSquare = square.piece.parent;
    if (destinationSquare) {
      console.log(`to ${destinationSquare.coordinates}`);
    }
  }

  private getOrCreateAndGetFromData(data: ChessDragAndDropData) {
    let piece = this.#pool.getById(data.id);
    if (!piece) {
      piece = this.#factory.createAndGet(data.color, data.piece);
      this.#pool.add(piece);
      return piece;
    }
    return piece;
  }

  get element() {
    return this.#element;
  }

  getSquareAt(coordinates: ChessCoordinates) {
    return this.#board[coordinates.rowIndex][coordinates.columnIndex];
  }

  getPieceAt(coordinates: ChessCoordinates) {
    return this.getSquareAt(coordinates).piece;
  }

  setPiece(piece: ChessPiece, coordinates: ChessCoordinates) {
    const square = this.getSquareAt(coordinates);
    square.piece = piece;
    this.#pool.add(piece);
    piece.onDragStart = piece.waitNextFrameAndRemoveFromDOM;
  }

  move(from: ChessCoordinates, to: ChessCoordinates) {
    const fromSquare = this.getSquareAt(from);
    const toSquare = this.getSquareAt(to);

    const piece = fromSquare.piece;
    if (piece) toSquare.piece = piece;
  }
}
