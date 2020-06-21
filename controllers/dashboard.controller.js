
exports.getPage = function(req, res) {
  debugger;
  let user = req.user;
  if (!user) {
    res.redirect('/');
    return;
  }
  res.render('dashboard', {
    userDisplayName: user.cn,
    userObject: JSON.stringify(user, null, 2)
  });
};
