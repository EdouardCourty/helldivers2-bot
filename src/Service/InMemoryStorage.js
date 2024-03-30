import moment from "moment";

export default class InMemoryStorage {
    static #storage = {};

    static set(key, value, ttl) {
        this.#storage[key] = this.#buildStorageObject(value, ttl)
    }

    static get(key) {
        const cacheStoredElement = this.#storage[key];

        if (cacheStoredElement === undefined) {
            return null;
        }

        const currentTimestamp = moment().unix();

        if (cacheStoredElement['valid_until'] < currentTimestamp) {
            delete this.#storage[key];
            return null;
        }

        return cacheStoredElement['value'];
    }

    static #buildStorageObject(value, ttl) {
        const currentDate = moment();

        return {
            'value': value,
            'valid_until': currentDate.add(ttl, 'seconds').unix()
        }
    }
}
