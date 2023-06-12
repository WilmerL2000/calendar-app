import Event from '../mongodb/models/Event.js';

/**
 * This function retrieves events and populates user information from a reference object in a MongoDB
 * database.
 * @param req - req stands for "request" and it is an object that represents the HTTP request made by
 * the client to the server. It contains information about the request such as the URL, headers, query
 * parameters, and body.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It is an instance of the `http.ServerResponse` class in Node.js. The `res` object has
 * methods like `json()` and `status()` that are used to send a JSON
 */
const getEvents = async (req, res) => {
  try {
    //*Populate is to get info from the reference obj
    const events = await Event.find().populate('user', 'name');

    res.json({ ok: true, events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function creates a new event and saves it to the database, with the user ID attached to it.
 * @param req - req stands for request and it is an object that contains information about the incoming
 * HTTP request such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client who
 * made the request. It contains methods like `status()` to set the HTTP status code of the response,
 * `json()` to send a JSON response, and many others.
 */
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    event.user = req.user._id;
    await event.save();

    res.status(201).json({ ok: true, event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function updates an event if the user is authorized to do so.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, including the request parameters, headers, and body. It is passed as the
 * first parameter to the updateEvent function.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods like `status` to set the HTTP status code, `json` to send a JSON
 * response, and `send` to send a plain text response.
 * @returns The function `updateEvent` returns a JSON response with status code 404 and a message if
 * the event is not found, a JSON response with status code 401 and a message if the user is not
 * authorized to update the event, or a JSON response with status code 201 and the updated event if the
 * update is successful. If there is an error, it returns a JSON response with status code
 */
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'No encontrado', ok: false });
    }

    if (event.user._id.toString() !== _id.toString()) {
      return res.status(401).json({ msg: 'Acción no válida', ok: false });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: _id,
      },
      { new: true }
    );

    res.status(201).json({ ok: true, event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function deletes an event from the database if the user making the request is the owner of the
 * event.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, request body, etc.
 * @param res - `res` is the response object that is used to send a response back to the client making
 * the request. It contains methods such as `status` to set the HTTP status code, `json` to send a JSON
 * response, and `send` to send a plain text response.
 * @returns The function `deleteEvent` is returning a JSON response with a status code and a message.
 * If the event is not found, it returns a 404 status code with a message "No encontrado" and `ok`
 * property set to false. If the user is not authorized to delete the event, it returns a 401 status
 * code with a message "Acción no válida" and `ok
 */
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'No encontrado', ok: false });
    }

    if (event.user._id.toString() !== _id.toString()) {
      return res.status(401).json({ msg: 'Acción no válida', ok: false });
    }

    await event.deleteOne();

    res.status(200).json({ ok: true, msg: 'Evento eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getEvents, createEvent, updateEvent, deleteEvent };
