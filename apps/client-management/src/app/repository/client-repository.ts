import { ClientEvent } from '../model/client-event';

export class ClientRepository {
  private clients = new Map<string, ClientEvent[]>();
  // private clients = new Map<string, ClientDetails>();

  public addEvent(clientId: string, event: ClientEvent) {
    let clientEvents = this.clients.get(clientId);
    if (!clientEvents) {
      clientEvents = [];
    }
    clientEvents.push(event);
    this.clients.set(clientId, clientEvents);
    return;
  }

  public get(clientId: string): ClientEvent[] {
    return this.clients.get(clientId) ?? [];
  }
}
