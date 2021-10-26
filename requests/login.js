const login = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {email, password} = params;

  const user = await mongo.findUser({email});

  if (!user) {
    io.notification("User not found.");
    return;
  }

  const isVerified = await crypto.verifyPassword(password, user.password);

  if (!isVerified) {
    io.notification("Wrong password.");
    return;
  }

  const {_id} = user;
  const id = _id.toHexString();
  const options = {expiresIn: "1d"};
  const token = crypto.signToken(id, options);

  io.emit("login", {
    token,
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username
  });

  io.notification("Login successfull.");
};

module.exports = login;