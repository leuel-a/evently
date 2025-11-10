require('dotenv').config()

import express from 'express';

const app = express();
const port = process.env.PORT;


// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with better auth
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});
