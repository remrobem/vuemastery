import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import "./registerServiceWorker";

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");

var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    brand: "Vue Mastery",
    // image: "./img/vmSocks-green-onWhite.jpg",
    altText: "A pair of Green on White socks",
    // inStock: false,
    inventory: 0,
    onSale: false,
    details: ["80% Cotton", "20% Polyester", "Gender-neutral"],
    selectedVariant: 0,
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImage: "./img/vmSocks-green-onWhite.jpg",
        variantQuantity: 20
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "./img/vmSocks-blue-onWhite.jpg",
        variantQuantity: 0
      }
    ],
    cart: 0
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    onSaleMsg() {
      if (this.onSale) {
        return `${this.brand} ${this.product} are on SALE!`;
      } else {
        return `${this.brand} ${this.product} are not on SALE!`;
      }
    }
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      this.cart -= 1;
      if (this.cart < 0) {
        this.cart = 0;
      }
    },
    updateProduct(index) {
      this.selectedVariant = index;
      // this.image = variantImage;
      console.log(index);
    }
  }
});
console.log(app);
