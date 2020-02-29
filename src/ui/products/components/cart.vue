<template>
  <div class="cart">
    <div class="grid-container thead">
      <div class="grid-item">
        Наименование товара и описание
      </div>
      <div class="grid-item">Количество</div>
      <div class="grid-item">Цена</div>
    </div>
    <div v-for="product in selectedProducts" class="grid-container t-row">
      <div class="grid-item">{{ product.N }}</div>
      <div class="grid-item">
        <price-per-quantity
          :inputQuantity="product"
          @update-quantity="updateQuantity"
        />
      </div>
      <div class="grid-item">
        <b>{{ product.C | currencyPrice }}</b>
        <span> / шт.</span>
      </div>
      <div class="grid-item">
        <button
          class="btn-no-style remove"
          @click="remove(product)">
          Удалить
        </button>
      </div>
    </div>
    <div v-if="selectedProducts.length" class="grid-container thead">
      <div class="grid-item total">
        Общая стоимость:
        <div class="total__sum">
          {{ sum | currencyPrice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { IProductCategoryBody } from '@/modules/products/types/products.types'
  import PricePerQuantity from '@/ui/common/price-per-quantity.vue'
  import {price} from '@/common/filters/price'

  @Component({
    name: 'cart',
    components: {PricePerQuantity},
    filters: {
      currencyPrice(value: number) {
        return price(value, 'руб')
      }
    }
  })
  export default class Cart extends Vue {
    @Prop(Array)
    selectedProducts: IProductCategoryBody[]

    get sum() {
      return this.selectedProducts.reduce((sum, product) => {
        return sum += +product.C * product.selectedQuantity
      }, 0)
    }

    remove(item: IProductCategoryBody) {
      this.$emit('remove', item)
    }
    updateQuantity(query: {quantity: number, product: IProductCategoryBody}) {
      this.$emit('update-quantity', query)
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/ui/variables.scss";

  .cart {
    max-width: 1200px;
    margin: 5rem auto;
  }
  .grid-container {
    grid-template-columns: auto 200px 200px 100px;
  }
  .grid-item.price {
    grid-column: 3 / 3;
  }
  .total {
    grid-column: 3 / 5;

    &__sum {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      color: $accent-color;
    }
  }
</style>
