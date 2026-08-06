function printObjectDetails(obj, loopType) {

    if (loopType === "forin") {

        const result = [];

        for (const key in obj) {
            result.push(`${key}: ${obj[key]}`);
        }

        return result;
    }

    if (loopType === "forofentries") {

        const result = [];

        for (const [key, value] of Object.entries(obj)) {
            result.push(`${key}: ${value}`);
        }

        return result;
    }

    if (loopType === "entriesDestructure") {

        return Object.entries(obj).map(
            ([key, value]) => `${key}: ${value}`
        );
    }

    return "Invalid";
}