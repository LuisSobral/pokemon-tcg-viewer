export interface ICard {
  id: string,
  name: string,
  types: string[],
  images: { [key: string]: string }
}