const register = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {firstName, lastName, email, username, password} = params;

  const user = await mongo.findUser({email});

  if (user) {
    io.notification("Email taken.");
    return;
  }

  const hashedPassword = await crypto.hashPassword(password);

  if (!hashedPassword) { return; }

  const inserted = await mongo.insertUser({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword
  });

  if (!inserted.acknowledged) { return; }

  io.notification("Account created successfully.");
};

module.exports = register;