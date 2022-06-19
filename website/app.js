// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
// The URL to retrieve weather information from his API (country : US)
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// // Personal API Key for OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const apiKey = ",&appid=d24bf70d6dae818a6893be61edd0ae3c&units=metric";

// the URL of the server to post data
const server = "http://127.0.0.1:4000";

/**
 * // generateData //
 * function to get input values
 * call getWeatherData to fetch the data from API
 * create object from API object by using destructuring
 * post the data in the server
 * get the data to update UI
 */


const generateData = () => {
  //get value after click on the button
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    postData(server+'/add', { date: newDate,city:data.name ,temp: data.main.temp,weather:data.weather[0].description,feelings  });
      updatingUI();

  });
};


// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", generateData);
// Function called by event listener


//Function to GET Web API Data

const getWeatherData = async (zip) => {

    const res = await fetch(baseURL + zip + apiKey); //make the link where the api sent the data
  try {
    const data = await res.json(); //convert to json

        return data; //data contains all the json data we need in a promise



  } catch (error) {
    console.log(error);
  }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

//Function to GET Project Data
// and updating UI by this data
const updatingUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const savedData = await res.json();

    document.getElementById("date").innerHTML = savedData.date;
    document.getElementById("city").innerHTML = savedData.city;
    document.getElementById("temp").innerHTML = savedData.temp + '&degC';
    document.getElementById("description").innerHTML = savedData.weather;
    document.getElementById("content").innerHTML = savedData.feelings;

  } catch (error) {
    console.log(error);
  }
};
