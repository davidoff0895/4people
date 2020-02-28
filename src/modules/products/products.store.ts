import { Module } from 'vuex'
import data from '@/common/__data__/data.json'

// @ts-ignore
import actionHelper from '@zxcabs/vuex-promise-action-name-helper'

const SET_PRODUCT = actionHelper('SET_PRODUCT')

import {
  IProductState
} from './types/products.types'

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
        commit(SET_PRODUCT.SUCCEEDED, data)
    }
  },

  mutations: {
    [SET_PRODUCT.SUCCEEDED](state, data) {
      state.products = data
    }
  }
})
