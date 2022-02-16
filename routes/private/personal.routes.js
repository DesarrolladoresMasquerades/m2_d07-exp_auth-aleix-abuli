const { Router } = require("express");
const router = new Router();
const {checkLogin, checkAnon} = require('../../middlewares/auth.middleware');
const fileUploader = require('../../config/cloudinary.config');
const UserModel = require("../../models/User.model");

/* GET home page */
router.get("/", checkLogin, (req, res, next) => { // checklogin is a middleware (a function) that sits between the path and the request
  UserModel.findById(req.session.currentUser._id)
  .then((user)=>{
    res.render("users/user-profile", {userInSession: user});
  })
  .catch(err=>console.log('STILL NOT WORKING'));
});

router.route('/edit')
.get((req, res)=>{
  res.render('users/edit-profile');
})
.post(fileUploader.single('imgUrl'), (req, res)=>{
  const id = req.session.currentUserId;
  const username = req.body.username;
  
  const imgUrl = req.file.path;

  UserModel.findByIdAndUpdate(id, {username, imgUrl}, {new: true})
  .then(user => res.render('users/user-profile', {userInSession: user}));
});

module.exports = router;
