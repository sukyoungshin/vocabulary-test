import { vocabularies } from "./data.js";
import { VocabularyType } from "./type";

const init = () => {
  getVocabularyArray();
  handlePrint();
  handleSort();
  handleAnswer();
}
window.addEventListener("load", init);

const getHTMLElement = () => {
  const $testWrapper = document.querySelector<Element>(".test-wrapper");
  const $words = document.querySelectorAll<HTMLDivElement>('.table-cell:nth-child(2n)');
  const $meaning = document.querySelectorAll<HTMLDivElement>('.table-cell:nth-child(3n)');
  const $button = document.querySelectorAll<HTMLButtonElement>("button");

  return { $testWrapper, $button, $words, $meaning };
}

/** vocabulary */
const getVocabularyData = (sort?: string) => {
  let vocabularyData = getDailyVocabularyData();
  if (sort === "acend") {
    vocabularyData = getAscendingVocabularyData();
  } else if (sort === "desc") {
    vocabularyData = getDescendingVocabularyData();
  }

  return vocabularyData;
};

const getVocabularyArray = (sort?: string) => {
  const vocabularyData = getVocabularyData(sort);
  getVocabularyItem(vocabularyData);
};

const getDailyVocabularyData = () => {

  return vocabularies
    .map((v, idx) => ({
      ...v,
      id: 1 + idx,
    }));
};

const getAscendingVocabularyData = () => {

  return [...vocabularies]
    .sort((a, b) => a.vocabulary.localeCompare(b.vocabulary))
    .map((v, idx) => ({
      ...v,
      id: 1 + idx,
    }));
};

const getDescendingVocabularyData = () => {

  return [...vocabularies]
    .sort((a, b) => b.vocabulary.localeCompare(a.vocabulary))
    .map((v, idx) => ({
      ...v,
      id: 1 + idx,
    }));
}

const createTitleElement = ($testWrapper: Element) => {
  const $testTitle = document.createElement('div');
  $testTitle.setAttribute('class', 'table-row table-subtitle');
  const $no = document.createElement('div');
  $no.innerText = "No";
  $testTitle.append($no);
  const $words = document.createElement('div');
  $words.innerText = "Words";
  $testTitle.append($words);
  const $meaning = document.createElement('div');
  $meaning.innerText = "Meaning";
  $testTitle.append($meaning);

  $testWrapper.append($testTitle);
}

const getVocabularyItem = (vocabularies: VocabularyType[]) => {
  const { $testWrapper } = getHTMLElement();
  if (!$testWrapper) return;

  // 기존 Element 삭제
  $testWrapper.innerHTML = '';

  // 제목 생성 (No, Words, Meaning)
  createTitleElement($testWrapper);

  // 컨텐츠 생성 (단어, 뜻)
  vocabularies.forEach((v) => {
    const { id, vocabulary, meaning } = v;
    const $tableRow = document.createElement("div");
    $tableRow.setAttribute("class", "table-row");

    if (id) {
      const $element = createTableCellElement(id);
      $tableRow.append($element);
    } else {
      const $element = createTableCellElement("");
      $tableRow.append($element);
    }

    if (vocabulary) {
      const $element = createTableCellElement(vocabulary);
      $tableRow.append($element);
    } else {
      const $element = createTableCellElement("");
      $tableRow.append($element);
    }

    if (meaning) {
      const $element = createTableCellElement(meaning);
      $tableRow.append($element);
    } else {
      const $element = createTableCellElement("");
      $tableRow.append($element);
    }

    $testWrapper.append($tableRow);
  });
};

const createTableCellElement = (key: number | string) => {
  const $element = document.createElement("div");
  $element.setAttribute("class", "table-cell");
  $element.innerHTML = `${key}`;

  return $element;
};

/** event */
const handlePrint = () => {
  const { $button } = getHTMLElement();
  if (!$button) return;

  for (let i = 0; i < $button.length; i++) {
    if ($button[i].id === "print") {
      $button[i].addEventListener('click', print);
    }
  }
};
const print = () => {
  return window.print();
};

const handleSort = () => {
  const { $button, $testWrapper } = getHTMLElement();
  if (!$button || !$testWrapper) return;

  for (let i = 0; i < $button.length; i++) {
    if ($button[i].id === "acend" || $button[i].id === "desc" || $button[i].id === "origin") {
      $button[i].addEventListener('click', () => getVocabularyArray($button[i].id));
    }
  }
}

const handleAnswer = () => {
  const { $button } = getHTMLElement();
  if (!$button) return;

  for (let i = 0; i < $button.length; i++) {
    if ($button[i].id === "show" || $button[i].id === "hide") {
      $button[i].addEventListener('click', () => toggleAnswer($button[i].id));
    }
  }
};
const toggleAnswer = (id: string) => {
  const { $words, $meaning } = getHTMLElement();
  const full = $meaning.length;
  const half = $meaning.length / 2;

  for (let i = 0; i < half; i++) {
    if (id === "show") {
      $meaning[i].classList.remove('hide');
      $meaning[i].classList.add('show');
    } else {
      $meaning[i].classList.remove('show');
      $meaning[i].classList.add('hide');
    }
  }

  for (let i = half; i < full; i++) {
    if (id === "show") {
      $words[i].classList.remove('hide');
      $words[i].classList.add('show');
    } else {
      $words[i].classList.remove('show');
      $words[i].classList.add('hide');
    }
  }
};

