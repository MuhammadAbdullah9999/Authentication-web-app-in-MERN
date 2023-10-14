const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./passport.js");

app.use(session({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true,
  cookie:{secure:false}
}));

app.use(passport.session());
app.use(passport.initialize());

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const SignUp = require("./Routes/SignUp");
const SignIn = require("./Routes/SignIn");
const Dashboard = require("./Routes/dashboard");
const logout = require("./Routes/Logout");
const ForgotPassword = require("./Routes/ForgotPassword");
const ResetPassword = require("./Routes/ResetPassword");



app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
	successRedirect: "http://localhost:5000/auth/google/success",
    failureRedirect: "http://localhost:3000/auth/google/failure",
  })
);

app.get("/auth/google/success", (req, res) => {
  console.log(req.user.token);
  
  if (req.user) {
    const token = req.user.token;
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true, // Ensures the cookie is accessible only via HTTP(S) requests
      secure: true, // Ensures the cookie is sent only over HTTPS in production
    });

    const redirectUrl = `http://localhost:3000/dashboard`;
    res.redirect(redirectUrl);
  } else {
    res.status(404).send("User data not found");
  }
});


app.get("/auth/google/failure", (req, res) => {
  res.send("An error occurred");
});

// Configure the login route
app.get("/auth/google",passport.authenticate("google", { scope: ["email", "profile"] }));


app.use("/signUp", SignUp);
app.use("/signIn", SignIn);
app.use("/Logout", logout);
app.use("/dashboard", Dashboard);
app.use("/forgot-password", ForgotPassword);
app.use("/reset-password", ResetPassword);

// Start the server
app.listen(5000, () => console.log("Server started on port 5000"));
