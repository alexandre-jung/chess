import { ChessDragAndDropData } from './ChessDragAndDropData';
import EventListeners from '../utils/EventListeners';

type ChessDropZoneEventType = 'drop';
type ChessDropZoneEvent = ChessDragAndDropData | string;
type ChessDropZoneEventListener<Data extends ChessDropZoneEvent = any> = (
  event: Data
) => void;

/**
 * An unstyled div that supports chess piece dropping.
 */
export class ChessDropZone {
  #element = document.createElement('div');
  #listeners = new EventListeners<ChessDropZoneEventType, ChessDropZoneEvent>();

  constructor({ size = 0 }: { size?: number } = {}) {
    this.size = size;
    this.setupEvents();
  }

  get element() {
    return this.#element;
  }

  set size(size: number) {
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
  }

  addEventListener(
    type: 'drop',
    listener: ChessDropZoneEventListener<ChessDragAndDropData>
  ): void;
  addEventListener(
    type: ChessDropZoneEventType,
    listener: ChessDropZoneEventListener
  ) {
    this.#listeners.addAndGet(type, listener);
  }

  removeEventListener(
    type: ChessDropZoneEventType,
    listener: ChessDropZoneEventListener
  ) {
    this.#listeners.remove(type, listener);
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
      this.dispatch('drop', data);
    }
  };

  private dispatch(type: 'drop', data: ChessDragAndDropData): void;
  private dispatch(type: ChessDropZoneEventType, data: ChessDropZoneEvent) {
    this.#listeners.dispatch(type, data);
  }
}
