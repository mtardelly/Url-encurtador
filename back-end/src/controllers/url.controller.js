const User = require('../models/user.model');
const Url = require('../models/url.model');

module.exports = {
  async createUrl(req, res) {
    const { url_full, url_short, email_user } = req.body;
    const url = new Url();
    url.url_full = url_full;
    url.url_short = url_short;
    url.email_user = email_user;
    url.save()
      .then((result) => {
        User.findOne({ email_user: url.email_user }, (err, user) => {
          if (user) {
            user.urls.push(url);
            user.save();
            res.json({ message: 'Url Criada!' });
          }
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });

  },

  async deleteUrl(req, res) {
    const { _id } = req.params;
    await Url.findOneAndDelete({ _id })
      .then((result) => {
        res.json({ message: 'Urld deletada com sucesso' });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });

  },

};