import axios from "axios";
import { getUrl } from "../../config";

export const axiosRequest = (method, url, data) => {
  const req = {
    method
  };

  req.url = getUrl(url);

  if (url.indexOf("api-token-auth") === -1 && url.indexOf("register") === -1) {
    req.headers = {
      Authorization: `Token ${window.$cookies.get("hotelSymphonyToken")}`
    };
  }

  if (data) {
    req.data = data;
  }
  return axios(req);
};
