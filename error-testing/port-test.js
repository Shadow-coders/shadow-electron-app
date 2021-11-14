const express = require('express');
express()
.get('/', (req,res) => res.json(req.query))
.listen(8080, () => console.log('try'))