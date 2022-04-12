import express from 'express';

const app = express();

app.get("/", (req, res) => {
    return res.json({test:true});
});

export default app;