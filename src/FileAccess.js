import RNFS from 'react-native-fs'

const settingsFilePath = `${RNFS.DocumentDirectoryPath}/config.json`;

const fs = {
    clear_photo: async () => {
        try {
            const tmpDir = RNFS.TemporaryDirectoryPath;
            const files = await RNFS.readDir(tmpDir);
            for (const file of files) {
                await RNFS.unlink(file.path);
                console.log(`Deleted: ${file.path}`);
            }
        } catch (err) {
            console.warn("Failed to clean tmp:", err);
        }
    },
    save_settings: async (key, value) => {
        try {
            let settings = {};
            const exists = await RNFS.exists(settingsFilePath);
            if (exists) {
                const content = await RNFS.readFile(settingsFilePath, 'utf8');
                settings = JSON.parse(content);
            }
            settings[key] = value;
            console.log("save " + key + ": " + value)
            await RNFS.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), 'utf8');
        } catch (err) {
            console.warn("Failed to save settings:", err);
        }
    },
    load_settings: async (key, cb) => {
        let value = null
        try {
            const exists = await RNFS.exists(settingsFilePath);
            if (!exists) return null;
            const content = await RNFS.readFile(settingsFilePath, 'utf8');
            const settings = JSON.parse(content);
            if (settings.hasOwnProperty(key)) value = settings[key]
        } catch (err) {
            console.warn("Failed to load settings:", err);
        }
        return value
    },
    clear_settings: async () => {
        try {
            const exists = await RNFS.exists(settingsFilePath);
            if (exists) {
                await RNFS.unlink(settingsFilePath);
                console.log("Settings cleared.");
            }
        } catch (err) {
            console.warn("Failed to clear settings:", err);
        }
    },

    get_all_settings: async () => {
        try {
            const exists = await RNFS.exists(settingsFilePath);
            if (!exists) return {};
            const content = await RNFS.readFile(settingsFilePath, 'utf8');
            return JSON.parse(content);
        } catch (err) {
            console.warn("Failed to get all settings:", err);
            return {};
        }
    },
}

export default fs