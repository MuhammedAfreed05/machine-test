const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

fs.readdirSync("./routes").map((f) => app.use("/api", require(`./routes/${f}`)));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})