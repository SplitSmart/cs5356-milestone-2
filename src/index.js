const functions = require("firebase-functions")
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 8080;

// CS5356 TODO #2
// Uncomment this next line after you've created
// serviceAccountKey.json
const serviceAccount = require("./../serviceAccountKey.json");
const userFeed = require("./app/user-feed");
const authMiddleware = require("./app/auth-middleware");

const firebaseConfig = {
  apiKey: "AIzaSyD8kvL9cgcg-G2TCNnXygmGMXNdSmnN6jU",
  authDomain: "ruffhouse-cd734.firebaseapp.com",
  projectId: "ruffhouse-cd734",
  storageBucket: "ruffhouse-cd734.appspot.com",
  messagingSenderId: "364754588322",
  appId: "1:364754588322:web:7f41055433c85ea096bdfb"
};

// CS5356 TODO #2
// Uncomment this next block after you've created serviceAccountKey.json
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// use cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/static", express.static("static/"));

// use res.render to load up an ejs view file
// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/sign-in", function (req, res) {
  res.render("pages/sign-in");
});

app.get("/sign-up", function (req, res) {
  res.render("pages/sign-up");
});

app.get("/add-friend", function (req, res) {
  res.render("pages/add-friend");
});

app.get("/dashboard", authMiddleware, async function (req, res) {
  const feed = await userFeed.get();
  res.render("pages/dashboard", { user: req.user, feed });
});

  // CS5356 TODO #4
  // Get the ID token from the request body
  // Create a session cookie using the Firebase Admin SDK
  // Set that cookie with the name 'session'
  // And then return a 200 status code instead of a 501


app.post('/sessionLogin', async (req, res) => {
  // Get the ID token passed and the CSRF token.
  const idToken = req.body.idToken.toString();
  // const csrfToken = req.body.csrfToken.toString();
  // Guard against CSRF attacks.
  // if (csrfToken !== req.cookies.csrfToken) {
  //   res.status(401).send('UNAUTHORIZED REQUEST!');
  //   return;
  // }
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  admin.auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        res.cookie('__session', sessionCookie, options);
        res.end(JSON.stringify({ status: 'success' }));
        res.status(200).send();
      },
      (error) => {
        res.status(401).send('UNAUTHORIZED REQUEST!');
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("__session");
  res.redirect("/sign-in");
});

app.post("/dog-messages", authMiddleware, async (req, res) => {
  // CS5356 TODO #5
  // Get the message that was submitted from the request body
  // Get the user object from the request body
  // Add the message to the userFeed so its associated with the user
  await userFeed.add(req.user, req.body.message);
  return res.redirect("/dashboard");
});

exports.app = functions.https.onRequest(app);
 //app.listen(port);
 //console.log("Server started at http://localhost:" + port);
