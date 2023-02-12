import { RequestHandler } from 'express';

interface IAuthController {
  // Used for protected routes
  // check if there is a logged user. Uses exposed by passport req.isAuthenticated() function
  //if yes pass to next middleware, else unauthorised request message has sent to the client
  isUserLogged: RequestHandler;

  // after express login middleware - sends user as a responce to client
  login: RequestHandler;

  // logout ligic - uses exposed by passport function logout which deletes the req.user
  // and connected session object
  logout: RequestHandler;
}

export default IAuthController;
