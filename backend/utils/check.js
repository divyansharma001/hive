import db from "../config/database.js";

const getUsers = async () => {
    try {
        const res = await db.query('SELECT id, email, username, password FROM users');
        return res.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err; 
    }
};

getUsers().then(users => {
    console.log(users); 
}).catch(err => {
    console.error('Error retrieving users:', err)
});
