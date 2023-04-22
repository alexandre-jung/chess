import { Color, Piece } from '../types';
import { ChessDragAndDropData } from './ChessDragAndDropData';
import { ChessCoordinates } from './ChessCoordinates';

type Parent = {
  piece: ChessPiece | null;
  coordinates: ChessCoordinates;
};

/**
 * A draggable chess piece.
 */
export class ChessPiece {
  readonly #color: Color;
  readonly #name: Piece;
  readonly #element: HTMLImageElement;
  #parent: Parent | null = null;
  onDragStart?: (piece: ChessPiece) => void;
  onDragEnd?: (piece: ChessPiece) => void;

  constructor(color: Color, piece: Piece) {
    this.#element = document.createElement('img');
    this.#name = piece;
    this.#color = color;
    this.#element.draggable = true;
    this.setupEvents();
  }

  private setupEvents() {
    this.element.addEventListener('dragstart', this.handleDragStart);
    this.element.addEventListener('dragend', this.handleDragEnd);
  }

  private handleDragStart = (event: DragEvent) => {
    if (event.dataTransfer) {
      const data = new ChessDragAndDropData(this.color, this.piece, this.id);
      event.dataTransfer.setData('text/plain', data.toString());
    }
    if (this.onDragStart) {
      this.onDragStart(this);
    }
  };

  private handleDragEnd = () => {
    if (this.onDragEnd) {
      this.onDragEnd(this);
    }
  };

  set id(id: string) {
    this.element.id = id;
  }

  get id() {
    return this.element.id;
  }

  set image(src: string) {
    this.element.src = src;
  }

  get element() {
    return this.#element;
  }

  set size(size: number) {
    this.element.width = size;
    this.element.height = size;
  }

  get piece(): Piece {
    return this.#name;
  }

  get color(): Color {
    return this.#color;
  }

  get parent(): Parent | null {
    return this.#parent;
  }

  set parent(value: Parent | null) {
    this.#parent = value;
    this.ensureParentChildIsSelf();
  }

  private ensureParentChildIsSelf() {
    if (this.parent && this.parent.piece !== this) {
      this.parent.piece = this;
    }
  }

  waitNextFrameAndRemoveFromDOM = () => {
    requestAnimationFrame(this.removeFromDOM);
  };

  removeFromDOM = () => this.element.remove();

  toString() {
    return `${this.color} ${this.piece}`;
  }
}
