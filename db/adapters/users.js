const client = require("../client");

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT id, username, password
        FROM users;
      `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser(userObj) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password) 
            VALUES($1, $2) 
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
          `,
      [userObj.username, userObj.password]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser(username, password) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT id, username from users WHERE username=$1 AND password=$2;
        `,
      [username, password]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT username from users WHERE id=${id}
        `);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          DELETE FROM users
          WHERE username = $1
          RETURNING *;
        `,
      [username]
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUsername(id, newUsername) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        UPDATE users
        SET username = $1
        WHERE id = $2
        RETURNING *;
      `,
      [newUsername, id]
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          SELECT * from users WHERE username=$1;
          `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUsername,
  deleteUsername,
  getUserById,
  getUserByUsername,
};
