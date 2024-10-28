import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;


export const getDB = async () => {
    let db;
    try {
        // Try to read the database file
        db = await fs.readFile(DB_PATH, "utf-8");
    } catch (err) {
        if (err.code === 'ENOENT') {
            // If file doesn't exist, initialize with a default structure
            console.log("Database file not found. Creating a new one.");
            db = { favorite: "" };
            await saveDB(db);  // Save the default structure to create the file
        } else {
            console.error("Error reading database:", err);
            throw err;
        }
    }
    return typeof db === 'string' ? JSON.parse(db) : db;
}

export const saveDB = async (db) => {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    } catch (err) {
        console.error(err);
    }
    return db;
}

// Function to update the favorite city
export const updateFavoriteCity = async (newFavorite) => {
    const db = await getDB();

    // Check if there's an existing favorite and update it accordingly
    if (db.favorite) {
        console.log(`Replacing favorite city: ${db.favorite} with ${newFavorite}`);
    } else {
        console.log(`Adding new favorite city: ${newFavorite}`);
    }

    // Update the favorite city
    db.favorite = newFavorite;

    // Save the updated database
    await saveDB(db);
    return db.favorite;
}

