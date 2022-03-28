import { PostHandler } from '../../handler/post-handler';

export class DomainEvent {
  constructor(public eventType: string, public content: unknown) {

  }
}

export class EventBus {

  private subscribers = [];

  publish(event: DomainEvent) {
    this.subscribers.forEach(s => {
      s.doIt(event);
    });
  }

  subscribe(handler: PostHandler) {
    this.subscribers.push(handler)
  }
}
