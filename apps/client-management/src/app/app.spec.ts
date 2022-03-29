import { CreateClientCommand } from './commands/create-client-command';
import { ChangePhoneCommand } from './commands/change-phone-command';
import { GetClientQuery } from './queries/get-client-query';
import { ClientRepository } from './repository/client-repository';

describe('app', () => {
  let clientRepository: ClientRepository;
  let createClientCommand: CreateClientCommand;
  let changePhoneCommand: ChangePhoneCommand;
  let getClientQuery: GetClientQuery;

  beforeEach(() => {
    clientRepository = new ClientRepository();
    createClientCommand = new CreateClientCommand(clientRepository);
    changePhoneCommand = new ChangePhoneCommand(clientRepository);
    getClientQuery = new GetClientQuery(clientRepository);
  });

  it('should have latest phone', () => {
    const clientId = createClientCommand.execute(
      'John Doe',
      '+123456',
      'john@doe.com'
    );
    changePhoneCommand.execute(clientId, '+999');

    expect(getClientQuery.execute(clientId).phoneNumber).toBe('+999');
  });
});
