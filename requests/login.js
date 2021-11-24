const login = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {email, password} = params;

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

  const {_id} = _user;
  const id = _id.toHexString();
  const options = {expiresIn: "1d"};
  const token = crypto.signToken(id, options);
  const user = {token, ..._user};

  io.emit("login", {user});
  io.notification("Login successfull.");
};

module.exports = login;