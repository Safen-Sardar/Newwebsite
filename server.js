const path = require('path');
const express = require('express');
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
// Use environment variable for token
const token = process.env.DISCORD_TOKEN || "NzExMzI4NTcwMzc0NjE5MjA3.GBZKOo.ljhUgexx90JRQVz1GRETS6SNdPgmwoxPdn6PTw";

// Initialize Discord client
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.login(token);

// Set view engine to EJS
//app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

async function getServers() {
    const guilds = await client.guilds.fetch().catch(() => null);
    return guilds.map(g => ({
        name: g.name,
        id: g.id,
    }));
}

app.get("/", async (req, res) => {
    const servers = await getServers();
    res.render('dashboard', { servers });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
