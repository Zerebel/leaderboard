const recordsDiv = document.querySelector("#records");
const firstName = document.querySelector("#f-Name");
const lastName = document.querySelector("#l-Name");
const countri = document.querySelector("#country");
const playerScore = document.querySelector("#score");
const btnAddPlayer = document.querySelector("#addPlayer");
const mainDiv = document.querySelector("#main");
const error = document.querySelector("#error-message");
let recordsArray = [];
const getCurrentDateTime = () => {
  const months = [
    "Jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const now = new Date();
  const year = now.getFullYear();
  const month = months[now.getMonth() + 1];
  const day = now.getDate();
  let hour = now.getHours();
  hour > 12 ? (hour = hour % 12) : hour < 10 ? (hour = "0" + hour) : hour;
  let minutes = now.getMinutes();
  minutes < 10 ? (minutes = "0" + minutes) : minutes;
  const thisDate = `${month} ${day},${year} ${hour}:${minutes}`;
  return thisDate;
};
//TODO use id to delete
btnAddPlayer.addEventListener("click", (e) => {
  getRecord();
});
const getRecord = () => {
  const record = {
    names: () => {
      const fullName = firstName.value + " " + lastName.value;
      return fullName;
    },
    country: () => {
      const country = countri.value;
      return country;
    },
    score: () => {
      const score = playerScore.value;
      return score;
    },
  };
  // *Name error
  if (firstName.value === "" || lastName.value === "")
    return (error.textContent = "All fields are required");
  const recResults = {
    fullName: record.names(),
    country: record.country(),
    score: Number(record.score()),
  };

  // *Identify Errors
  if (recResults.country === "" || recResults.score == "")
    return (error.textContent = "All fields are required");
  if (!Number.isInteger(recResults.score))
    return (error.textContent = "All fields are required");

  recordsArray.push(recResults);
  error.innerHTML = "";
  return createRecord();
};
// *creating record
const createRecord = () => {
  recordsArray.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (b.score > a.score) return 1;
    return 0;
  });
  recordsDiv.innerHTML = "";
  for (const record of recordsArray) {
    console.log(recordsArray);
    const newDiv = document.createElement("div");
    newDiv.classList.add(
      "bg-pink-400",
      "p-2",
      "grid",
      "grid-cols-3",
      "justify-between",
      "items-center"
    );
    const fullName = document.createElement("span");
    fullName.classList.add(
      "flex-col",
      "flex",
      "uppercase",
      "md:text-lg",
      "break-words"
    );
    const date = document.createElement("span");
    date.classList.add("text-sm", "text-slate-500");
    date.textContent = getCurrentDateTime();
    // fullname
    fullName.textContent = record.fullName;
    const country = document.createElement("span");
    country.classList.add("uppercase");
    // country
    country.textContent = record.country;
    const score = document.createElement("span");
    // score
    score.textContent = record.score;
    const buttonsDiv = document.createElement("div");
    const delButtonDiv = document.createElement("div");
    delButtonDiv.classList.add(
      "bg-white",
      "h-6",
      "w-6",
      "md:h-8",
      "md:w-8",
      "rounded-full",
      "flex",
      "justify-center",
      "items-center"
    );
    const delButton = document.createElement("button");
    delButton.classList.add("text-sm");
    delButton.addEventListener("click", (e) => {
      recordsArray = recordsArray.filter((e) => {
        return e.fullName != record.fullName;
      });
      createRecord();
    });
    const delImg = document.createElement("img");
    delImg.src = "./img/delete.svg";
    buttonsDiv.appendChild(delButtonDiv);
    delButtonDiv.appendChild(delButton);
    delButton.appendChild(delImg);
    buttonsDiv.classList.add("col-end-6", "inline-flex", "gap-2");
    const plusFiveDiv = document.createElement("div");
    plusFiveDiv.classList.add(
      "bg-white",
      "h-6",
      "w-6",
      "md:h-8",
      "md:w-8",
      "rounded-full",
      "flex",
      "justify-center",
      "items-center"
    );
    const btnPlusFive = document.createElement("button");
    btnPlusFive.textContent = `+5`;
    btnPlusFive.addEventListener("click", (e) => {
      record.score += 5;
      createRecord();
    });
    buttonsDiv.appendChild(plusFiveDiv);
    plusFiveDiv.appendChild(btnPlusFive);
    const minusFiveDiv = document.createElement("div");
    minusFiveDiv.classList.add(
      "bg-white",
      "h-6",
      "w-6",
      "md:h-8",
      "md:w-8",
      "rounded-full",
      "flex",
      "justify-center",
      "items-center"
    );
    const btnMinusFive = document.createElement("button");
    btnMinusFive.textContent = `-5`;
    btnMinusFive.addEventListener("click", (e) => {
      record.score -= 5;
      createRecord();
    });
    buttonsDiv.appendChild(minusFiveDiv);
    minusFiveDiv.appendChild(btnMinusFive);
    fullName.appendChild(date);
    newDiv.appendChild(fullName);
    newDiv.appendChild(country);
    newDiv.appendChild(score);
    newDiv.appendChild(buttonsDiv);
    recordsDiv.appendChild(newDiv);
  }
};
