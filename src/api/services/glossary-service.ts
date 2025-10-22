import { httpClient } from 'src/api/services/http-client';
import type { GlossaryItem } from 'src/api/data-contracts/glossary-contracts';

export function getGlossary(){
  return httpClient.get<GlossaryItem[]>('glossary/getAll/');
}

export function createGlossaryItem(newLink: GlossaryItem){
  return httpClient.post<GlossaryItem[]>('glossary/create/', newLink);
}

export function updateGlossaryItem(id: number){
  return httpClient.put<GlossaryItem[]>(`glossary/update/${id}/`);
}

export function deleteGlossaryItem(id: number){
  return httpClient.delete<GlossaryItem[]>(`glossary/delete/${id}/`);
}

