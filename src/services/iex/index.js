import { apiFactory as factory } from '../api.factory';
import { baseURI } from './settings';

export const apiFactory = factory(baseURI);

export * as chart from './chart';