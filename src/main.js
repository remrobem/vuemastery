import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import "./registerServiceWorker";

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app");
var eventBus = new Vue();

Vue.component("product-tabs", {
  template: `
  <div>
      
  <ul>
    <span class="tabs" 
          :class="{ activeTab: selectedTab === tab }"
          v-for="(tab, index) in tabs"
          @click="selectedTab = tab"
          :key="tab"
    >{{ tab }}</span>
  </ul>

  <div v-show="selectedTab === 'Reviews'">
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>Rating:{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
      </ul>
  </div>

  <div v-show="selectedTab === 'Make a Review'">
    <product-review></product-review>
  </div>

</div>
  `,
  data() {
    return {
      tabs: ["Rviews", "Mke a Review"],
      selectedTab: "Reviews"
    };
  },
  props: {
    reviews: {
      type: Array,
      required: false
    }
  }
});

Vue.component("product-review", {
  template: `
  
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommend"/>
    </label>
    <p>
      <input required type="submit" value="Submit">  
    </p>    

    </form>
 

  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
      recommend: null
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommend) this.errors.push("Recommendation required.");
      }
    }
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: false
    }
  },
  template: `
    <div>
    
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >{{ tab }}</span>
      </ul>

      <div v-show="selectedTab === 'Reviews'">
          <p v-if="!reviews.length">There are no reviews yet.</p>
          <ul v-else>
              <li v-for="(review, index) in reviews" :key="index">
                <p>{{ review.name }}</p>
                <p>Rating:{{ review.rating }}</p>
                <p>{{ review.review }}</p>
              </li>
          </ul>
      </div>

      <div v-show="selectedTab === 'Make a Review'">
        <product-review></product-review>
      </div>
  
    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews"
    };
  }
});

Vue.component("info-tabs", {
  props: {
    shipping: {
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
    
      <ul>
        <span class="tabs" 
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              @click="selectedTab = tab"
              :key="tab"
        >{{ tab }}</span>
      </ul>

      <div v-show="selectedTab === 'Shipping'">
        <p>{{ shipping }}</p>
      </div>

      <div v-show="selectedTab === 'Details'">
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
      </div>
  
    </div>
  `,
  data() {
    return {
      tabs: ["Shipping", "Details"],
      selectedTab: "Shipping"
    };
  }
});

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

          <!-- <product-details :details="details"></product-details> -->
          <info-tabs :shipping="shipping" :details="details"></info-tabs>

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
          <div>
        </div>
      </div>
      </div>
      
      <product-tabs :reviews="reviews"></product-tabs>
      
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
      ],
      reviews: []
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
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
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
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
