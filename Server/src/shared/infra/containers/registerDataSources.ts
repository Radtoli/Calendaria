import { asValue, AwilixContainer } from 'awilix';
import { trfsDataSource } from '../databases/trfsDataSource';

export function registerDataSources(container: AwilixContainer): void {
  container.register('trfsDataSource', asValue(trfsDataSource));
}
