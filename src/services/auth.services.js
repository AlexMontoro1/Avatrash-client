import service from "./config.services.js";

const signinService = (user) => {
  return service.post("/auth/signin", user);
};

const loginService = (credentials) => {
  return service.post("/auth/login", credentials);
};

const verifyService = () => {
  // pasamos token
  return service.get("/auth/verify");
};

export { signinService, loginService, verifyService };
