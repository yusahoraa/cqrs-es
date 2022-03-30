import { DomainEvent } from './domain.event';
import { Injectable } from '@nestjs/common';

export interface IHandler {
  handle(event: DomainEvent): void;
}

@Injectable()
export class EventBus {
  private subscribers = [];

  publish(event: DomainEvent) {
    this.subscribers.forEach((s) => {
      s.handle(event);
    });
  }

  subscribe(handler: IHandler) {
    this.subscribers.push(handler);
  }
}
