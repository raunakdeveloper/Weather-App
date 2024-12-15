import axios from "axios";

const API_URL = "http://localhost:5000/api";
const WEATHER_API_URL = "https://api.weatherstack.com/current";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    if (err.response) {
      if (err.response.data.message === "Invalid credentials") {
        throw new Error(
          "This email is not registered. Please check your email or sign up."
        );
      }
      throw new Error(err.response.data.message || "Login failed.");
    } else {
      throw new Error("Login failed. Please try again.");
    }
  }
};

// Register function with error handling
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      if (err.response.data.message === "Email already registered") {
        throw new Error("This email is already registered.");
      }
      throw new Error(err.response.data.message || "Registration failed.");
    } else {
      throw new Error("Registration failed. Please try again.");
    }
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    throw new Error("Logout failed. Please try again.");
  }
};

// Add search tag function
export const addSearchTag = async (searchTag) => {
  try {
    const response = await api.post("/weather/search", { searchTag });
    return response.data;
  } catch (err) {
    throw new Error("Failed to add search tag. Please try again.");
  }
};

// Get search history function
export const getSearchHistory = async () => {
  try {
    const response = await api.get("/weather/history");
    return response.data;
  } catch (err) {
    throw new Error("Failed to fetch search history. Please try again.");
  }
};

// Delete search tag function
export const deleteSearchTag = async (id) => {
  try {
    await api.delete(`/weather/history/${id}`);
  } catch (err) {
    throw new Error("Failed to delete search tag. Please try again.");
  }
};

// Fetch weather data from the weather API
export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        access_key: import.meta.env.VITE_WEATHERSTACK_API_KEY,
        query: city,
      },
    });

    if (response.data && response.data.location && response.data.current) {
      return response.data;
    } else {
      throw new Error("Invalid weather data received.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
};

export default api;
