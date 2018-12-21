const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const CORS = require("cors");

/**** Configuration ****/
const port = process.env.PORT || 8000;
const app = express();
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan("combined")); // Log all requests to the console 1 sec
app.use(CORS());
app.use(express.static('../dist/reviewApp'))

// setup mongoose
const MONGO_URI =
  "mongodb://admin:Reviewapp1@ds137634.mlab.com:37634/reviewwebapp";

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", () => {
  console.error("MongoDB connection error", MONGO_URI);
});

db.once("open", () => {
  console.info("MongoDB connected", MONGO_URI);
});

const User = require("./models/user");
const Domain = require("./models/domain");
const Review = require("./models/review");
const config = require("./config/dabase");

/**** Reroute all unknown requests to angular index.html ****/
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../dist/reviewApp/index.html"));
});

// register new user
app.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      let payload = { user: registeredUser._id };
      let token = jwt.sign(payload, config.secret);
      res.status(200).send({ token });
    }
  });
});

// login
app.post("/login", (req, res) => {
  let userData = req.body;

  //login api
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (user.password !== userData.password) {
          res.status(401).send("Invalid password");
        } else {
          let payload = { user: user._id };
          let token = jwt.sign(payload, config.secret);
          res.status(200).send({ token });
        }
      }
    }
  });
});

/**
 * Domain
 */
app.get("/domain/:name", async (req, res) => {
  try {
    const domain = await Domain.findOne({ name: req.params.name });
    res.json(domain);
  } catch (e) {
    res.status(400).send({ error: "Unable to find domain" });
  }
});

app.get("/domain", async (req, res) => {
  const domains = await Domain.find();
  res.json(domains);
});

app.post("/domain", verifyToken, (req, res) => {
  const url = req.body.url;
  const name = req.body.name;
  const domain = new Domain({ name, url });

  domain.save(error => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(true);
    }
  });
});

/**
 * Review
 */
app.post("/domain/:name/review", verifyToken, async (req, res) => {
  const userId = req.token.user;
  const domain = await Domain.findOne({ name: req.params.name });

  const title = req.body.title;
  const description = req.body.description;
  const score = req.body.score;

  const review = new Review({
    title,
    userId,
    description: description,
    domainId: domain._id,
    score: score
  });

  try {
    await review.save();
    res.json(true);
  } catch (e) {
    res.status(400).send({ error: "Unable to create review" });
  }
});

app.get("/domain/:name/review", async (req, res) => {
  const domain = await Domain.findOne({ name: req.params.name });
  const reviews = await Review.find({ domainId: domain._id });
  res.json(reviews);
});

app.get("/review", async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

/**** Start ****/
app.listen(port, () =>
  console.log(`Review webapp API running on port ${port}!`)
);

function verifyToken(req, res, next) {
  const tokenHeader = req.headers["authorization"]; // Create token found in headers
  // Check if token was found in headers
  if (!tokenHeader) {
    res.json({ success: false, message: "No token provided" }); // Return error
  } else {
    const token = tokenHeader.replace("Bearer ", "");
    // Verify the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      // Check if error is expired or invalid
      if (err) {
        res.json({ success: false, message: "Token invalid: " + err }); // Return error for token validation
      } else {
        req.token = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
      }
    });
  }
}
