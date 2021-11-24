const changePassword = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {email, newPassword, repeatNewPassword, password} = params;

  const user = await mongo.findUser({email});

  if (!user) { return; }

  const isVerified = await crypto.verifyPassword(password, user.password);

  if (!isVerified) {
    io.notification("Wrong password.");
    return;
  }

  const hashedPassword = await crypto.hashPassword(newPassword);

  if (!hashedPassword) { return; }

  const updated = await mongo.updateUser({email}, {password: hashedPassword});

  if (!updated) { return; }

  io.notification("Password changed successfully.");
};

module.exports = changePassword;