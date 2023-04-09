const form = document.getElementById("form");
const input = document.querySelector("input");
const today = document.querySelector(".today");
const nowDate = document.querySelector(".now-date");
const city = document.querySelector(".city");
const nowTemp = document.querySelector(".now-temp");
const nowHum = document.querySelector(".now-humidity");
const nowWind = document.querySelector(".now-wind");
const nowIMG = document.querySelector(".now-img");
const temp = document.querySelectorAll(".temp");
const humidity = document.querySelectorAll(".humidity");
const wind = document.querySelectorAll(".wind");
const dates = document.querySelectorAll(".date");
const card = document.querySelectorAll(".card-img-top");
const savedCities = JSON.parse(localStorage.getItem("cities")) || [];


const apiKey = "38a46680df4a9fa4e4fa2e048d140e12";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userInput = input.value.trim();
  const newButton = document.createElement("button");
    newButton.textContent = userInput;
    newButton.classList.add("btn","my-1", "btn-danger", "w-100");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      nowDate.textContent = dayjs(data.dt_txt).format("dddd, MMMM D YYYY");
      city.textContent = data.name;
      nowTemp.textContent = `${data.main.temp} F`;
      nowHum.textContent = `${data.main.humidity}%`;
      nowWind.textContent = `${data.wind.speed} MPH`;
      nowIMG.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
    });
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.list.length; i++) {
        let date = new Date(data.list[i].dt_txt);
        console.log(date);
        temp[0].textContent = `${data.list[4].main.temp} F`;
        humidity[0].textContent = `${data.list[4].main.humidity}%`;
        wind[0].textContent = `${data.list[4].wind.speed} MPH`;
        card[0].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`
        );
        dates[0].textContent = dayjs(data.list[4].dt_txt).format(
          "dddd, MMMM D YYYY"
        );

        temp[1].textContent = `${data.list[12].main.temp} F`;
        humidity[1].textContent = `${data.list[12].main.humidity}%`;
        wind[1].textContent = `${data.list[12].wind.speed} MPH`;
        card[1].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[12].weather[0].icon}.png`
        );
        dates[1].textContent = dayjs(data.list[12].dt_txt).format(
          "dddd, MMMM D YYYY"
        );
        temp[2].textContent = `${data.list[20].main.temp} F`;
        humidity[2].textContent = `${data.list[20].main.humidity}%`;
        wind[2].textContent = `${data.list[20].wind.speed} MPH`;
        card[2].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[20].weather[0].icon}.png`
        );
        dates[2].textContent = dayjs(data.list[20].dt_txt).format(
          "dddd, MMMM D YYYY"
        );
        temp[3].textContent = `${data.list[28].main.temp} F`;
        humidity[3].textContent = `${data.list[28].main.humidity}%`;
        wind[3].textContent = `${data.list[28].wind.speed} MPH`;
        card[3].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[28].weather[0].icon}.png`
        );
        dates[3].textContent = dayjs(data.list[28].dt_txt).format(
          "dddd, MMMM D YYYY"
        );
        temp[4].textContent = `${data.list[35].main.temp} F`;
        humidity[4].textContent = `${data.list[35].main.humidity}%`;
        wind[4].textContent = `${data.list[35].wind.speed} MPH`;
        card[4].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[35].weather[0].icon}.png`
        );
        dates[4].textContent = dayjs(data.list[35].dt_txt).format(
          "dddd, MMMM D YYYY"
        );

      }
      const buttonContainer = document.querySelector(".button-container");
buttonContainer.appendChild(newButton);

// save the userInput to local storage
if (!savedCities.includes(userInput)) {
  savedCities.push(userInput);
  localStorage.setItem("cities", JSON.stringify(savedCities));
}
    });
});
window.addEventListener("load", () => {
    
    // Loop through the saved cities and create a button for each one
    const buttonContainer = document.querySelector(".button-container");
    for (let i = 0; i < savedCities.length; i++) {
      const newButton = document.createElement("button");
      newButton.textContent = savedCities[i];
      newButton.classList.add("btn","my-1", "btn-danger", "w-100");
      buttonContainer.appendChild(newButton);
    }
  });
  