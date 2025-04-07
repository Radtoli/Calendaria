import { DataSource } from 'typeorm';
import { container } from '../infra/containers';

export async function startEnvironment() {
  const trfsDataSource = container.resolve<DataSource>('trfsDataSource');

  await trfsDataSource.initialize();
}
