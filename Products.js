'use strict'

// Define Product
var Product = function(sku, name, price) {
	this.sku = sku;
	this.name = name;
	this.price = price;
}

// Define Catalogue consisting of all Products available
var Catalogue = function() {
	this.products = [
		new Product('ipd', 'Super iPad', 549.99),
		new Product('mbp', 'Macbook Pro', 1399.99),
		new Product('atv', 'Apple TV', 109.50),
		new Product('vga', 'VGA Adapter', 30.00),
	];
}

// Get a Product from Catalogue given product's SKU
Catalogue.prototype.getProduct = function(sku) {
	return this.products.filter(function(product) {
		return product.sku == sku
	})[0]
}

// Checkout Model
var Checkout = function() {
	this.cart = {}
	this.catalogue = new Catalogue();
}

// Scan function to add product to cart
Checkout.prototype = {
	getProductPrice: function(product, count) {
		return product.price*count;
	},
	scan: function(sku) {
		if(!this.cart.hasOwnProperty(sku)) {
			this.cart[sku] = 1
		} else {
			this.cart[sku] = this.cart[sku] + 1	
		}
	},
	total: function() {
		var self = this;
		return Object.keys(self.cart)
			.map(function(sku) {
				var product = self.catalogue.getProduct(sku);
				var count = self.cart[sku];
				return self.getProductPrice(product, count)
			})
			.reduce(function(sum, price) {
				return sum+price;
			}, 0)
			.toFixed(2)
	}
}

// For festive season, create a new checkout function with a different function to calculate product price
var SpecialCheckout = function() {}

SpecialCheckout.prototype = new Checkout()

SpecialCheckout.prototype.getProductPrice = function(product, count) {
	switch(product.sku) {
		case 'atv':
			return (2*parseInt(count/3) + count%3)*(product.price);
		case 'ipd':
			var discounted_price = (count > 4) ? 499.99 : product.price;
			return discounted_price*count
		case 'vga':
			var notFree = this.cart.hasOwnProperty('mbp') ? (count - this.cart['mbp']) : count;
			return notFree*product.price;
		default:
			return product.price*count
	}
}

var c = new Checkout();
c.scan('ipd');
c.scan('ipd');
c.scan('mbp');
console.log(c.total())

var sc = new SpecialCheckout();

sc.scan('atv');
sc.scan('atv');
sc.scan('atv');
sc.scan('atv');
sc.scan('atv');
sc.scan('ipd');
sc.scan('ipd');
sc.scan('ipd');
sc.scan('ipd');
sc.scan('ipd');
sc.scan('vga');
sc.scan('vga');
sc.scan('mbp');
console.log(sc.total())


// 4*109.5 + 5*499.99 + 1*30 + 1*1399.99