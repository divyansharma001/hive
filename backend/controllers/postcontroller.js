import db from "../config/database.js";

export const createPost = async () =>{
    try {
        const {description, id} = req.body;
        if(!description || !id){
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            })
        }
      const result = await db.query('INSERT INTO posts (id, description) VALUES ($1, $2) RETURNING *',
            [id, description]
        )
        return res.status(201).json({
            message: "Post created successfully",
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        })
    }
}