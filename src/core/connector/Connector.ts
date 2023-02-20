import axios, { AxiosError, AxiosInstance } from "axios";
import axiosRetry from "axios-retry";

class Connector {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      headers: {
        Accept: "application/json",
      },
    });

    axiosRetry(this.client, {
      retries: 2,
      retryDelay: (retryCount) => retryCount * 1000,
      retryCondition: (error: AxiosError) =>
        error.response?.status === 429 ||
        error.response?.status === 503 ||
        error.response?.status === 504,
    });
  }
}

export default Connector;
