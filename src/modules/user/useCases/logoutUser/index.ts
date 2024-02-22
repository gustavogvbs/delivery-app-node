import { Authenticate } from "@utils/Authenticate";

import { LogoutUserController } from "./LogoutUserController";

const authenticate = new Authenticate();
const logoutUserController = new LogoutUserController(authenticate);

export { logoutUserController };
