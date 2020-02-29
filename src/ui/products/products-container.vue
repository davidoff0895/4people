<template>
  <div class="grid-container">
    <product-group
      v-for="(group, index) in products"
      :key="index"
      :group="group"
      :selectedProducts="selectedProducts"
      @select-item="selectItem"
    />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Getter, Action } from 'vuex-class'
  import { Component } from 'vue-property-decorator'
  import PRODUCT from '@/modules/products/products.name'
  import {IProductCategory, IProductState} from '@/modules/products/types/products.types'
  import ProductGroup from '@/ui/products/components/products-group.vue'

  @Component({
    name: 'products-container',
    components: {ProductGroup}
  })
  export default class ProductsContainer extends Vue {
    @Getter(`${PRODUCT}/products`)
    products: IProductState['products']

    @Action(`${PRODUCT}/getProducts`)
    getProducts: any

    selectedProducts: IProductCategory[] = []

    mounted() {
      this.getProducts()
    }

    selectItem(item: IProductCategory) {
      const alreadyAddedIndex = this.selectedProducts.findIndex((p) => p.id === item.id)
      alreadyAddedIndex !== -1 ? this.selectedProducts.splice(alreadyAddedIndex, 1) :
        this.selectedProducts.push(item)
    }
  }
</script>

<style lang="scss" scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
</style>
