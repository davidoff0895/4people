<template>
  <div class="price-per">
    <div class="price-per__inpu-block">
      <input
        v-model="localQuantity"
        class="price-per__input"
        type="number"
        @input="updateQuantity">
      <span>шт.</span>
    </div>
    <div v-if="isShowWarning" class="price-per__warning">
      Количество ограничено
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import { IProductCategoryBody } from '@/modules/products/types/products.types'

  @Component({
    name: 'price-per-quantity'
  })
  export default class PricePerQuantity extends Vue {
    @Prop(Object)
    inputQuantity: IProductCategoryBody

    isShowWarning: boolean = false
    localQuantity: number = null

    mounted() {
      this.localQuantity = this.inputQuantity.selectedQuantity
    }

    updateQuantity() {
      if (this.localQuantity > this.inputQuantity.P)  {
        this.localQuantity = this.inputQuantity.P
        this.isShowWarning = true
      } else if (this.localQuantity <= 0) {
        this.localQuantity = 1
      }
      this.$emit('update-quantity', {
        quantity: this.localQuantity,
        product: this.inputQuantity
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/ui/variables.scss";

  .price-per {
    &__input {
      width: 40px;
      padding: 5px;
      border: 1px solid #c6c6c6;
      border-radius: 2px;
      font-size: 14px;
    }
    &__warning {
      color: $accent-color;
      padding: 7px;
      background: lighten($accent-color, 47%);
      width: 140px;
      border: 1px dashed $accent-color;
      margin-top: 8px;
    }
  }
</style>
