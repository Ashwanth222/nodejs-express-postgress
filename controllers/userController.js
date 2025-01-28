const pool = require("../config/db.js");
const validateTodo = require('../utils/inputValidator.js');

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ', (error, results) => {
    if (error) {
      response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
  })
}

const get = (request, response) => {
  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
    response.status(200).json(data)
}

 const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ message: error.message });
    }
    response.status(200).json(results.rows)
  })
}

 const createUser = ( request, response) => {
  if (!validateTodo(request.body)) {
    return response.status(400).json({ message: 'Invalid todo object' });
}
  const {username, email, password } = request.body

  pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', 
  [username, email, password], (error, results) => {
    if (error) {
      response.status(500).json({ message: error.message });
    }
    response.status(201).send(`User added with ID: ${results}`)
  })
}

 const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, email, password } = request.body

  pool.query(
    'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4',
    [username, email, password, id],
    (error, results) => {
      if (error) {
        response.status(500).json({ message: error.message });
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

 const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ message: error.message });
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
    deleteUser,
    createUser,
    updateUser,
    getUserById,
    getUsers,
    get
}