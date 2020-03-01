import { Module } from 'vuex'
import data from '@/common/__data__/data.json'
import names from '@/common/__data__/names.json'

const SET_PRODUCTS = 'SET_PRODUCTS'

import { IProductState } from './types/products.types'
import {ProductsGroupCast} from '@/modules/products/types/products.classes'

export default (): Module<IProductState, null> => ({
  namespaced: true,

  state: {
    products: null,
    previousProducts: null
  },

  getters: {
    products: (state: IProductState) => state.products,
    previousProducts: (state: IProductState) => state.previousProducts
  },

  actions: {
    updateProducts({state, commit}, currentRate) {
      commit(SET_PRODUCTS, new ProductsGroupCast({
        products: data.Value.Goods,
        castRules: names,
        currentRate
      }))
    }
  },

  mutations: {
    [SET_PRODUCTS](state, data) {
      state.previousProducts = {...state.products}
      state.products = data
    }
  }
})
