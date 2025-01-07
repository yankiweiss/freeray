const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js')

app.use(cors());
app.use(express.json());


app.post('/doctor', async (req, res)=>{
    try {
        const { name, title, social, placeOfBirth, dateOfBirth, homeAdress, city, state, zipCode, phoneNumber,cellPhone , faxNumber,emailAdress, officePhoneNumber, languages, professiolSpecialty  } = req.body;
        const newDoctor = await pool.query
        ('INSERT INTO doctor (name, title, social, placeOfBirth, dateOfBirth, homeAdress, city, state, zipCode, phoneNumber,cellPhone , faxNumber,emailAdress, officePhoneNumber, languages, professiolSpecialty ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *',
            [name, title, social, placeOfBirth, dateOfBirth, homeAdress, city, state, zipCode, phoneNumber,cellPhone , faxNumber,emailAdress, officePhoneNumber, languages, professiolSpecialty ]
        )
        res.json(newDoctor.rows[0])
    } catch (error) {
         console.log(error.message)
    }
})


app.get('/doctor', async(req, res)=> {
    try {
        const allDoctors = await pool.query("SELECT * FROM doctor")
        res.json(allDoctors.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.delete('/doctor', async (req, res) => {
    try {
        const deleteAllTodos = await pool.query('DELETE FROM doctor');

        res.json({ message: 'All doctors were deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(5001, ()=>{
console.log('Server has started on port 5001')
})