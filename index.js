const submitButton = document.getElementById("submitButton");
const inputText = document.getElementById("textInput");
const leftColumn = document.getElementById("leftColumn");
const rightColumn = document.getElementById("rightColumn");
const translitDictionary = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "c",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sh",
  ъ: "",
  ы: "y",
  ь: "'",
  э: "e",
  ю: "u",
  я: "ya",
  " ": " ",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "E",
  Ж: "ZH",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "C",
  Ч: "CH",
  Ш: "SH",
  Щ: "SH",
  Ъ: "",
  Ы: "I",
  Ь: "'",
  Э: "E",
  Ю: "U",
  Я: "YA",
};

const popupCreate = () => {
  const popup = document.createElement("div");
  popup.className = "popup";

  const popupText = document.createElement("p");
  popupText.className = "popupText";

  popup.appendChild(popupText);
  return [popup, popupText];
};

const translit = (str) => {
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (!translitDictionary.hasOwnProperty(str[i])) {
      res += str[i];
    } else {
      res += translitDictionary[str[i]];
    }
  }
  return res;
};

const newWordRus = () => {
  const russianTextNew = document.createElement("div");
  russianTextNew.className = "russianText newRow";

  const count = document.createElement("p");
  count.className = "count";

  const container = document.createElement("div");
  container.className = "container";

  const text = document.createElement("p");
  text.className = "text";
  text.innerText = inputText.value;

  if (text.innerText.length > 7) {
    const popup = popupCreate();
    popup[1].innerText = text.innerText;
    container.appendChild(popup[0]);
    text.innerText = text.innerText.slice(0, 7) + "...";
    text.addEventListener("mouseover", () => {
      popup[0].style.display = "flex";
    });
    text.addEventListener("mouseout", () => {
      popup[0].style.display = "none";
    });
  }

  const deleteIcon = document.createElement("img");
  deleteIcon.className = "deleteIcon";
  deleteIcon.src = "/icons/Group 1.svg";
  deleteIcon.alt = "Delete";

  russianTextNew.appendChild(count);
  russianTextNew.appendChild(container);
  container.appendChild(text);
  container.appendChild(deleteIcon);
  leftColumn.appendChild(russianTextNew);
  return russianTextNew;
};

const newWordTranslit = () => {
  const translitTextNew = document.createElement("div");
  translitTextNew.className = "translitText newRow";

  const count = document.createElement("p");
  count.className = "count";

  const container = document.createElement("div");
  container.className = "container";

  const text = document.createElement("p");
  text.className = "textTranslit";
  text.innerText = translit(inputText.value);

  if (text.innerText.length > 7) {
    const popup = popupCreate();
    popup[1].innerText = text.innerText;
    container.appendChild(popup[0]);
    text.innerText = text.innerText.slice(0, 7) + "...";
    text.addEventListener("mouseover", () => {
      popup[0].style.display = "flex";
    });
    text.addEventListener("mouseout", () => {
      popup[0].style.display = "none";
    });
  }

  const deleteIcon = document.createElement("img");
  deleteIcon.className = "deleteIcon";
  deleteIcon.src = "/icons/Group 1.svg";
  deleteIcon.alt = "Delete";

  translitTextNew.appendChild(count);
  translitTextNew.appendChild(container);
  container.appendChild(text);
  container.appendChild(deleteIcon);
  rightColumn.appendChild(translitTextNew);

  inputText.value = "";
  return translitTextNew;
};

const deleteRow = (russianTextNew, translitTextNew) => {
  const iconLeft = russianTextNew.getElementsByClassName("deleteIcon")[0];
  const iconRight = translitTextNew.getElementsByClassName("deleteIcon")[0];
  const deleteElements = () => {
    russianTextNew.remove();
    translitTextNew.remove();
  };
  iconLeft.addEventListener("click", deleteElements);
  iconRight.addEventListener("click", deleteElements);
};

submitButton.addEventListener("click", () => {
  if (!inputText.value) {
    alert("Введите какой-нибудь текст");
  } else {
    const russianTextNew = newWordRus();
    const translitTextNew = newWordTranslit();
    deleteRow(russianTextNew, translitTextNew);
  }
});

inputText.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (!inputText.value) {
      alert("Введите какой-нибудь текст");
    } else {
      const russianTextNew = newWordRus();
      const translitTextNew = newWordTranslit();
      deleteRow(russianTextNew, translitTextNew);
    }
  }
});

const deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", () => {
  document.querySelectorAll(".newRow").forEach((el) => el.remove());
});
