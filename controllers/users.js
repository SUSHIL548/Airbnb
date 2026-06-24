const user = require("../models/user");

module.exports.signup = async(req, res) => {
    try{
      let {username, email, password} = req.body;
      const newUser = new user ({email, username});
      const registeredUser = await user.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
      if(err) {
        return next (err);
      } 
      req.flash( "Welcome to wanderlust You are logged in!");
      res.redirect("/listings");   
    });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
};

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login =  async(req, res) => {
        req.flash("Welcome to Wanderlust! You are logged in!");
        let redirectUrl = res.locals.rdirectUrl || "/listings";
         res.redirect (redirectUrl);
    };

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        } req.flash("success", "you arelogged out!");
        res.redirect("/listings");
    });
};

