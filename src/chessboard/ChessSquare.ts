import { Color } from '../types';
import { ChessDropZone } from './ChessDropZone';
import { ChessCoordinates } from './ChessCoordinates';
import { ChessPiece } from './ChessPiece';

export class ChessSquare {
  readonly #dropZone: ChessDropZone;
  readonly #coordinates: ChessCoordinates;
  #piece: ChessPiece | null = null;

  constructor (color: Color, coordinates: ChessCoordinates) {
    this.#dropZone = new ChessDropZone({ size: 50 });
    this.#coordinates = coordinates;
    this.element.style.backgroundColor = color == 'white' ? 'lightgray' : 'gray';
  }

  get coordinates () {
    return this.#coordinates;
  }

  get element () {
    return this.#dropZone.element;
  }

  get dropZone () {
    return this.#dropZone;
  }

  get piece () {
    return this.#piece;
  }

  set piece (piece: ChessPiece | null) {
    this.removePiece();
    this.setPieceElement(piece);
    this.#piece = piece;
    this.ensureChildParentIsSelf();
  }

  private ensureChildParentIsSelf () {
    if (this.piece && this.piece.parent !== this) {
      this.piece.parent = this;
    }
  }

  private setPieceElement (piece: ChessPiece | null) {
    if (piece) this.element.appendChild(piece.element);
  }

  private removePiece () {
    const child = this.element.firstChild;
    if (child) child.remove();
  }
}
