<template>
  <div>
    {{products}}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Getter, Action } from 'vuex-class'
  import { Component } from 'vue-property-decorator'
  import PRODUCT from '@/modules/products/products.name'
  import { IProductState } from '@/modules/products/types/products.types'

  @Component({
    name: 'products-container'
  })
  export default class ProductsContainer extends Vue {
    @Getter(`${PRODUCT}/products`)
    products: IProductState['products']

    @Action(`${PRODUCT}/getProducts`)
    getProducts: any

    mounted() {
      this.getProducts()
    }
  }
</script>

<style lang="scss" scoped>

</style>
