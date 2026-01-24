export interface GlossaryItem{
  id: number,
  description: string,
  name: string,
}

export interface GlossaryLink{
  id: number,
  source: number,
  target: number,
  name: string,
}
