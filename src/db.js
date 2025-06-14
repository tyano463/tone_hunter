/**
 * In-memory database for storing pitch measurement entries.
 * Each entry contains order, target tone, measured pitch, and an optional photo path.
 */
class db {
    /**
     * Constructs the db and initializes it.
     */
    constructor() {
        this.reset();
    }

    /**
     * Clears all stored entries.
     */
    reset() {
        this.entries = [];
    }

    /**
     * Adds a new pitch entry to the database.
     *
     * @param {Object} params
     * @param {number} params.order - Order of the entry.
     * @param {number} params.targetTone - Target MIDI note.
     * @param {number} params.measuredPitch - Measured pitch frequency in Hz.
     * @param {string|null} [params.photoPath=null] - Optional path to photo.
     */
    addEntry({ order, targetTone, measuredPitch, photoPath = null }) {
        this.entries.push({ order, photoPath, targetTone, measuredPitch });
    }

    /**
     * Returns all entries.
     *
     * @returns {Array<Object>} List of entries.
     */
    getAll() {
        return this.entries;
    }

    /**
     * Returns a specific entry by its order.
     *
     * @param {number} order - Order to search for.
     * @returns {Object|undefined} Entry if found, otherwise undefined.
     */
    getByOrder(order) {
        return this.entries.find(entry => entry.order === order);
    }

    /**
     * Updates the photo path of a specific entry.
     *
     * @param {number} order - Order of the entry to update.
     * @param {string} path - New photo path.
     */
    updatePhotoPath(order, path) {
        const entry = this.getByOrder(order);
        if (entry) {
            entry.photoPath = path;
        }
    }

    /**
     * Returns the number of stored entries.
     *
     * @returns {number} Entry count.
     */
    count() {
        return this.entries.length;
    }
}

/**
 * Singleton instance of the in-memory pitch database.
 * @type {db}
 */
export default new db();
