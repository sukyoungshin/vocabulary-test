import { vocabularies } from "./data.js";
import { VocabularyType } from "./type";

const init = () => {
  getVocabularyArray();
}
window.addEventListener("load", init);

const getHTMLElement = () => {
  const $testWrapper = document.querySelector(".test-wrapper");

  return { $testWrapper };
}

const getVocabularyArray = () => {
  const vocabularyData: VocabularyType[] = [];
  vocabularies.map((v, idx) => {
    const result = { id: 0, vocabulary: '', meaning: '' };
    result.id = idx + 1;
    result.vocabulary = v.vocabulary;
    result.meaning = v.meaning;

    vocabularyData.push(result);
  });

  const removePartialData = [...vocabularyData];
  removePartialData.map((t, idx) => idx < 10 && (t.vocabulary = ""));
  removePartialData.map((t, idx) => idx >= 10 && (t.meaning = ""));

  getVocabularyItem(vocabularyData);
};

const getVocabularyItem = (vocabularies: VocabularyType[]) => {
  const { $testWrapper } = getHTMLElement();
  if (!$testWrapper) return;


  vocabularies.map((vocabulary) => {
    const $tableRow = document.createElement("div");
    $tableRow.setAttribute("class", "table-row");

    if (vocabulary.id !== 0) {
      const $number = document.createElement("div");
      $number.setAttribute("class", "table-cell");
      $number.innerText = String(vocabulary.id);
      $tableRow.append($number);
    }

    if (vocabulary.vocabulary !== "") {
      const $vocabulary = document.createElement("div");
      $vocabulary.setAttribute("class", "table-cell");
      $vocabulary.innerText = vocabulary.vocabulary;
      $tableRow.append($vocabulary);
    }

    if (vocabulary.meaning !== "") {
      const $meaning = document.createElement("div");
      $meaning.setAttribute("class", "table-cell");
      $meaning.innerText = vocabulary.meaning;
      $tableRow.append($meaning);
    }

    if (vocabulary.id === 0 || vocabulary.vocabulary === "" || vocabulary.meaning === "") {
      const $empty = document.createElement("div");
      $empty.setAttribute("class", "table-cell");
      $empty.innerText = "";
      $tableRow.append($empty);
    }

    $testWrapper.append($tableRow);
  })
};