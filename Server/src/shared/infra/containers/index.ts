import { createContainer } from 'awilix';
import { registerDataSources } from './registerDataSources';
import { registerServices } from './registerServices';
import { registerRepositories } from './registerRepositories';

const container = createContainer({ injectionMode: 'CLASSIC' });

registerDataSources(container);

registerRepositories(container);

registerServices(container);

export { container };
