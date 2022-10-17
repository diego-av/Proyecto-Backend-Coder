import Container from "./container.js";

export default class ProductsContainer extends Container {
    constructor(filePath) {
        super(filePath)
    }

    async #productExist(id) {
        const products = await super.readFile();

        if (products.length === 0) {
            const productFound = false

            return { products, productFound }
        }

        let productFound = products.find(product => product.id === parseInt(id));

        if (productFound) {
            return { products, productFound }
        }

        productFound = false
        return { products, productFound }
    }

    async save(data) {
        const products = await super.readFile();

        if (products.length === 0) {
            await super.writeFile([{ id: this.lastId, timestamp: this.timestamp, ...data }]);
            return this.lastId
        } else {
            this.lastId = products[products.length - 1].id + 1;


            await super.writeFile([...products, {id: this.lastId, timestamp: this.timestamp, ...data }]);
            return this.lastId
        }
    }

    async change(id, data) {
        const { products, productFound } = await this.#productExist(id);

        if (productFound === false) {
            return productFound
        }

        const dataKeys = Object.keys(data);

        const productIndex = products.indexOf(productFound);

        dataKeys.forEach(key => (productFound[key] = data[key])); // to change only the data that needs

        products[productIndex] = productFound;

        await super.writeFile(products);
    }

    async getAll() {
        const products = await super.readFile();
        return products
    }

    async getById(id) {
        const { productFound } = await this.#productExist(id);

        return productFound
    }

    async deleteById(id) {
        const { products, productFound } = await this.#productExist(id);

        if (productFound === false) {
            return productFound
        }

        const deletedProduct = products.indexOf(productFound);

        products.splice(deletedProduct, 1);

        await super.writeFile(products);
    }

    async deleteAll() {
        await super.writeFile([]);

        console.log("Productos borrados");
    }
}
