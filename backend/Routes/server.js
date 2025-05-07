import UserRoute from "./user.route.js";
import AuthRoute from "./auth.route.js";
import CateoryRoute from "./category.route.js";
import EventsRoute from "./event.route.js";
import cartRoute from "./cart.route.js";

const MountRoute = (app) => {
  app.use("/api/v1/users", UserRoute);
  app.use("/api/v1/auth", AuthRoute);
  app.use("/api/v1/categories", CateoryRoute);
  app.use("/api/v1/events", EventsRoute);
  app.use("/api/v1/carts", cartRoute);
};

export default MountRoute;
