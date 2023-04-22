import { Color, Piece } from './types';

export type ChessDragAndDropDataObject = {
  id: string
  color: Color
  piece: Piece
  // from: string | null
}

/**
 * A class to serialize and deserialize drag and drop data.
 */
export class ChessDragAndDropData {
  readonly #data: ChessDragAndDropDataObject;

  constructor (
    color: Color,
    piece: Piece,
    id: string,
  ) {
    this.#data = {
      color,
      piece,
      id,
    };
  }

  static fromString (data: string) {
    const dataObject = JSON.parse(data);
    if (ChessDragAndDropData.isValidDataObject(dataObject)) {
      return new ChessDragAndDropData(
        dataObject.color,
        dataObject.piece,
        dataObject.id,
      );
    }
    throw new TypeError('Invalid data');
  }

  static isValidDataObject (data: unknown): data is ChessDragAndDropDataObject {
    return (
      !!data && typeof data == 'object' &&
      ('color' in data || 'piece' in data || 'id' in data)
    );
  }

  toObject () {
    return { ...this.#data };
  }

  toString () {
    return JSON.stringify(this.#data);
  }

  get color () {
    return this.#data.color;
  }

  get piece () {
    return this.#data.piece;
  }

  get id () {
    return this.#data.id;
  }
}
