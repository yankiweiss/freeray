const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js')

app.use(cors());
app.use(express.json());


app.post('/doctor', async (req, res)=>{
    try {
        const { Name } = req.body;
        const newDoctor = await pool.query('INSERT INTO doctor (Name) VALUES($1) RETURNING *',
            [Name]
        )
        res.json(newDoctor.rows[0])
    } catch (error) {
         console.log(error.message)
    }
})


app.get("/doctor", async(req, res)=> {
    try {
        const allDoctors = await pool.query("SELECT * FROM doctor")
        res.json(allDoctors.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(5001, ()=>{
console.log('Server has started on port 5001')
})