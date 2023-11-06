<script setup>
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/ProductStore";

const { products } = storeToRefs(useProductStore());

const emit = defineEmits(['addToCart']);

function addProductToCart(product) {
  emit('addToCart', product);
}
</script>

<template>
  <section>
    <h1 style="text-align: left;">Models</h1>

    <ul class="car-list">
      <li v-for="product in products" :key="JSON.stringify(product)">
        <div class="car-list-item">
          <figure class="image">
            <img :src="product.image" :alt="`${product.manufacturer} ${product.model}`">
          </figure>
          <div class="info">
            <div>
              <p class="car-manufacturer">{{ product.manufacturer }}</p>
              <h2 class="car-model">{{ product.model }}</h2>
            </div>
            <h3>${{ product.price }}</h3>
          </div>
          <button @click="addProductToCart(product)">Add to the cart</button>
        </div>
      </li>
    </ul>
  </section>
</template>


<style lang="scss" scoped>
.car-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;

  li {
    width: calc(50% - 0.75rem);
    margin-bottom: 1.5rem;
  }

  .car-list-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #3b3b3b;
    border-radius: 10px;
    padding: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    will-change: border-color;
    transition: border-color 0.3s ease-out;

    &:hover {
      border-color: #646cffaa;

      img {
        filter: drop-shadow(0 0 2em #646cffaa);
      }

      .car-model {
        color: #646cff;
      }
    }

    .image {
      margin: 0;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        will-change: filter;
        transition: filter 0.3s ease-out;
      }
    }

    .info {
      flex: 2;
      text-align: left;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: last baseline;

      .car-manufacturer {
        text-transform: uppercase;
        letter-spacing: 0.25rem;
        margin: 0px 0px 0.5rem 0px;
        color: grey;
        font-size: 1rem;
      }

      .car-model {
        line-height: 2rem;
        font-size: 2rem;
        margin: 0px;
        will-change: color;
        transition: color 0.3s ease-out;
      }
    }
  }
}
</style>