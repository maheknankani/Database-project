import express from 'express';
import { db } from '../db.js'; 
const router = express.Router();

// Get distinct years
router.get('/years', async (req, res) => {
    try {
        const query = `SELECT DISTINCT year FROM recap ORDER BY year;`;
        const { rows } = await db.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ 
            error: err.message,
            detail: err.detail,
            code: err.code
        });
    }
});

// Get distinct semesters for a given year
router.get('/Semesters/:year', async (req, res) => {
    try {
        const { year } = req.params;
        // console.log(req.params);
        const query = `SELECT DISTINCT semester FROM recap WHERE year = $1;`;
        const { rows } = await db.query(query, [year]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get distinct classes (Batch) for a given year and semester
router.get('/Batch/:year/:semester', async (req, res) => {
    try {
        const { year, semester } = req.params;
        // console.log(req.params);
        const query = `SELECT DISTINCT class FROM recap WHERE year = $1 AND semester = $2;`;
        const { rows } = await db.query(query, [year, semester]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get GPA for a specific batch, semester, and year
router.get('/GPA/:year/:semester/:Batch', async (req, res) => {
    try {
        const { year, semester, Batch } = req.params;
        // console.log(req.params)
        const result = await db.query(
            `SELECT
    regno,
    name,
    ROUND(SUM(mul) / SUM(cr), 2)cgpa
FROM (
	SELECT 
        s.*,r.*,(c.theory+c.lab)cr, (g.gpa * (c.theory+c.lab))mul 
FROM    
    cmarks m, 
    grade g, 
    recap r, 
    course c, 
    student s
WHERE
    ROUND(m.marks) BETWEEN g.start AND g.end
    AND m.rid = r.rid
    AND r.cid = c.cid
    AND m.regno = s.regno
    AND hid = 246
	
    AND year = $1
    AND semester = $2
    AND r.class = $3
    )
GROUP BY 
    regno,name,semester,year
ORDER BY 
    year, cgpa desc;
`, 
            [year, semester, Batch]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send(err.message);
    }   
});

export default router;