import { Color } from '../types';
import { ChessPieceFactory } from './ChessPieceFactory';
import { PIECES } from '../constants';

export class ChessPiecePicker {
  #element = document.createElement('div');
  #color: Color;
  #factory = new ChessPieceFactory(50);

  constructor (color: Color) {
    this.#color = color;
    this.element.style.display = 'flex';

    PIECES.forEach(type => {
      const piece = this.#factory.createAndGet(this.#color, type);
      this.#element.appendChild(piece.element);
    });
  }

  get element () {
    return this.#element;
  }
}
