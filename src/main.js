import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import "./registerServiceWorker";

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class='product'>
      
        
      <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText">
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ onSaleMsg }}</p>
        <p>User is premium: {{ premium }}</p>
        <p>Shipping: {{ shipping }}</p>
   

        <div>
          <!-- <p v-if="inventory > 10">In Stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Order Soon</p>
          <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
          <p v-show="inventory > 0">Order</p>
          <p v-if="inStock">Instock Indicator</p> -->
          <p v-if="inStock">In Stock</p>
          <!-- variantQuantity of 0 is falsey, so !inStock is true -->
          <!-- the : !inStock seems to be redundant and optional -->
          <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>  

          <product-details :details="details"></product-details>

          <div>Variants</div>
          <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId"
          :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
          <!-- <div class="color-box" v-for="variant in variants" :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(variant.variantImage)"> -->
            <!-- {{ variant.variantColor}} -->
            <!-- <ul> -->
            <!-- <li @mouseover="updateProduct(variant.variantImage)"> {{ variant.variantColor}}</li> -->
            <!-- <li> {{ variant.variantColor}}</li> -->
            <!-- </ul> -->
          </div>

         
            <!-- sets the button to disabled do it won't work, also have to change colorby setting to a CSS class attribute -->
          <div>
            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
          </div>
          <div>
            <button v-on:click="removeFromCart">Remove From Cart</button>
          </div>
          

        </div>
      </div>
    </div>
  
`,
  data() {
    return {
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
      ]
      // cart: 0
    };
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
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      // this.cart -= 1;
      // if (this.cart < 0) {
      //   this.cart = 0;
      // }
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
      // this.image = variantImage;
      console.log(index);
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      let deleteIndex = this.cart.indexOf(id);
      this.cart.splice(deleteIndex, 1);
    }
  }
});
console.log(app);
