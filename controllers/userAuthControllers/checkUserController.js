const checkUser = (req, res) => {
  console.log('REQ checkuser', req.user)
  return res.status(200).json(req.user)
};

module.exports = {
  checkUser
}