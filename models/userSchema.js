const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.model('User', new Schema({
  name: {type: String,
    required: true
  },
  username: {type: String,
    required: true
  },
  password: {type: String,
    required: true
  },
  avatar: {type: String,
    required: true
  }
}))

module.exports = userSchema;