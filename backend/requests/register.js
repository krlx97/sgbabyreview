const register = async (app, params) => {
  const {crypto, io, mongo} = app;
  const {firstName, lastName, email, username, password, referer} = params;
  let refererUser;
  let updatedReferer;

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

  if (referer) {
    refererUser = await mongo.findUser({username: referer});

    if (!refererUser) {
      io.notification("Invalid referer.");
      return;
    }

    updatedReferer = await mongo.updateUser2({username: referer}, {
      $push: {
        referals: username
      }
    });

    if (!updatedReferer) { return; }
  }

  io.notification("Account created successfully.");
};

module.exports = register;