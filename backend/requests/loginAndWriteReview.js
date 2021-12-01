const loginAndWriteReview = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {review, user} = params;
  const {email, password} = user;

  const _user = await mongo.findUser({email});

  if (!_user) {
    io.notification("User not found.");
    return;
  }

  const isVerified = await crypto.verifyPassword(password, _user.password);

  if (!isVerified) {
    io.notification("Wrong password.");
    return;
  }

  review.username = _user.username;

  const updated = await mongo.insertReview(review);

  if (!updated) { return; }

  const {_id} = _user;
  const id = _id.toHexString();
  const options = {expiresIn: "1d"};
  const token = crypto.signToken(id, options);

  io.emit("loginAndWriteReview", {user: {token, ..._user}});
  io.notification("Review posted successfully.");
};

module.exports = loginAndWriteReview;