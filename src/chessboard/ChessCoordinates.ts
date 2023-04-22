export class ChessCoordinates {
  // Indexes.
  #x = 0;
  #y = 0;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static fromIndexes(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      throw RangeError('Invalid coordinates');
    }

    const c = new ChessCoordinates();
    c.#x = x;
    c.#y = y;
    return c;
  }

  static fromString(coords: string) {
    return ChessCoordinates.fromIndexes(
      coords[0].toLowerCase().charCodeAt(0) - 97,
      8 - Number.parseInt(coords[1], 10)
    );
  }

  /**
   * The y coordinate, starting from top-left.
   */
  get columnIndex() {
    return this.#x;
  }

  /**
   * The x coordinate, starting from top-left.
   */
  get rowIndex() {
    return this.#y;
  }

  get columnAsLetter() {
    return String.fromCharCode(this.columnIndex + 97);
  }

  get rowAsDigit() {
    return 8 - this.rowIndex;
  }

  toString() {
    return `${this.columnAsLetter}${this.rowAsDigit}`;
  }
}
