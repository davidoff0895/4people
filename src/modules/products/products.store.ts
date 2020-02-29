import { Module } from 'vuex'
import data from '@/common/__data__/data.json'
import names from '@/common/__data__/names.json'

// @ts-ignore
import actionHelper from '@zxcabs/vuex-promise-action-name-helper'

const SET_PRODUCT = actionHelper('SET_PRODUCT')

import {
  IProductState
} from './types/products.types'
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
      commit(SET_PRODUCT.SUCCEEDED, new ProductsGroupCast({
      //@ts-ignore
        products: data.Value.Goods,
        castRules: names
      }))
    }
  },

  mutations: {
    [SET_PRODUCT.SUCCEEDED](state, data) {
      state.products = data
    }
  }
})
