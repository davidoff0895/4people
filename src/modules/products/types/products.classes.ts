import {IGoodItem, IGroupCategory} from '@/modules/products/types/products.types'

class ProductsGroupCast {
  constructor({products, castRules, currentRate}: {
    products: IGoodItem[],
    castRules: IGroupCategory,
    currentRate: number
  }) {
    return products.reduce((acc: IGroupCategory, product) => {
      if (!acc[product.G]) {
        acc[product.G] = {
          G: castRules[product.G].G,
          B: {}
        }
      }
      acc[product.G].B[product.T] = {
        N: castRules[product.G].B[product.T].N,
        C: +(product.C * currentRate).toFixed(2),
        P: product.P,
        id: product.T,
        selectedQuantity: 1,
        groupId: product.G
      }
      return acc
    }, {})
  }
}

export {
  ProductsGroupCast
}
