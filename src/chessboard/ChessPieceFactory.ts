import { ChessPiece } from './ChessPiece';
import { Color, Piece } from '../types';

export class ChessPieceFactory {
  private readonly pieceSize: number;

  constructor(pieceSize: number) {
    this.pieceSize = pieceSize;
  }

  createAndGet(color: Color, piece: Piece) {
    const p = new ChessPiece(color, piece);
    p.size = this.pieceSize;
    p.image = ChessPieceFactory.getImageSource(color, piece);
    p.id = ChessPieceFactory.generateId();
    return p;
  }

  static generateId() {
    const r = Math.random();
    return r.toString(16).slice(2);
  }

  static getImageSource(color: Color, piece: Piece) {
    return `/${color}-${piece}.svg`;
  }
}
