<template>
  <div class="products-group">
    <div class="grid-container products-group__container">
      <div class="grid-item grid-container__header" @click="toggleItem">
        <icons
          icon="caret-down"
          class="products-group__toggle"
          :class="{opened: isShowItem}"/>
        {{ group.G }}
      </div>
      <template v-if="isShowItem">
        <div v-for="item in group.B" class="grid-item products-group__container__list">
          <div
            class="grid-container products-group__container__item"
            :class="{selected: isSelected(item)}"
            @click="selectItem(item)">
            <div class="products-group__container__item__content">
              {{ item.N }}
              ({{ item.P }})
            </div>
            <div class="products-group__container__item__content products-group__container__item__price">
              {{ item.C | price }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from 'vue-property-decorator'
  import {IGroupCategory, IProductCategory} from '@/modules/products/types/products.types'
  import Icons from '@/common/icons/icons'
  import { price } from '@/common/filters/price'

  @Component({
    name: 'product-group',
    components: {
      Icons
    },
    filters: {
      price
    }
  })
  export default class ProductGroup extends Vue {
    @Prop(Object)
    group: IGroupCategory
    @Prop(Array)
    selectedProducts: IProductCategory[]

    isShowItem: boolean = true

    toggleItem() {
      this.isShowItem = !this.isShowItem
    }
    selectItem(item: IProductCategory) {
      this.$emit('select-item', item)
    }
    isSelected(item: IProductCategory) {
      return !!this.selectedProducts.find((p) => p.id === item.id)
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/ui/variables.scss";

  .grid-container {
    &__header {
      grid-column: 1 / 3;
      background-color: lighten(#2196F3, 20%);
      cursor: pointer;
      font-size: 18px;
      padding: $common-padding;
    }

    .grid-item {
      border-right: $border-inner;
      border-bottom: $border-inner;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .products-group {
    &__container {
      grid-template-columns: 1fr 1fr;
      margin: 5px;
      border-radius: 2px;
      border: $border-outher;

      &__item {
        grid-template-columns: auto 90px;
        cursor: pointer;
        transition: $common-transition;

        &:hover {
          background: $hover-color;

          .products-group__container__item__price {
            background: #b8b8b8;
          }
        }

        &__content {
          padding: $common-padding;
        }

        &__price {
          padding: $large-padding;
          text-align: center;
          font-weight: bold;
          background: #e6e6e6;
          transition: $common-transition;
        }
      }
    }
    &__toggle {
      transition: $common-transition;
    }

    &__toggle.opened {
      transform: rotate(180deg);
    }
  }
  .selected {
    .products-group__container__item__content, .products-group__container__item__price {
      background: $selected-color;
      transition: none;
    }
    &:hover {
      .products-group__container__item__content, .products-group__container__item__price {
        background: $selected-color;
      }
    }
  }
</style>
