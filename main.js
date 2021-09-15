

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
<div class="product">
    <div class="product-image">
        <img v-bind:src="image">
    </div>

    <div class="product-info">
        <h1>{{title }}</h1>
        <p>{{descriptions}}</p>
        <a :href="link" target="_blank">More products like this</a>
        <p v-if="InStock">In Stock</p>
        <p v-else:class="{outOfStock: !InStock}">Out of Stock</p>
        <p v-if="onSale">On Sale!</p>
        <p v-else>Out of Stock</p>
        <p>{{sale }}</p>

        <p>Shipping: {{shipping}}</p>

        <ul>
            <li v-for="details in details">{{details}}</li>
        </ul>

        <div v-for="(variant,index) in variants" :key="variant.variantId" class="color-box"
            :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" :disabled="!InStock" :class="{disabledButton: !InStock}">Add to Cart</button>

        <button @click="removeToCart">Remove to Cart</button>
        <button v-on:click="removeToCart">Remove to Cart 2</button>
    </div>

    <div>
    <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet.</p>
    <ul>
<li v-for="review in reviews">
<p>{{review.name}}</p>
<p>{{review.review}}</p>
<p>{{review.rating}}</p>
</li>
    </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
    </div>
</div>`,
    data() {
        return {

            product: 'Socks',
            descriptions: 'A pair of warm, fuzzy socks',
            //image: './assets/vmSocks-blue.jpg',
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            //InStock: true,
            onSale: false,
            brand: 'Brand',
            selectedVariant: 0,
            details: ["80% cotton", "20% polyester", "Gender-Neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue.jpg',
                    variantQuantity: 0
                }
            ],
            reviews: []
        }

    },

    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },

        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },

        removeToCart() {
            this.cart -= 1
        },

        addReview(productReview) {
            this.reviews.push(productReview)
        }

    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        InStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            } else {
                return this.brand + ' ' + this.product + ' are not on sale!'
            }
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }

    }

})

Vue.component('product-review', {
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
    <input id="name" v-model="name">
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

    <p>
    <input type="submit" value="Submit">
    </p>

    `
    ,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                this.errors = []
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }


});