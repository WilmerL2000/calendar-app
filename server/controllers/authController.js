import generateJWT from '../helpers/generateJWT.js';
import User from '../mongodb/models/User.js';

/**
 * This function creates a new user in a database and returns a success message with the user's ID and
 * name, or an error message if the user already exists or if there is a server error.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - The "res" parameter is the response object that is sent back to the client after the
 * server has processed the request. It contains information such as the status code, headers, and data
 * that will be sent back to the client.
 * @returns If the user already exists, a 400 status code with an error message is returned. If the
 * user is successfully created, a 201 status code with the user's ID and name is returned. If there is
 * an error during the process, a 500 status code with an error message is returned.
 */
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      const error = new Error('Usuario ya registrado');
      return res.status(400).json({ msg: error.message, ok: false });
    }

    const user = new User({
      name,
      email,
      password,
    });

    const savedUser = await user.save();
    const token = await generateJWT({ uid: user._id });

    res.status(201).json({
      ok: true,
      uid: savedUser.id,
      name: savedUser.name,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This is an asynchronous function that logs in a user by checking their email and password, and
 * returns a JSON response with a token if successful.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - "res" is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and the response
 * body. In this case, the response object is used to send JSON data back to the client with
 * information about whether the
 * @returns The function `loginUser` returns a JSON response with the following properties:
 * - `ok`: a boolean indicating whether the login was successful or not.
 * - `uid`: the user ID.
 * - `name`: the user name.
 * - `token`: a JSON Web Token (JWT) that can be used for authentication in subsequent requests.
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error('El usuario no existe');
      return res.status(400).json({ msg: error.message, ok: false });
    }

    if (await user.checkPassword(password)) {
      const token = await generateJWT({ uid: user._id });
      res.status(200).json({ ok: true, uid: user.id, name: user.name, token });
    } else {
      const error = new Error('Contraseña incorrecta');
      return res.status(400).json({ msg: error.message, ok: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function revalidates a user's token by generating a new JWT with their user ID.
 * @param req - req is an object that represents the HTTP request made by the client to the server. It
 * contains information such as the request method, headers, URL, and any data sent in the request
 * body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client making the request. It contains methods such as `status` to set the HTTP status code of the
 * response, `json` to send a JSON response, and many others.
 */
const revalidateToken = async (req, res) => {
  try {
    const { id, name } = req.user;
    const token = await generateJWT({ uid: id });
    res.status(200).json({ ok: true, token, id, name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createUser, loginUser, revalidateToken };
