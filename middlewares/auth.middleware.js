function checkLogin(req, res, next){
  if(req.session && !req.session.currentUserId) return res.redirect('/login');
  next();
};

function checkAnon(req, res, next){
  if(req.session && req.session.currentUserId) return res.redirect('/');
  next();
};

module.exports = {checkLogin, checkAnon};