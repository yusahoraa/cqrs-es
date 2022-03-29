import { ClientDetails } from '../model/client-details';
import { ClientRepository } from '../repository/client-repository';

export class GetClientQuery {
  constructor(private clientRepository: ClientRepository) {}

  execute(clientId: string): ClientDetails {
    return new ClientDetails(this.clientRepository.get(clientId));
  }
}
