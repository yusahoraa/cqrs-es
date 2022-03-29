import { ClientEvent } from './client-event';

export class ClientDetails {
  public clientName: string;
  public phoneNumber: string;
  public email: string;

  constructor(clientEvents: ClientEvent[]) {
    clientEvents.forEach((e) => {
      if (e.type === 'CLIENT_CREATED') {
        const content = e.content as any;
        this.clientName = content.name;
        this.phoneNumber = content.phoneNumber;
        this.email = content.email;
      } else if (e.type === 'PHONE_CHANGED') {
        const content = e.content as any;
        this.phoneNumber = content.phoneNumber;
      }
    });
  }
}
