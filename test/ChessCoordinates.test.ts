import { ChessCoordinates } from '../src/chessboard';

describe('ChessCoordinates', () => {
  describe('to string', () => {
    it('should map a1 to a1', () => {
      const c = ChessCoordinates.fromString('a1');
      expect(c.toString()).toEqual('a1');
    });

    it('should map h8 to h8', () => {
      const c = ChessCoordinates.fromString('h8');
      expect(c.toString()).toEqual('h8');
    });
  });

  describe('to x,y indexes', () => {
    it('should map a8 to 0,0', () => {
      const c = ChessCoordinates.fromString('a8');
      expect(c.columnIndex).toEqual(0);
      expect(c.rowIndex).toEqual(0);
    });

    it('should map h1 to 7,7', () => {
      const c = ChessCoordinates.fromString('h1');
      expect(c.columnIndex).toEqual(7);
      expect(c.rowIndex).toEqual(7);
    });

    it('should map h8 to 7,0', () => {
      const c = ChessCoordinates.fromString('h8');
      expect(c.columnIndex).toEqual(7);
      expect(c.rowIndex).toEqual(0);
    });

    it('should map a1 to 7,0', () => {
      const c = ChessCoordinates.fromString('a1');
      expect(c.columnIndex).toEqual(0);
      expect(c.rowIndex).toEqual(7);
    });
  });
});
