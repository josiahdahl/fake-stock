import { apiFactory as factory } from '../api-utils';
import { baseURI } from './settings';

export const apiFactory = factory(baseURI);

export * from './chart';