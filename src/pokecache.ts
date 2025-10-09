export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        const cacheEntry = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, cacheEntry);
        console.log(`added to cache ${key} / ${cacheEntry.val}`);
    }

    get<T>(key: string): T | undefined {
        const cacheEntry = this.#cache.get(key);
        if (cacheEntry === undefined) {
            return undefined;
        }

        return cacheEntry.val;
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

    #reap() {
        let keysToDelete = [];
        const reapDate = Date.now() + this.#interval;
        for (const [key, value] of this.#cache) {
            if (value !== undefined && value.createdAt < reapDate) {
                keysToDelete.push(key);
            }
        }
        for (const key of keysToDelete) {
            this.#cache.delete(key);
            console.log(`deleting key ${key}`);
        }
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
}