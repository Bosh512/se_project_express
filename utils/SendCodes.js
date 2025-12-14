const sendItem = (res, item) => res.status(200).send(item);

const sendUser = (res, user) => res.status(200).send(user);

module.exports = {
  sendItem,
  sendUser,
};
