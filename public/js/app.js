const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const resultOne = document.querySelector(".weatherResultOne");
const resultTwo = document.querySelector(".weatherResultTwo");
const greeting = document.querySelector(".greeting");
const line = document.querySelector(".secline");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  resultOne.textContent = "Please wait ...🛰️";
  resultTwo.textContent = " ";
  const address = input.value;

  fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      if (data.err) {
        resultOne.textContent = data.err;
        resultTwo.textContent = " ";
      } else {
        if (data.is_day === "yes") {
          line.style.display = "block";
          greeting.textContent = " Good morning 🌤️";
        } else {
          greeting.textContent = "Good knight 🌘";
        }
        resultOne.textContent = data.location + " 📍";
        resultTwo.textContent = data.forecast + " 🌡️";
      }
    });
  });
});

function showResult(data) {
  result.textContent = data;
}
