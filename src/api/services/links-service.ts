import { httpClient } from 'src/api/services/http-client';
import type { GlossaryLink } from 'src/api/data-contracts/glossary-contracts';

export function getLinks(){
  return httpClient.get<GlossaryLink[]>('links/getAll/');
}

export function createLink(newLink: GlossaryLink){
  return httpClient.post<GlossaryLink[]>('links/create/', newLink);
}

export function updateLink(id: number){
  return httpClient.put<GlossaryLink[]>(`links/update/${id}/`);
}

export function deleteLink(id: number){
  return httpClient.delete<GlossaryLink[]>(`links/delete/${id}/`);
}
