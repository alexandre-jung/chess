import { ChessDragAndDropData } from './ChessDragAndDropData';
import { EventListeners } from '../utils';

type ChessDropZoneEvents = {
  drag: void;
  drop: ChessDragAndDropData;
};

/**
 * An unstyled div that supports chess piece dropping.
 */
export class ChessDropZone {
  #element = document.createElement('div');
  #listeners = new EventListeners<ChessDropZoneEvents>();

  constructor({ size = 0 }: { size?: number } = {}) {
    this.size = size;
    this.setupEvents();
  }

  get listeners(): EventListeners<ChessDropZoneEvents> {
    return this.#listeners;
  }

  get element() {
    return this.#element;
  }

  set size(size: number) {
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
  }

  private setupEvents() {
    this.element.addEventListener('dragover', this.handleDragOver);
    this.element.addEventListener('drop', this.handleDrop);
  }

  private handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  private handleDrop = (event: DragEvent) => {
    if (event.dataTransfer) {
      const dataAsString = event.dataTransfer.getData('text/plain');
      const data = ChessDragAndDropData.fromString(dataAsString);
      this.listeners.dispatch('drop', data);
    }
  };
}
