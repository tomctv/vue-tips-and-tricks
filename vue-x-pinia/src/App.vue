<script setup>
import CarList from "@/components/CarList.vue";
import Cart from "@/components/Cart.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      // console.log(args[0]);
    });
    onError((error) => {
      console.error("An error occurred while adding items to the cart", error);
    });
  }
});

productStore.fill();

function addToCart(product) {
  cartStore.addItems(product);
}
</script>

<template>
  <header class="main-header">
    <nav class="navbar">
      <h2 class="brand">Car Shop</h2>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button @click="cartStore.undo" :disabled="!cartStore.hasHistory">Undo</button>
        <button @click="cartStore.redo" :disabled="!cartStore.hasFuture">Redo</button>
        <Cart />
      </div>
    </nav>
  </header>
  <CarList @add-to-cart="addToCart" />
</template>

<style lang="scss" scoped>
.main-header {
  position: sticky;
  top: 0;
  z-index: 10;

  .navbar {
    background-color: #242424;
    border-bottom: 1px solid #3b3b3b;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .brand {
      margin: 0;
      font-size: 2rem;
    }
  }
}
</style>
