// server.mjs
// where your node app starts

// init project
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { configDotenv } from "dotenv";
configDotenv()
import nodemailer from "nodemailer";
import multiparty from "multiparty";
import cors from 'cors';
import matter from 'gray-matter';
const app = express();
app.set("view engine", "ejs");
app.use(cors());
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Alle Seiten auf HTTPS umleiten.
function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https

  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}
app.all("*", checkHttps);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// Die statischen Seiten in public und content werden als "statisch" definiert. So können Sie direkt adressiert werden.
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("content"));
app.use(express.static("secure"));

// This is the basic-routing
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});
// Routing der index.html als /index
app.get("/index", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});
// Routing der daten.html als /daten
app.get("/daten", (request, response) => {
  response.sendFile(`${__dirname}/views/daten.html`);
});
// Routing der schulbildung.html als /schulbildung
app.get("/schulbildung", (request, response) => {
  response.sendFile(`${__dirname}/views/schulbildung.html`);
});
// Routing der impressum.html als /impressum
app.get("/impressum", (request, response) => {
  response.sendFile(`${__dirname}/views/impressum.html`);
});

// *******************************
// Passwortgeschützter Bereich
// *******************************
//Render die Datei login.ejs, wenn die Login-Seite aufgerufen wird
app.get("/secure", (req, res) => {
  app.set("views", path.join(__dirname, "secure"));
  res.render("login", {
     posts: ' ',
  });
});

//Wenn die Anmeldedaten eingegeben worden sind, wird die Richtigkeit überprüft
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
  
  var userName1 = process.env.userName1;
  var userPass1 = process.env.userPass1;
  
  var userName2 = process.env.userName2;
  var userPass2 = process.env.userPass2;
  
 
	// Ensure the input fields exists and are not empty
	if (username && password) {
    
    if ((username !== userName1 || password !== userPass1) && (username !== user-Name2 || password !== userPass2)) {
              
              //Wenn die Logindaten nicht korrekt sind, melde dies;
              app.set("views", path.join(__dirname, "secure"));
              response.render("login", {
                  posts: 'Incorrect Username and/or Password!', 
              });
 
            } else {
              // Wenn die Daten korrekt sind, wird der passwortgeschützte Bereich aufgerufen
              response.redirect(`/safe-area.html#loggedin`);
              app.set("views", path.join(__dirname, "views"));
            }
  }	
})

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
