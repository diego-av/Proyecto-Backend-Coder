import Container from "./container.js";
import ProductsContainer from "./productsContainer.js";

const productsContainer = new ProductsContainer('productos.json')

export default class CartContainer extends Container {
    constructor(filePath) {
        super(filePath);
    }

    async #cartExist(id) {
        const cart = await super.readFile();

        if (cart.length === 0) {
            const cartFound = false

            return { cart, cartFound }
        }

        let cartFound = cart.find(product => product.id === parseInt(id));

        if (cartFound) {
            return { cart, cartFound }
        }

        cartFound = false
        return { cart, cartFound }
    }

    async create() {
        const carts = await super.readFile();

        if (carts.length === 0) {
            const newCart = { id: this.lastId, timestamp: this.timestamp, products: [] }

            await super.writeFile([newCart]);
            return this.lastId
        } else {
            this.lastId = carts[carts.length - 1].id + 1;

            const newCart = { id: this.lastId, timestamp: this.timestamp, products: [] }

            await super.writeFile([...carts, newCart]);
            return this.lastId
        }
    }

    async saveItem(id, prodId) {
        const { cart, cartFound } = await this.#cartExist(id);

        if (cartFound === false) {
            return cartFound
        }

        const product = await productsContainer.getById(prodId);

        if (product === false) {
            return product
        }

        const cartIndex = cart.indexOf(cartFound);
        cartFound.products.push(product);

        cart[cartIndex] = cartFound;

        await super.writeFile(cart);
    }


    async getAllItems(id) {
        const { cartFound } = await this.#cartExist(id)

        if (cartFound === false) {
            return cartFound
        }

        return cartFound.products
    }

    async getById(id) {
        const { cartFound } = await this.#cartExist(id)
        if (cartFound === false) {
            return cartFound
        }
        return cartFound
    }

    async deleteById(id) {
        const { cart, cartFound } = await this.#cartExist(id);

        if (cartFound === false) {
            return cartFound
        }

        const deletedCart = cart.indexOf(cartFound);

        cart.splice(deletedCart, 1);

        await super.writeFile(cart);
    }


    async deleteItem(id, prodId) {
        const { cart, cartFound } = await this.#cartExist(id);

        if (cartFound === false) {
            return cartFound
        }

        const productFound = cartFound.products.find(product => product.id === parseInt(prodId));

        if (!productFound) {
            return false
        }
        const cartIndex = cart.indexOf(cartFound);

        const deletedProduct = cartFound.products.indexOf(productFound);

        cartFound.products.splice(deletedProduct, 1);

        cart[cartIndex] = cartFound

        await super.writeFile(cart);
    }
}