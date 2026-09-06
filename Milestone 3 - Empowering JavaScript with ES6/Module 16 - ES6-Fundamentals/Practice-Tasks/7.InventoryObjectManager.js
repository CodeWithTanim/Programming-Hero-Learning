function manageInventoryObject(obj, action) {

    if (
        typeof obj !== "object" ||
        obj === null ||
        Array.isArray(obj)
    ) {
        return "Invalid";
    }

    if (action === "keys") {
        return Object.keys(obj);
    }

    if (action === "values") {
        return Object.values(obj);
    }

    if (action === "entries") {
        return Object.entries(obj);
    }

    if (action.startsWith("delete:")) {
        const property = action.split(":")[1];

        const newObj = { ...obj };

        delete newObj[property];

        return newObj;
    }

    if (action === "seal") {
        Object.seal(obj);
        return obj;
    }

    if (action === "freeze") {
        Object.freeze(obj);
        return obj;
    }

    return "Invalid";
}