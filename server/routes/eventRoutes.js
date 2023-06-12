import express from 'express';
import validateJWT from '../middleware/validateJWT.js';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '../controllers/eventController.js';

const router = express.Router();

/* `router.use(validateJWT);` is using the `validateJWT` middleware function for all routes defined in
the `router`. This means that before any request is handled by the routes defined in the `router`,
the `validateJWT` middleware function will be executed to check if the request contains a valid JSON
Web Token (JWT) in the authorization header. If the JWT is valid, the request will be allowed to
proceed to the route handler functions. If the JWT is invalid or missing, the middleware function
will return an error response and the request will not be allowed to proceed to the route handler
functions. */
router.use(validateJWT);

router.route('/').get(getEvents).post(createEvent);

router.route('/:id').put(updateEvent).delete(deleteEvent);

export default router;
