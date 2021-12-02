const loginAndWriteReview = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {review, user} = params;
  const {firstName, lastName, email, username, password} = user;

  const [userByEmail, userByUsername] = await Promise.all([
    mongo.findUser({email}),
    mongo.findUser({username})
  ]);

  if (userByEmail) {
    io.notification("Email taken.");
    return;
  }

  if (userByUsername) {
    io.notification("Username taken.");
    return;
  }

  const hashedPassword = await crypto.hashPassword(password);

  if (!hashedPassword) { return; }

  const inserted = await mongo.insertUser({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    referals: []
  });

  if (!inserted.acknowledged) { return; }

  const updated = await mongo.insertReview(review);

  if (!updated) { return; }

  const _user = await mongo.findUser({username});

  if (!_user) { return; }

  const {_id} = _user;
  const id = _id.toHexString();
  const options = {expiresIn: "1d"};
  const token = crypto.signToken(id, options);

  io.emit("loginAndWriteReview", {user: {token, ..._user}});
  io.notification("Review posted successfully.");
};

module.exports = loginAndWriteReview;