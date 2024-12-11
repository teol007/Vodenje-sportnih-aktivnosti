const db = require("../database");

exports.addRatingToEvent = (req, res) => {
    const { eventId } = req.params;
    const { date, rating, comment } = req.body;
    db.run(
        `INSERT INTO ratings (date, rating, comment, eventId) VALUES (?, ?, ?, ?)`,
        [date, rating, comment, eventId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID });
            }
        }
    );
};

exports.getAllRatingsOfEvent = (req, res) => {
    const { eventId } = req.params;
    db.all("SELECT * FROM ratings WHERE eventId = ?;", 
        [eventId], 
        (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.deleteRating = (req, res) => {
    const { ratingId } = req.params;
    db.run(
        `DELETE FROM events WHERE id = ?`,
        [ratingId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: "Ocena uspešno izbrisana" });
            }
        }
    );
};


// Update event with notifications for registered users
exports.updateRating = (req, res) => {
    const { ratingId } = req.params;
    const { date, rating, comment } = req.body;

    if (!date || !rating || !comment) {
        return res.status(400).json({ error: "Podatki, ki so obvezni manjkajo." });
    }

    db.run(
        `UPDATE ratings SET date = ?, rating = ?, comment = ? WHERE id = ?`,
        [date, rating, comment, ratingId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Ocena ni najdena' });
            }
            res.status(200).json({ message: 'Ocena posodobljena', id: Number(ratingId) });
        }
    );
};
