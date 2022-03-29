import { ClientRepository } from '../repository/client-repository';
import { ClientEvent } from '../model/client-event';

export class CreateClientCommand {
  constructor(private clientRepository: ClientRepository) {}

  execute(clientName: string, phoneNumber: string, email: string): string {
    this.clientRepository.addEvent(
      clientName,
      new ClientEvent('CLIENT_CREATED', {
        name: clientName,
        phoneNumber,
        email,
      })
    );

    return clientName;
  }
}
