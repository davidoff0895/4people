interface IProductState {
  products: IGroupCategory
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

interface IGroupCategory {
  [key: string]: {
    G: string
    B: IProductCategory
    C?: number
  }
}

interface IProductCategory {
  [key: string]: {
    N: string
    T?: number | string
    C?: number
    P?: number
    id?: number
  }
}

export {
  IProductState,
  IGoodItem,
  IGroupCategory,
  IProductCategory
}
