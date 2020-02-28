import { Store } from 'vuex'
import PRODUCT from './products.name'
import createStore from './products.store'

export default (context: { store: Store<any> }): void => {
  const { store } = context

  store.registerModule(PRODUCT, createStore(), {
    preserveState: store.state.PRODUCT
  })
}
