import { PostHandler } from '../handlers/post-handler';
import { DomainEvent } from './domain.event';

export interface IHandler {
  handle(event: DomainEvent): void;
}

export class EventBus {

  private subscribers = [];

  publish(event: DomainEvent) {
    this.subscribers.forEach(s => {
      s.handle(event);
    });
  }

  subscribe(handler: IHandler) {
    this.subscribers.push(handler);
  }
}
