const mongoose = require('mongoose');

// check if id is a valid ObjectId
const checkObjectId = (id) => (req, res, next) => {
      if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
        return res.status(404).json({ msg: 'Invalid Object ID' });
      }
      next();
};

module.exports = checkObjectId;