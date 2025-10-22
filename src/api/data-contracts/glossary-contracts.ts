export interface GlossaryItem{
  id: number,
  description: string,
  name: string,
}

export interface GlossaryLink{
  id: number,
  source: string,
  target: string,
  name: string,
}
