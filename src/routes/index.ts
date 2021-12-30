import { Router } from "express";
import AddLikeInMessageController from "../controllers/AddLikeInMessageController";
import CreateMessageController from "../controllers/CreateMessageController";
import CreateReplyMessage from "../controllers/CreateReplyMessageController";
import CreateTopicController from "../controllers/CreateTopicController";
import OAuthenticateController from "../controllers/OAuthenticateController";
import ensureAuthenticateMiddleware from "../middlewares/ensureAuthenticateMiddleware";

const routes = Router();

routes.post("/authenticate", new OAuthenticateController().handle);
routes.post(
  "/create-topic",
  ensureAuthenticateMiddleware,
  new CreateTopicController().handle
);
routes.post(
  "/create-message/:topics_id",
  ensureAuthenticateMiddleware,
  new CreateMessageController().handle
);
routes.patch(
  "/add-like/:message_id",
  ensureAuthenticateMiddleware,
  new AddLikeInMessageController().handle
);
routes.put(
  "/create-reply/:message_id",
  ensureAuthenticateMiddleware,
  new CreateReplyMessage().handle
);

export default routes;
