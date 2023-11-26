import axios from "axios";
import { baseRootUrl } from "./config";

export const RootApi = axios.create({
  baseURL: baseRootUrl,
});
