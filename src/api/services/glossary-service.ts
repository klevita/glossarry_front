import {httpClient} from 'src/api/services/http-client';
import type { AxiosResponse } from 'axios';
import type { GlossaryItem, GlossaryLink } from 'src/api/data-contracts/glossary-contracts';

type Resp<T> = Promise<AxiosResponse<T>>

export function getGlossary(){
  return httpClient.get('glossary/') as Resp<GlossaryItem[]>;
}

export function getLinks(){
  return httpClient.get('links/') as Resp<GlossaryLink[]>;
}

