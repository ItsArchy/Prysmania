const express = require("express");
const fetch = require("node-fetch");
const session = require("express-session");

const app = express();

app.use(session({
  secret: "prysmania-secret", // cámbialo por uno más seguro en producción
  resave: false,
  saveUninitialized: false
}));

// Configuración de Discord
const CLIENT_ID = "1413724400779399330"; 
const CLIENT_SECRET = "YCOESZGzGOeKVgApejLweQ-tWPXm4XWI"; 
const REDIRECT_URI = "https://survariamc.com/callback"; // o http://localhost:3000/callback en pruebas

// Ruta para iniciar sesión
app.get("/login", (req, res) => {
  const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;
  res.redirect(url);
});

// Callback de Discord
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("No se recibió ningún código de Discord.");

  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    scope: "identify email"
  });

  // Solicitar token
  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  const tokenData = await response.json();

  // Obtener datos del usuario
  const userInfo = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const user = await userInfo.json();

  // Guardar en sesión
  req.session.user = user;

  res.send(`
    <h1>Bienvenido, ${user.username}#${user.discriminator}</h1>
    <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" width="100">
  `);
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
