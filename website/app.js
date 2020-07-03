/* Global Variables */
const KEY='7fd5a8819fb9bbf52e3c735cbfa182f7';
const APIurl='https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=';


const getWeather = async ( url = '')=>{
  let response = await fetch(url);
  try {
    let dataToSend = await response.json();
     console.log(dataToSend);
    return dataToSend;
  } catch (err) {
    console.log("Err:", err)
  }
}
const generate= async function() {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  const url = `${APIurl}${zip}&APPID=${KEY}`;
  
  if (zip.length === 0 || feelings.length === 0) {
    alert("Messing values !");
    return
  }

  let weather_data = await getWeather(url);
  
  let temp = weather_data.main.temp;

  let d = new Date();
  let date = d.getDate() + '.'+ (d.getMonth() + 1 )+ '.' + d.getFullYear();

  const data = {
    date: date,
    temp: temp,
    content: content
  }
  
  //Post data to owr own server
  await postData("http://localhost:1000/projectData", data);
  
  //Update UI
  updateUI();  
}


const updateUI= async function() {
  const dateDiv = document.getElementById('date');
  const tempDiv = document.getElementById('temp');
  const contentDiv = document.getElementById('content');
  
  //Get data from owr own server
  let dataToSend = await getData("http://localhost:1000/projectData");
  
  //Updating the UI
  dateDiv.innerText = dataToSend.date;
  tempDiv.innerText = dataToSend.temp;
  contentDiv.innerText = dataToSend.content;
}

const getData= async function(url) {
  let response = await fetch(url)
  try {
    let data = response.json();
    console.log(data);
    
    return data;
  } catch(err){
    console.log(err);
  }
 
}
async function postData(url,data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json(); 
}





const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', generate);
// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// postData('/add', {answer:42});
// postData('/add', {answer:50});