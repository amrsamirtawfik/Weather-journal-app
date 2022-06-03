// Creating a new date instance dynamically with JS
let date = new Date();
let newDate = date.toDateString();

// The URL to retrieve weather information from his API (country : US)
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";

// // Personal API Key for OpenWeatherMap API
// &units=metric to get the Celsius Temperature
const myApiKey = ",&appid=f973730d7c8d459650eb8ff4e6ce6b07&units=metric";

// the URL of the server to post data
const server_no = "http://127.0.0.1:4000";

// showing the error to the user
const error = document.getElementById("error");
/**
 * // makeData //
 * function to get input values
 * call getWeatherData to fetch the data from API
 * create object from API object by using destructuring
 * post the data in the server
 * get the data to update UI
 */

const makeData = () => {
  //get value after user clicks on button
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeatherData return promise
  getWeatherData(zip).then((data) => {
    //check for the data to be true
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data; //making data object containing the needed data

      const info = {
        newDate,
        city,
        temp: Math.round(temp), // convert to int
        description,
        feelings,
      }; //making info object containing information to be printed

      postData(server_no + "/add", info);

      updateUI(); //function to update the ui dynamically

    }
  });
};

//func to getdata and update UI by this data
const updateUI = async () => {
  const res = await fetch(server_no + "/all");
  try {
    const op_data = await res.json();

    document.getElementById("date").innerHTML = op_data.newDate;
    document.getElementById("city").innerHTML = op_data.city;
    document.getElementById("temp").innerHTML = op_data.temp + '&degC';
    document.getElementById("description").innerHTML = op_data.description;
    document.getElementById("content").innerHTML = op_data.feelings;
  } catch (error) {
    console.log(error);
  }
};

// addEventListener to button click
document.getElementById("generate").addEventListener("click", makeData);


const getWeatherData = async (zip) =>
//GET data from API
 {
  try {
    const res = await fetch(url + zip + myApiKey);
    const data = await res.json();

    if (data.cod != 200) //data.cod is data returned from api if the netered city is correct
    {
      // display the error message on UI
      error.innerHTML = data.message;
      setTimeout(_=> error.innerHTML = '', 2000)
      throw `${data.message}`;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// post data
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
    console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
