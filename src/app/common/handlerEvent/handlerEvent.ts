import { Observable } from 'rxjs';
import { Command } from '../command';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventHandler {
  public eventListener: Observable<Command>;
  private events: Array<Command> = [];

  constructor() {
    this.eventListener = new EventEmitter();
  }

  registerEvent = (command: Command) => {
    if (this.valideNewEvent(command)) {
      this.events.push(command);
    }
  }

  removeEvent = (command: Command) => {
    const index = this.events.indexOf(command);
    this.events.splice(index, 1);
  }

  emit = (type: string, args?: any) => {
    const command: Command = this.events.find(c => c.type === type);
    if (command) {
      command.event(args);
    }
  }

  private valideNewEvent = (newCommand: Command): boolean => {
    if (this.events.indexOf(newCommand) === -1) {
      return true;
    } else {
      throw new Error('Event already exist');
    }
  }
}
