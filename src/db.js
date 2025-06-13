class db {
    constructor() {
        this.reset();
    }

    reset() {
        this.entries = [];
    }

    addEntry({ order, targetTone, measuredPitch, photoPath = null }) {
        this.entries.push({ order, photoPath, targetTone, measuredPitch });
    }

    getAll() {
        return this.entries;
    }

    getByOrder(order) {
        return this.entries.find(entry => entry.order === order);
    }

    updatePhotoPath(order, path) {
        const entry = this.getByOrder(order);
        if (entry) {
            entry.photoPath = path;
        }
    }

    count() {
        return this.entries.length;
    }
}

export default new db();