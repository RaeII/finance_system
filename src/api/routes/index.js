import { Router } from "express";
import expensesRoutes from "./expenses.routes.js";
// import openiaRoutes from "./openia.routes.js";
// import routerText from "./router.text.js";
// import serverRoutes from "./server.routes.js";
// import channelRoutes from "./channel.routes.js";
// import youtubelRoutes from "./youtube.routes.js";
// import testRoutes from "./test.routes.js";


const apiRoutes = Router();

apiRoutes.use("/expenses", expensesRoutes);
// apiRoutes.use("/openia", openiaRoutes);
// apiRoutes.use("/text", routerText);
// apiRoutes.use("/server", serverRoutes);
// apiRoutes.use("/channel", channelRoutes);
// apiRoutes.use("/youtube", youtubelRoutes);
// apiRoutes.use("/test", testRoutes);

export default apiRoutes;