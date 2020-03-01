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
              <div class="center-block">
                {{ item.C | price }}
                <div v-if="previousGroup" class="d-inline-block">
                  <icons v-if="increasedPrice(item)" icon="arrow-down" class="price__down"/>
                  <icons v-else icon="arrow-up" class="price__up"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import { IGroupCategoryBody, IProductCategoryBody } from '@/modules/products/types/products.types'
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
    group: IGroupCategoryBody
    @Prop(Object)
    previousGroup: IGroupCategoryBody
    @Prop(Array)
    selectedProducts: IProductCategoryBody[]

    isShowItem: boolean = true

    toggleItem() {
      this.isShowItem = !this.isShowItem
    }
    selectItem(item: IProductCategoryBody) {
      this.$emit('select-item', item)
    }
    isSelected(item: IProductCategoryBody) {
      return !!this.selectedProducts.find((p) => p.id === item.id)
    }
    increasedPrice(item: IProductCategoryBody) {
      const previousStateItemPrice = this.previousGroup.B[item.id].C
      return previousStateItemPrice > item.C
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
      color: #fff;
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
        grid-template-columns: auto 140px;
        height: 100%;
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
          position: relative;
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
  .price {
    &__up {
      color: red;
    }
    &__down {
      color: green;
    }
  }
</style>
