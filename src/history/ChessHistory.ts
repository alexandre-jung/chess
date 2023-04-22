import { Command } from './interfaces';

export class ChessHistory {
  private readonly commands: Command[] = [];
  private current = - 1;

  push (command: Command) {
    this.discardAllEntriesAfterCurrent();
    this.commands.push(command);
    this.current = this.commands.length - 1;
  }

  advanceAndGetCurrentOrNull () {
    if (this.isAtEnd) return null;
    this.current ++;
    return this.getCurrentOrNull();
  }

  getCurrentOrNullAndMoveBack () {
    if (this.isAtBeginning) return null;
    const c = this.getCurrentOrNull();
    this.current --;
    return c;
  }

  getCurrentOrNull () {
    return this.commands.at(this.current) ?? null;
  }

  private discardAllEntriesAfterCurrent () {
    this.commands.splice(this.current + 1);
  }

  get isEmpty () {
    return this.commands.length == 0;
  }

  get isAtBeginning () {
    return this.current == - 1;
  }

  get isAtEnd () {
    return this.current >= this.commands.length - 1;
  }

  getAll () {
    return [...this.commands];
  }
}
