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

  const {_id, role} = user;
  const id = _id.toHexString();
  const options = stayLoggedIn ? {expiresIn: "1d"} : {expiresIn: "1h"};
  const token = crypto.signToken(id, options);
  const msg = "Dobrodošli";

  io.emit("login", {token, role, msg})
};

module.exports = login;