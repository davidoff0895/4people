interface IProduct {
  Error: string
  Id: number,
  Success: boolean,
  Value: IProductValue
}

interface IProductValue {
  Goods: IGoodItem[]
}

interface IProductState {
  products: IProductValue
}

interface IGoodItem {
  B: boolean
  C: number
  CV: number
  G: number
  P: number
  Pl: number
  T: number
}

export {
  IProduct,
  IProductState
}
