const express = require('express');
const app = express();

app.get('/list', (req, res) => {
    const data = [];
    for (let i = 1; i < 13; i++) {
        data.push({
            name: `lixiao ${i}`,
            email: `lixiao ${i}@qq.com`
        });
    }
    setTimeout(() => {
        const result = {
            total: 12,
            data
        };
        res.send({
            status: 200,
            message: 'success',
            result
        })
    }, 500);
})

app.listen(8000);