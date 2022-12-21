const express = require('express');
const routes = express.Router();
// Obtener datos de la tabla
routes.get('/', (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) return res.send(err);
            conn.query('SELECT * FROM localidad', (err, rows)=>{
                if (err) return res.send(err);
                res.json(rows);
            })
        
    })
})
//Insertar datos en la tabla
routes.post('/', (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) return res.send(err);
            conn.query('INSERT INTO localidad set ?', [req.body], (err, rows)=>{
                if (err) return res.send(err);
                res.send('Localidad registrada');
            })
        
    })
})
//Borrar datos de la tabla por ID_localidad
routes.delete('/:ID_localidad', (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) return res.send(err);
            conn.query('DELETE FROM localidad WHERE ID_localidad = ?', [req.params.ID_localidad], (err, rows)=>{
                if (err) return res.send(err);
                res.send('Localidad Eliminada');
            })
        
    })
})
//Actualizar datos de la tabla por ID_localidad
routes.put('/:ID_localidad', (req, res)=>{
    req.getConnection((err,conn)=>{
        if (err) return res.send(err);
            conn.query('UPDATE localidad set ? WHERE ID_localidad = ?', [req.body, req.params.ID_localidad], (err, rows)=>{
                if (err) return res.send(err);
                res.send('Localidad actualizada');
            })
        
    })
})



module.exports = routes