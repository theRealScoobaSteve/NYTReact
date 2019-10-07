import axios from "axios";

export const nytAPI = axios.create({
  // prettier-ignore
  baseURL: `https://api.nytimes.com/svc/search/v2/`
});
