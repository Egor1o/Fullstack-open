import type { DiaryEntry } from "./types.ts";
import axios from "axios";

const API_URL = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  return axios.get<DiaryEntry[]>(API_URL).then((response) => {
    return response.data;
  });
};
