import type { DiaryEntry, NewDiaryEntry } from "../types.ts";
import axios from "axios";

const API_URL = "http://localhost:3000/api/diaries";

export const getDiaries = async () => {
  return axios.get<DiaryEntry[]>(API_URL).then((response) => {
    return response.data;
  });
};

export const createDiary = async (newDiary: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(API_URL, newDiary).then((response) => {
    return response.data;
  });
};
