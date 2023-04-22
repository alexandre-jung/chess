import { ChessPiece } from './ChessPiece';

export class ChessPiecePool {
  #pieces = new Map<string, ChessPiece>();

  add (piece: ChessPiece) {
    if (!piece.id) throw new Error(`Piece must have an ID`);
    this.#pieces.set(piece.id, piece);
  }

  getById (id: string) {
    return this.#pieces.get(id) ?? null;
  }

  deleteAndGet (id: string) {
    const piece = this.getById(id);
    if (piece) {
      this.#pieces.delete(id);
      return piece;
    }
    return null;
  }
}
