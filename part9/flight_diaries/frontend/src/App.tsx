import { useEffect, useState } from "react";
import type { DiaryEntry } from "./types.ts";
import { getDiaries } from "./diaryService.ts";
import { DiaryEntries } from "./components/DiaryEntries.tsx";
import { DiaryForm } from "./components/DiaryForm.tsx";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    getDiaries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);
  return (
    <>
      <DiaryEntries diaryEntries={diaryEntries} />
      <DiaryForm />
    </>
  );
}

export default App;
