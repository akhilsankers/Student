const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/read-file', (req, res) => {
    const StudentName = req.query.name;
    if (!StudentName) {
        return res.status(400).json({ error: 'Please provide a name query parameter as (?name=Studentname)' })
    }
    fs.readFile('student.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading the file '})
        }
        console.log(data);
        const students = JSON.parse(data);
        console.log(students)
        const Student = students.find(s=> s.name.toLowerCase() === StudentName.toLowerCase());
        if(!Student){
            return res.status(404).json({error: 'Student not Found'});
        }
        res.json(Student);
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})