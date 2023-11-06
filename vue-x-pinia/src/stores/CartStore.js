import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useLocalStorage } from "@vueuse/core";
import { useAuthStore } from "@/stores/authStore";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true,
  state: () => {
    return {
      items: useLocalStorage("CartStore:items", []),
    }
  },
  getters: {
    count: state => state.items.length,
    isEmpty: state => state.count === 0,
    grouped: state => {
      const grouped = groupBy(state.items, item => item.model);
      const sortedKeys = Object.keys(grouped).sort();
      let sorted = {}
      sortedKeys.forEach(key => sorted[key] = grouped[key]);
      return sorted;
    },
    groupCount: state => (name) => state.grouped[name].length,
    groupTotal: state => (name) => state.grouped[name][0].price * state.grouped[name].length,
    total: state => state.items.reduce((amount, item) => amount + parseFloat(item.price), 0),
  },
  actions: {
    addItems(item) {
      this.items.push({ ...item });
    },
    clearItem(itemName) {
      this.items = this.items.filter(item => item.model !== itemName);
    },
    checkout() {
      const authStore = useAuthStore();
      alert(`${authStore.username} just bought ${this.count} items at a total of $${this.total}`);
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}