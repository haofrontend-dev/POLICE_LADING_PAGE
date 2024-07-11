export const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
};

export const removeStorage = (key) => {
    localStorage.removeItem(key);
};