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
const buttonContainer = document.querySelector(".button-container");
const savedCities = JSON.parse(localStorage.getItem("cities")) || [];

const apiKey = "38a46680df4a9fa4e4fa2e048d140e12";

function getWeather() {
  let userInput = input.value.trim();
//the first fetch gets the current weather from the api
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.cod);
      //Checking to see if is a valid city
      if (data.cod == "404" || data.cod == "400") {
        alert("Please enter a valid city name");
        return;
      }
      // checking to see if it is already in the array of savedCitties
      if (!savedCities.includes(userInput)) {
        console.log("SAVING!!!!!!!!!!!!!");
        savedCities.push(userInput);
        localStorage.setItem("cities", JSON.stringify(savedCities));
        //creates a button and appends to the list of recent searches
        const newButton = document.createElement("button");
        newButton.textContent = userInput
        newButton.classList.add("btn", "my-1", "btn-secondary", "w-100");
        buttonContainer.appendChild(newButton);
        newButton.addEventListener("click", (e) => {
          console.log(this);
          input.value = e.target.textContent;
          getWeather();
        });
      }

      nowDate.textContent = dayjs(data.dt_txt).format("MMMM D, YYYY");
      city.textContent = data.name;
      nowTemp.textContent = `Temp: ${data.main.temp} F`;
      nowHum.textContent = `Humidity: ${data.main.humidity}%`;
      nowWind.textContent = `Wind: ${data.wind.speed} MPH`;
      nowIMG.setAttribute(
        "src",
        `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
    });
    //the second fetch gets the 5 day forecast from the api, it returns an array length of 40
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //I create a for loop from the array length of 40 to get the 5 day forecast, I had to think about what number of the loop that I wanted to use.
      for (let i = 0; i < data.list.length; i++) {
        let date = new Date(data.list[i].dt_txt);
        console.log(date);
        temp[0].textContent = `Temp: ${data.list[4].main.temp} F`;
        humidity[0].textContent = `Humidity: ${data.list[4].main.humidity}%`;
        wind[0].textContent = `Wind: ${data.list[4].wind.speed} MPH`;
        card[0].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`
        );
        dates[0].textContent = dayjs(data.list[4].dt_txt).format(
          "MMMM D, YYYY")
      

        temp[1].textContent = `Temp: ${data.list[12].main.temp} F`;
        humidity[1].textContent = `Humidity: ${data.list[12].main.humidity}%`;
        wind[1].textContent = `Wind ${data.list[12].wind.speed} MPH`;
        card[1].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[12].weather[0].icon}.png`
        );
        dates[1].textContent = dayjs(data.list[12].dt_txt).format(
          " MMMM D YYYY"
        );
        temp[2].textContent = `Temp: ${data.list[20].main.temp} F`;
        humidity[2].textContent = `Humidity: ${data.list[20].main.humidity}%`;
        wind[2].textContent = `Wind: ${data.list[20].wind.speed} MPH`;
        card[2].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[20].weather[0].icon}.png`
        );
        dates[2].textContent = dayjs(data.list[20].dt_txt).format(
          "MMMM D, YYYY"
        );
        temp[3].textContent = `Temp: ${data.list[28].main.temp} F`;
        humidity[3].textContent = `Humidity: ${data.list[28].main.humidity}%`;
        wind[3].textContent = `Wind: ${data.list[28].wind.speed} MPH`;
        card[3].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[28].weather[0].icon}.png`
        );
        dates[3].textContent = dayjs(data.list[28].dt_txt).format(
          "MMMM D, YYYY"
        );
        temp[4].textContent = `Temp: ${data.list[35].main.temp} F`;
        humidity[4].textContent = `Humidity: ${data.list[35].main.humidity}%`;
        wind[4].textContent = `Wind: ${data.list[35].wind.speed} MPH`;
        card[4].setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[35].weather[0].icon}.png`
        );
        dates[4].textContent = dayjs(data.list[35].dt_txt).format(
          "MMMM D, YYYY"
        );
      }
    });
}

// save the userInput to local storage

function loading() {
  // Loop through the saved cities and create a button for each one
  for (let i = 0; i < savedCities.length; i++) {
    const newButton = document.createElement("button");
    newButton.textContent = savedCities[i];
    newButton.classList.add("btn", "my-1", "btn-secondary", "w-100");
    buttonContainer.appendChild(newButton);
    newButton.addEventListener("click", () => {
      input.value = savedCities[i];
      getWeather();
    });
  }
}

//the submit event that starts the function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
});

loading();
//loads on page load