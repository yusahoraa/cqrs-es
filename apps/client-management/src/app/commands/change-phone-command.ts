import { ClientRepository } from '../repository/client-repository';
import { ClientEvent } from '../model/client-event';

export class ChangePhoneCommand {
  constructor(private clientRepository: ClientRepository) {}
  execute(clientId: string, newPhone: string): void {
    this.clientRepository.addEvent(
      clientId,
      new ClientEvent('PHONE_CHANGED', { phoneNumber: newPhone })
    );
  }
}
