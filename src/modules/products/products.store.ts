import { Module } from 'vuex'
import data from '@/common/__data__/data.json'
import names from '@/common/__data__/names.json'

const SET_PRODUCTS = 'SET_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

import { IProductState } from './types/products.types'
import {ProductsGroupCast} from '@/modules/products/types/products.classes'

export default (): Module<IProductState, null> => ({
  namespaced: true,

  state: {
    products: null
  },

  getters: {
    products: (state: IProductState) => state.products
  },

  actions: {
    getProducts({commit}) {
      commit(SET_PRODUCTS, new ProductsGroupCast({
      //@ts-ignore
        products: data.Value.Goods,
        castRules: names
      }))
    },
    updateProducts({state, commit}, query) {
      commit(UPDATE_PRODUCT, query)
    }
  },

  mutations: {
    [SET_PRODUCTS](state, data) {
      state.products = data
    }
  }
})
