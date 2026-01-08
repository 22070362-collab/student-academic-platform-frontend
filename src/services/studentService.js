import api from "./api";

const authService = {
  login: (username, password) => {
    return api.post("/auth/login", { username, password });
  },

  logout: () => {
    return api.post("/auth/logout");
  },

  getProfile: () => {
    return api.get("/auth/profile");
  },
};

export default authService;
