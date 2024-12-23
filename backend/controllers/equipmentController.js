const db = require("../database");

exports.addEquipmentToEvent = (req, res) => {
    const { eventId } = req.params;
    const { name, description, cost, pieces } = req.body;
    db.run(
        `INSERT INTO equipment (name, description, cost, pieces, eventId) VALUES (?, ?, ?, ?, ?)`,
        [name, description, cost, pieces, eventId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID });
            }
        }
    );
};

exports.getAllEquipmentOfEvent = (req, res) => {
    const { eventId } = req.params;
    db.all("SELECT * FROM equipment WHERE eventId = ?;", 
        [eventId], 
        (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(rows);
        }
    });
};

exports.getEquipmentWithId = (req, res) => {
    const { equipmentId } = req.params;
    console.log(equipmentId)
    db.all("SELECT * FROM equipment WHERE id = ? LIMIT 1;", 
        [equipmentId], 
        (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(rows[0]);
        }
    });
};

exports.deleteEquipment = (req, res) => {
    const { equipmentId } = req.params;
    db.run(
        `DELETE FROM equipment WHERE id = ?`,
        [equipmentId],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ message: "Oprema uspešno izbrisana" });
            }
        }
    );
};


// Update event with notifications for registered users
exports.updateEquipment = (req, res) => {
    const { equipmentId } = req.params;
    const { name, description, cost, pieces } = req.body;

    if (!name || !description || !cost || !pieces) {
        return res.status(400).json({ error: "Podatki, ki so obvezni manjkajo." });
    }

    db.run(
        `UPDATE equipment SET name = ?, description = ?, cost = ?, pieces = ? WHERE id = ?`,
        [name, description, cost, pieces, equipmentId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Oprema ni najdena' });
            }
            res.status(200).json({ message: 'Oprema posodobljena', id: Number(equipmentId) });
        }
    );
};
