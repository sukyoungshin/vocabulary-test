import { vocabularies, vocabulariesTestRange } from "./data.js";
const holidays = [
    "2023/01/01",
    "2023/01/23",
    "2023/01/24",
    "2023/02/03",
    "2023/03/01",
    "2023/05/05",
    "2023/05/29",
    "2023/06/05",
    "2023/08/15",
    "2023/09/28",
    "2023/09/29",
    "2023/10/03",
    "2023/10/09",
    "2023/12/25", // 크리스마스
];
const convertDateFormat = (date) => {
    return date.toLocaleDateString(); // 6/5/2023
};
const getTimeStamp = (day) => {
    return new Date(day).getTime();
};
const isTodayHoliday = () => {
    const today = convertDateFormat(new Date());
    const holiday = holidays.filter(holiday => getTimeStamp(holiday) === getTimeStamp(today));
    return holiday.length !== 0;
};
const init = () => {
    const holidayYn = isTodayHoliday();
    if (holidayYn) {
        const { $testWrapper } = getHTMLElement();
        if (!$testWrapper)
            return;
        $testWrapper.innerHTML = '<div class="full"><p>🎉 오늘은 쉬는 날 🎉</p><p>(문제섞기X,인쇄X)</p></div>';
        return;
    }
    updateVocabularyRange();
    updateVocabulary();
    handleSort();
    handlePrint();
    handleAnswer();
};
window.addEventListener("load", init);
const getHTMLElement = () => {
    const $testWrapper = document.querySelector(".test-wrapper");
    const $testRangeWrapper = document.querySelector(".test-score");
    const $words = document.querySelectorAll('.table-cell:nth-child(2n)');
    const $meaning = document.querySelectorAll('.table-cell:nth-child(3n)');
    const $button = document.querySelectorAll("button");
    const $select = document.querySelector(".sorts");
    // 동적으로 생성된 Elements
    const $tableRow = document.querySelectorAll(".table-row");
    const $checkbox = document.querySelectorAll("input[type='checkbox']");
    return { $testWrapper, $testRangeWrapper, $button, $select, $words, $meaning, $tableRow, $checkbox };
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
const updateVocabulary = (sort) => {
    const vocabularyData = getVocabularyData(sort);
    getVocabulary(vocabularyData);
    handleCheckboxToggle();
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
    const $no = document.createElement('p');
    $no.innerText = "No";
    $testTitle.append($no);
    const $words = document.createElement('p');
    $words.innerText = "Words";
    $testTitle.append($words);
    const $meaning = document.createElement('p');
    $meaning.innerText = "Meaning";
    $testTitle.append($meaning);
    const $checkbox = document.createElement('p');
    $checkbox.innerText = "Done";
    $testTitle.append($checkbox);
    $testWrapper.append($testTitle);
};
const updateVocabularyRange = () => {
    const { $testRangeWrapper } = getHTMLElement();
    if (!$testRangeWrapper)
        return;
    const $testRange = document.createElement("p");
    $testRange.innerText = vocabulariesTestRange;
    $testRangeWrapper.append($testRange);
};
const getVocabulary = (vocabularies) => {
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
        const $checkbox = document.createElement("input");
        $checkbox.setAttribute("type", "checkbox");
        $tableRow.append($checkbox);
        $testWrapper.append($tableRow);
    });
};
const createTableCellElement = (key) => {
    const $element = document.createElement("div");
    $element.setAttribute("class", "table-cell");
    $element.innerHTML = `${key}`;
    return $element;
};
/** event */
const handleCheckboxToggle = () => {
    const { $tableRow, $checkbox } = getHTMLElement();
    for (let i = 0; i < $checkbox.length; i++) {
        $checkbox[i].addEventListener('click', () => {
            const index = i + 1;
            const isChecked = $tableRow[index].classList.value.includes('done');
            if (isChecked) {
                $tableRow[index].classList.remove('done');
            }
            else {
                $tableRow[index].classList.add('done');
            }
        });
    }
};
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
    const { $select } = getHTMLElement();
    if (!$select)
        return;
    $select.addEventListener('change', () => updateVocabulary($select.value));
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
    const { $words, $meaning } = getHTMLElement();
    const full = $meaning.length;
    const half = $meaning.length / 2;
    for (let i = 0; i < half; i++) {
        if (id === "show") {
            $meaning[i].classList.remove('hide');
            $meaning[i].classList.add('show');
        }
        else {
            $meaning[i].classList.remove('show');
            $meaning[i].classList.add('hide');
        }
    }
    for (let i = half; i < full; i++) {
        if (id === "show") {
            $words[i].classList.remove('hide');
            $words[i].classList.add('show');
        }
        else {
            $words[i].classList.remove('show');
            $words[i].classList.add('hide');
        }
    }
};
