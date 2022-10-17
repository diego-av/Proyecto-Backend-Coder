import fs from 'fs'

export default class Container{
    #filePath;

    constructor(filePath) {
        this.#filePath = filePath
        this.lastId = 1
        this.timestamp = Date.now()
    }

    async readFile() {
        try {
            const res = await fs.promises.readFile(this.#filePath, "utf-8");
            
            if (res.length === 0) {// if the file is empty
                return res
            }

            const content = JSON.parse(res);
            return content

        } catch (error) {
            console.log(error);
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(this.#filePath, JSON.stringify(data), "utf-8");
        } catch (error) {
            console.log(error);
        }
    }
}