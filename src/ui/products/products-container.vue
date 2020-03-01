<template>
  <div class="products">
    <div class="grid-container">
      <product-group
        v-for="(group, index) in products"
        :key="index"
        :group="group"
        :previous-group="previousProducts[index]"
        :selectedProducts="selectedProducts"
        @select-item="selectItem"
      />
    </div>
    <cart
      :selectedProducts="selectedProducts"
      @remove="remove"
      @update-quantity="updateQuantity"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Getter, Action } from 'vuex-class'
  import { Component } from 'vue-property-decorator'
  import PRODUCT from '@/modules/products/products.name'
  import {
    IProductCategoryBody,
    IProductState,
    IQueryChangeQuantity
  } from '@/modules/products/types/products.types'
  import ProductGroup from '@/ui/products/components/products-group.vue'
  import Cart from '@/ui/products/components/cart.vue'

  @Component({
    name: 'products-container',
    components: {Cart, ProductGroup}
  })
  export default class ProductsContainer extends Vue {
    @Getter(`${PRODUCT}/products`)
    products: IProductState['products']
    @Getter(`${PRODUCT}/previousProducts`)
    previousProducts: IProductState['previousProducts']

    @Action(`${PRODUCT}/updateProducts`)
    updateProducts: any

    selectedProducts: IProductCategoryBody[] = []

    mounted() {
      this.updateProducts(66)

      setInterval(() => {
        this.updateProducts(Math.random() * 60 + 20)
      }, 15000)
    }

    selectItem(item: IProductCategoryBody) {
      const alreadyAddedIndex = this.selectedProducts.findIndex((p) => p.id === item.id)
      alreadyAddedIndex !== -1 ? this.selectedProducts.splice(alreadyAddedIndex, 1) :
        this.selectedProducts.push({...item})
    }
    remove(item: IProductCategoryBody) {
      const alreadyAddedIndex = this.selectedProducts.findIndex((p) => p.id === item.id)
      this.selectedProducts.splice(alreadyAddedIndex, 1)
    }
    updateQuantity(query: IQueryChangeQuantity) {
      const {product} = query
      const {quantity} = query
      const productIndex = this.selectedProducts.findIndex((p) => p.id === product.id)
      this.selectedProducts[productIndex].selectedQuantity = quantity
    }
  }
</script>

<style lang="scss" scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>
