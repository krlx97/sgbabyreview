const changeEmail = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {email, newEmail, password} = params;

  const [user, newUser] = await Promise.all([
    mongo.findUser({email}),
    mongo.findUser({email: newEmail})
  ]);

  if (!user) { return; }

  if (newUser) {
    io.notification("Email taken.");
    return;
  }

  const isVerified = await crypto.verifyPassword(password, user.password);

  if (!isVerified) {
    io.notification("Wrong password.");
    return;
  }

  const updated = await mongo.updateUser({email}, {email: newEmail});

  if (!updated) { return; }

  io.emit("changeEmail", {newEmail});
  io.notification("Email changed successfully.");
};

module.exports = changeEmail;