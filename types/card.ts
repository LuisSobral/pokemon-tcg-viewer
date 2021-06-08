export interface IImages {
  small: string,
  large: string
}

export interface IResistance {
  type: string,
  value: number
}

export interface IWeaknesses {
  type: string,
  value: number
}

export interface IAttack {
  name: string,
  text: string,
  damage: number,
  cost: string[]
}

export interface ICard {
  id: string,
  name: string,
  types: string[],
  images: IImages,
  resistances?: IResistance[],
  weaknesses?: IWeaknesses[],
  attacks: IAttack[]
}