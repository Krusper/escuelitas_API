const express = require('express');
const routes = express.Router();

routes.post('/add', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: 'No se encontro conexion',
                error: err
            })
        }else{
            conn.query('call bd_escuelas.movimientos( ?, ?, ?, ?);', [req.body.tipoMov, req.body.fecha, req.body.concepto, req.body.importe], (err, rows) => {
                if (err){
                    res.status(400).json({
                        status: 400,
                        message: 'Fallo al insertar',
                        error: err
                    });
                }else{
                    res.status(200).json({
                        status: 200,
                        message: 'Insertado con exito'
                    });
                };
                
            })
        };
    })
})

routes.get('/corte', (req, res) =>{
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: 'No se encontro conexion',
                error: err
            })
        } else {
            conn.query('call bd_escuelas.cortes(?, ?);', [req.query.fechaInicio, req.query.fechaFin], (err, rows) =>{
                if (err) {
                    res.status(400).json({
                        status: 400,
                        message: 'Fallo al obtener datos',
                        error: err
                    });
                }else{
                    let ingresosTotal = 0;
                    let egresosTotal = 0;

                    rows[0].forEach(mov => {
                        if (mov.Tipo === 1) {
                            ingresosTotal += mov.Importe;
                        }else{
                            egresosTotal += mov.Importe;
                        }
                    });

                    res.status(200).json({
                        movimientos: rows[0],
                        totalIngresos: ingresosTotal,
                        totalEgresos: egresosTotal,
                        total: ingresosTotal - egresosTotal
                    })
                }
            })
        }
    })
})


routes.get('/informe', (req, res) =>{
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).json({
                status: 500,
                message: 'No se encontro conexion',
                error: err
            })
        } else {
            conn.query('call bd_escuelas.informes(?, ?);', [req.query.fechaInicio, req.query.fechaFin], (err, rows) =>{
                if (err) {
                    res.status(400).json({
                        status: 400,
                        message: 'Fallo al obtener datos',
                        error: err
                    });
                }else{

                    res.status(200).json({
                        movimientos: rows[0],
                    })
                }
            })
        }
    })
})

// routes.options('/', (req, res) =>{
//     res.set("Access-Control-Allow-Origin", "*");
//     res.set("Access-Control-Allow-Methods", "*");
//     res.set("Access-Control-Allow-Headers", "*");
//     res.status(204).send();
// })



module.exports = routes