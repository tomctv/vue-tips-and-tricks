<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();
const showCart = ref(false);
</script>
    
<template>
  <div class="cart-dropdown" v-click-outside="() => showCart = false">
    <button class="cart-button" @click="showCart = !showCart">
      Cart
      <span class="cart-count" v-if="cartStore.count > 0">{{ cartStore.count }}</span>
    </button>

    <div class="cart-content" v-if="showCart">
      <div class="cart-header">
        <h2>Cart</h2>
        <button class="delete-button" @click="cartStore.$reset">Clear cart</button>
      </div>
      <p v-if="cartStore.isEmpty">Cart is empty</p>
      <div v-else>
        <ul class="cart-items-list">
          <li class="cart-item" v-for="(items, name) in cartStore.grouped" :key="name">
            <div class="cart-item-start">
              <div class="thumbnail">
                <img :src="items[0].image" :alt="`${items[0].manufacturer} ${items[0].model}`">
              </div>
              <p>{{ `${items[0].manufacturer} ${items[0].model}` }}</p>
            </div>
            <div class="cart-item-end">
              <span>${{ cartStore.groupTotal(name) }}</span>
              <span class="cart-item-count">{{ cartStore.groupCount(name) }}</span>
              <button class="delete-button" @click.stop="cartStore.clearItem(name)">Delete</button>
            </div>
          </li>
        </ul>
        <div style="display: flex; align-items: center; justify-content: end; gap: 1rem;">
          <h4 style="text-align:end;">Total: ${{ cartStore.total }}</h4>
          <button class="delete-button" @click="cartStore.checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.cart-dropdown {
  display: inline-block;
  position: relative;

  .cart-button {
    position: relative;

    .cart-count {
      position: absolute;
      top: -12px;
      background: #646cff;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      margin-left: 0.25rem;
    }
  }

  .cart-content {
    z-index: 1;
    position: absolute;
    top: 3rem;
    right: 0;
    background: #353535;
    border-radius: 8px;
    padding: 1rem;
    max-width: 450px;
    width: 1000px;
    max-height: 450px;
    overflow-y: auto;

    .cart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    h2 {
      text-align: left;
      margin: 0 0 0.5rem 0;
    }

    .delete-button {
      padding: 0.5rem;
      font-size: 0.75rem;
    }

    .cart-items-list {
      list-style: none;
      margin: 0;
      padding: 0;
      text-align: left;

      .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.25rem 0;

        &:not(:last-child) {
          border-bottom: 1px solid #464646;
        }

        .cart-item-start,
        .cart-item-end {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .thumbnail {
          max-width: 65px;

          img {
            max-width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .cart-item-count {
          background: #646cff;
          padding: 0.1rem 0.5rem;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>