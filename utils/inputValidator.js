const validateTodo = function(user) {
    if (!user.username) {
        return false;
    }
    if (!user.email) {
      return false;
  }
  if (!user.password) {
    return false;
  }
    return true;
  };
  
  module.exports = validateTodo;