import { vocabularies } from "./data.js";
const init = () => {
    getVocabularyArray();
    handlePrint();
    handleSort();
    handleAnswer();
};
window.addEventListener("load", init);
const getHTMLElement = () => {
    const $testWrapper = document.querySelector(".test-wrapper");
    const $answer = document.querySelectorAll('.table-cell:nth-child(3n)');
    const $button = document.querySelectorAll("button");
    return { $testWrapper, $button, $answer };
};
/** vocabulary */
const getVocabularyData = (sort) => {
    let vocabularyData = getDailyVocabularyData();
    if (sort === "acend") {
        vocabularyData = getAscendingVocabularyData();
    }
    else if (sort === "desc") {
        vocabularyData = getDescendingVocabularyData();
    }
    return vocabularyData;
};
const getVocabularyArray = (sort) => {
    const vocabularyData = getVocabularyData(sort);
    getVocabularyItem(vocabularyData);
};
const getDailyVocabularyData = () => {
    return vocabularies
        .map((v, idx) => (Object.assign(Object.assign({}, v), { id: 1 + idx })));
};
const getAscendingVocabularyData = () => {
    return [...vocabularies]
        .sort((a, b) => a.vocabulary.localeCompare(b.vocabulary))
        .map((v, idx) => (Object.assign(Object.assign({}, v), { id: 1 + idx })));
};
const getDescendingVocabularyData = () => {
    return [...vocabularies]
        .sort((a, b) => b.vocabulary.localeCompare(a.vocabulary))
        .map((v, idx) => (Object.assign(Object.assign({}, v), { id: 1 + idx })));
};
const createTitleElement = ($testWrapper) => {
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
};
const getVocabularyItem = (vocabularies) => {
    const { $testWrapper } = getHTMLElement();
    if (!$testWrapper)
        return;
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
        }
        else {
            const $element = createTableCellElement("");
            $tableRow.append($element);
        }
        if (vocabulary) {
            const $element = createTableCellElement(vocabulary);
            $tableRow.append($element);
        }
        else {
            const $element = createTableCellElement("");
            $tableRow.append($element);
        }
        if (meaning) {
            const $element = createTableCellElement(meaning);
            $tableRow.append($element);
        }
        else {
            const $element = createTableCellElement("");
            $tableRow.append($element);
        }
        $testWrapper.append($tableRow);
    });
};
const createTableCellElement = (key) => {
    const $element = document.createElement("div");
    $element.setAttribute("class", "table-cell");
    $element.innerText = `${key}`;
    return $element;
};
/** event */
const handlePrint = () => {
    const { $button } = getHTMLElement();
    if (!$button)
        return;
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
    if (!$button || !$testWrapper)
        return;
    for (let i = 0; i < $button.length; i++) {
        if ($button[i].id === "acend" || $button[i].id === "desc" || $button[i].id === "origin") {
            $button[i].addEventListener('click', () => getVocabularyArray($button[i].id));
        }
    }
};
const handleAnswer = () => {
    const { $button } = getHTMLElement();
    if (!$button)
        return;
    for (let i = 0; i < $button.length; i++) {
        if ($button[i].id === "show" || $button[i].id === "hide") {
            $button[i].addEventListener('click', () => toggleAnswer($button[i].id));
        }
    }
};
const toggleAnswer = (id) => {
    const { $answer } = getHTMLElement();
    for (let i = 0; i < $answer.length; i++) {
        if (id === "show") {
            $answer[i].classList.remove('hide');
            $answer[i].classList.add('show');
        }
        else {
            $answer[i].classList.remove('show');
            $answer[i].classList.add('hide');
        }
    }
};
