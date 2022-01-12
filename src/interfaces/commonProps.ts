import { arrayOfArrayOfWords } from "../types/types";

export interface IWPMProps {
  finishedWordArray: arrayOfArrayOfWords,
  timeToFinishTest: number,
  initializeNewTest: () => void
}