import * as z from "zod";
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

const DiaryEntry = z.object({
  id: z.string(),
  date: z.date(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
});
export type DiaryEntry = z.infer<typeof DiaryEntry>;

export const NewDiaryEntry = DiaryEntry.omit({ id: true });
export type NewDiaryEntry = z.infer<typeof NewDiaryEntry>;
