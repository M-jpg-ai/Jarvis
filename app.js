// vars and elements
const turn_on = document.querySelector("#turn_on");
const jarvis_intro = document.querySelector("#j_intro");
const time = document.querySelector("#time");
const machine = document.querySelector(".machine");
small = 0;
// const msgs = document.querySelector(".messages");
// whether the recognition is stopiing on my command or automatically
let stopingR = false;
// jarvis's commands
let jarvisComs = [];
jarvisComs.push("hi jarvis");
jarvisComs.push("what are your commands");
jarvisComs.push("close this - to close opened popups");
jarvisComs.push(
  "change my information - information regarding your acoounts and you"
);
jarvisComs.push("whats the weather or temperature");
jarvisComs.push("show the full weather report");
jarvisComs.push("are you there - to check jarviss presence");
jarvisComs.push("shut down - stop voice recognition");
jarvisComs.push("open google");
jarvisComs.push('search for "your keywords" - to search on google ');
jarvisComs.push("open whatsapp");
jarvisComs.push("open youtube");
jarvisComs.push('play "your keywords" - to search on youtube ');
jarvisComs.push("close this youtube tab - to close opened youtube tab");
jarvisComs.push("open firebase");
jarvisComs.push("open netlify");
jarvisComs.push("open twitter");
jarvisComs.push("open my twitter profile");
jarvisComs.push("open instagram");
jarvisComs.push("open my instagram profile");
jarvisComs.push("open github");
jarvisComs.push("open my github profile");

// youtube window
let ytbWindow;

// create a new message
// function createMsg(who, msg) {
//   let newmsg = document.createElement("p");
//   newmsg.innerText = msg;
//   newmsg.setAttribute("class", who);
//   msgs.appendChild(newmsg);
// }

// show a warn to check for all the commands
console.warn('*to check for the commands speak "what are your commands"');

// // date and time
// let date = new Date();
// let hrs = date.getHours();
// let mins = date.getMinutes();
// let secs = date.getSeconds();

// this is what jarvis tells about weather
let weatherStatement = "";
let charge, chargeStatus, connectivity, currentTime
chargeStatus = "unplugged"

window.onload = () => {
  turn_on.play();
  turn_on.addEventListener("ended", () => {
    setTimeout(() => {
      // autoJarvis();
      readOut("Ready to go sir");
      if (localStorage.getItem("jarvis_setup") === null) {
        readOut(
          ", kindly fill out the form on your screen so that you could access most of my features and if you want to see my commands see a warning in the console"
        );
      }
    }, 200);
  });

  jarvisComs.forEach((e) => {
    document.querySelector(".commands").innerHTML += `<p>#${e}</p><br />`;
  });
  // battery
  let batteryPromise = navigator.getBattery();
  batteryPromise.then(batteryCallback);

  // internet connectivity

  if (navigator.onLine) {
    document.querySelector("#internet").textContent = "online"
    connectivity = "online"
  } else {
    document.querySelector("#internet").textContent = "offline"
    connectivity = "offline"
  }

  setInterval(() => {
    if (navigator.onLine) {
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }
  }, 60000);

  function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    setInterval(() => {
      printBatteryStatus(batteryObject);
    }, 5000);
  }

  function printBatteryStatus(batteryObject) {
    document.querySelector("#battery").textContent = `${
      (batteryObject.level * 100).toFixed(2)
    }%`;
    charge = batteryObject.level * 100
    if (batteryObject.charging === true) {
      document.querySelector(".battery").style.width = "200px";
      document.querySelector("#battery").textContent = `${
        (batteryObject.level * 100).toFixed(2)
      }% Charging`;
      chargeStatus = "plugged in"
    }
  }

  //   // timer
  setInterval(() => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    hours = hrs % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = mins < 10 ? '0' + mins : mins;
    seconds = secs < 10 ? '0' + secs : secs;
    var ampm = hours >= 12 ? 'pm' : 'am';
    time.textContent = `${hours} : ${minutes} : ${seconds} ${ampm}`;
    currentTime = hours + ':' + minutes + " " + ampm;
  }, 1000);
};

// function formatAMPM(date) {

//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var seconds = date.getSeconds();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0'+minutes : minutes;
//   seconds = seconds < 10 ? '0'+seconds : seconds;
//   var strTime = hours + ':' + minutes + ':'+seconds+" " + ampm;
//   currentTime = strTime
//   time.textContent = strTime
// }

// formatAMPM(date)
// setInterval(() => {
//   formatAMPM(date)
// }, 1000);

// auto jarvis

function autoJarvis() {
  setTimeout(() => {
    recognition.start();
  }, 1000);
}

// 
// start jarvis with btn
document.querySelector("#start_jarvis_btn").addEventListener("click", () => {
  recognition.start();
})


document.querySelector("#stop_jarvis_btn").addEventListener("click", () => {
  stopingR = true;
  recognition.stop();
})

// show waether
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = ` the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}

// convert kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

if (localStorage.getItem("jarvis_setup") !== null) {
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
}

// jarvis information setup

const setup = document.querySelector(".jarvis_setup");
setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") === null) {
  setup.style.display = "flex";
  setup.querySelector("button").addEventListener("click", userInfo);
}

function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    twitter: setup.querySelectorAll("input")[4].value,
    github: setup.querySelectorAll("input")[5].value,
  };

  let testArr = [];

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  if (testArr.includes("")) {
    readOut(" enter your complete information");
  } else {
    localStorage.clear();
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
}

// speech recognition

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

var synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();

recognition.onstart = function () {
  console.log("voice recognition activated");
  document.querySelector("#stop_jarvis_btn").style.display = "flex"
};

// arr of window
let windowsB = []

recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  let userData = localStorage.getItem("jarvis_setup");
  // createMsg("usermsg", transcript);
  // commands
  // hi - hello
  console.log(transcript);
  //if(transcript.includes("jarvis")){
  if (transcript == "jarvis") {
    readOut("yes sir What can i do for you")
  } else if (transcript.includes("hi jarvis")) {
    readOut("hello sir");
  }
  // some casual commands
  else if (transcript.includes("current charge")) {
    readOut(`the current charge is ${charge} percent`);
  } else if (transcript.includes("charging status")) {
    readOut(`the current charging status is ${chargeStatus}`);
  } else if (transcript.includes("time")) {
    readOut("the time is" + currentTime);
  } else if (transcript.includes("connection status")) {
    readOut(`you are ${connectivity} `);
  }
  // jarvis commands
  else if (transcript.includes("what are your commands")) {
    readOut(" here's the list of commands i can follow");
    if (window.innerWidth <= 400) {
      window.resizeTo(screen.width, screen.height)
    }
    document.querySelector(".commands").style.display = "block";
  } else if (transcript.includes("what are your comments")) {
    readOut(" here's the list of commands i can follow");
    if (window.innerWidth <= 400) {
      window.resizeTo(screen.width, screen.height)
    }
    document.querySelector(".commands").style.display = "block";
  }
  // jarvis bio
  else if (transcript.includes("tell about yourself")) {
    readOut(
      ", i am jarvis, a voice asistant made for browsers using javascript. I can do anything which can be done from a browser."
    );
  }
  //make jarvis small



  // info change
  else if (transcript.includes("change my information")) {
    readOut("Opening the information tab ");
    localStorage.clear();

    if (window.innerWidth <= 400) {
      window.resizeTo(screen.width, screen.height)
    }
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
  }


  // weather report
  else if (
    transcript.includes("temperature")
  ) {
    readOut(weatherStatement + "celcius");
  } else if (transcript.includes("full weather report")) {
    readOut("opening the weather report ");
    let a = window.open(
      `https://www.google.com/search?q=weather+in+${
        JSON.parse(localStorage.getItem("jarvis_setup")).location
      }`
    );
    windowsB.push(a);
    // localStorage.push("tabs",a);
  }

  // whatsapp
  else if (transcript.includes("open whatsapp")) {
    readOut("opening whatsapp");
    let a = window.open("https://web.whatsapp.com/");
    windowsB.push(a);
    // localStorage.push("tabs",a);

  }



  // close all opened tabs 
  else if (transcript.includes("close all tabs")) {
    readOut("closing all tabs ")
    windowsB.forEach((e) => {
      e.close()
    })

    // localStorage.getItem("tabs").forEach((e)=>{
    // e.close()
    // })

  }

  // availability check
  else if (transcript.includes("are you there")) {
    readOut("yes sir");
  }

  // spotify
  else if (transcript.includes("open spotify")) {
    readOut("opening spotify");
    let a = window.open("https://open.spotify.com/playlist/3ueShdfQIHLtpzisAoCSzf");
    windowsB.push(a);
  }




  // canva
  else if (transcript.includes("open my canva designs")) {
    readOut("opening canva designs");
    let a = window.open("https://www.canva.com/folder/all-designs");
    windowsB.push(a);
  } else if (transcript.includes("open gmail")) {
    readOut("opening gmail");
    let a = window.open("https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox");
    windowsB.push(a);
  } else if (transcript.includes("open canva")) {
    readOut("opening canva");
    let a = window.open("https://www.canva.com/");
    windowsB.push(a);
  }

  // userdata access commands
  else if (transcript.includes("name")) {
    readOut(`, I know that you are ${JSON.parse(userData).name}`);
  } else if (transcript.includes("bio")) {
    readOut(`, I know that you are a ${JSON.parse(userData).bio}`);
  }

  // google
  else if (transcript.includes("open google")) {
    readOut("opening google");
    let a = window.open("https://www.google.com/");
    windowsB.push(a);
  } else if (transcript.includes("search for")) {
    readOut("here's your result");
    let input = transcript.split("");
    console.log(input);
    input.splice(0, 11);
    input = input.join("").split(" ").join("+");

    let a = window.open(`https://www.google.com/search?q=${input}`);
    windowsB.push(a);
  }

  // youtube
  else if (transcript.includes("open youtube")) {
    readOut("opening youtube ");
    let a = window.open("https://www.youtube.com/");
    windowsB.push(a);
  } else if (transcript.includes("play")) {
    let playStr = transcript.split("");
    playStr.splice(0, 5);
    let videoName = playStr.join("");
    playStr = playStr.join("").split(" ").join("+");
    readOut(`searching youtube for ${videoName}`);
    let a = window.open(`https://www.youtube.com/search?q=${playStr}`);
    windowsB.push(a);
  }


  // instagram
  else if (transcript.includes("open instagram")) {
    readOut("opening instagram ");
    let a = window.open("https://www.instagram.com");
    windowsB.push(a);
  } else if (transcript.includes("open my instagram profile")) {
    if (JSON.parse(userData).instagram) {
      readOut("opening your instagram profile");
      let a = window.open(
        `https://www.instagram.com/${JSON.parse(userData).instagram}/`
      );
      windowsB.push(a);
    } else {
      readOut(" i didn't found your instagram information");
    }
  }
  // twitter
  else if (transcript.includes("open my twitter profile")) {
    readOut("opening your twitter profile");
    let a = window.open(`https://twitter.com/${JSON.parse(userData).twitter}`);
    windowsB.push(a);
  } else if (transcript.includes("open twitter")) {
    readOut("opening twitter ");
    let a = window.open(`https://twitter.com/`);
    windowsB.push(a);
  }

  // github
  else if (transcript.includes("open my github profile")) {
    readOut("opening your github profile");
    let a = window.open(`https://github.com/${JSON.parse(userData).github}`);
    windowsB.push(a);
  } else if (transcript.includes("open github")) {
    readOut("opening github");
    let a = window.open("https://github.com/");
    windowsB.push(a);
  }



  //  // close popups
  else if (transcript.includes("close this")) {
    readOut("closing the tab ");
    document.querySelector(".commands").style.display = "none";
    if (window.innerWidth >= 401) {
      window.resizeTo(215, 270);
    }
    setup.style.display = "none";
  }


  // close voice recognition
  else if (transcript.includes("shutdown")) {
    readOut("Ok  i will take a nap");
    stopingR = true;
    recognition.stop();
    document.getElementById("stop_jarvis_btn").click();
  }



  // // firebase
  else if (transcript.includes("open firebase")) {
    readOut("opening firebase console");
    let accId = transcript;
    accId = accId.split("");
    accId.pop();
    accId = accId[accId.length - 1];
    console.log(`accId: ${accId}`);
    // https://console.firebase.google.com/u/0/
    let a = window.open(`https://console.firebase.google.com/u/${accId}/`);
    windowsB.push(a);
  }

  // white hat junior
  else if (transcript.includes("open white hat junior")) {
    readOut("opening white hat junior");
    let a = window.open("https://code.whitehatjr.com/s/dashboard");
    windowsB.push(a);
  }

  // rediffmail
  else if (transcript.includes("open rediffmail")) {
    readOut("opening rediffmail");
    let a = window.open("https://f1mail.rediff.com/ajaxprism/maillist?user_size=1&els=e2ee6f53b413d9f9fcc81cbbe6e8072b");
    windowsB.push(a);
  } else if (transcript.includes("open read email")) {
    readOut("opening reddy mail");
    let a = window.open("https://f1mail.rediff.com/ajaxprism/maillist?user_size=1&els=e2ee6f53b413d9f9fcc81cbbe6e8072b");
    windowsB.push(a);
  }
  // tinkercad
  else if (transcript.includes("open tinkercad")) {
    readOut("opening tinkercad");
    let a = window.open("https://www.tinkercad.com/dashboard");
    windowsB.push(a);
  }

  // Mom
  else if (transcript.includes("open my mum project")) {
    readOut("opening your mom project");
    let a = window.open("https://www.tinkercad.com/things/kIrSzgneFZf");
    windowsB.push(a);
  } else if (transcript.includes("open my mum design")) {
    readOut("opening your mom design");
    let a = window.open("https://www.tinkercad.com/things/kIrSzgneFZf");
    windowsB.push(a);
  }

  // 101
  else if (transcript.includes("open project 101")) {
    readOut("opening project 101");
    let a = window.open("https://www.tinkercad.com/things/huUsLckoUHt");
    windowsB.push(a);
  } else if (transcript.includes("open project one not one")) {
    readOut("opening project 101");
    let a = window.open("https://www.tinkercad.com/things/huUsLckoUHt");
    windowsB.push(a);
  }

  // GSLV
  else if (transcript.includes("open my gslv fatboy project")) {
    readOut("opening GSLV fatboy project");
    let a = window.open("https://www.tinkercad.com/things/aps6nW1hbXR");
    windowsB.push(a);
  } else if (transcript.includes("open my gslv fatboy design")) {
    readOut("opening  GSLV fatboy design");
    let a = window.open("https://www.tinkercad.com/things/aps6nW1hbXR");
    windowsB.push(a);
  }




  //thunkable
  else if (transcript.includes("open thunkable")) {
    readOut("opening thunkable");
    let a = window.open("https://x.thunkable.com/projects");
    windowsB.push(a);
  }


  //stop speaking(
  else if (transcript.includes("stop")) {
    speechSynthesis.cancel();
    readOut("ok sir");
  }



  //***********************************************************/

  // if (transcript.includes("add")){
  //   // let addStr = transcript.split("");
  //   // console.log(addStr);
  //   var matches = transcript.match(/(\d+)/);
  //   console.log(matches);
  //      let add_num_1 = matches[0];
  //      console.log(add_num_1);
  //      if(transcript.includes("and")){
  //   //     var matches = transcript.match(/(\d+)/);
  //   // console.log(matches);
  //      let add_num_2 = trnscript.splice(0,3);
  //      console.log(add_num_2); 
  //      }
  //     readOut("the sum is "+add_num_1);
  //     // ${add_num_1+add_num_2}`
  // }
  // if (transcript.includes("open notepad")) {
  //   readOut("opening notepad");
  //   notepad_open();
  // }
  // function notepad_open(){
  // var o = new ActiveXObject("WScript.Shell");
  // o.Run("notepad.exe");
  // o = null;
  // } 

  // netlify
  else if (transcript.includes("open net li fi")) {
    readOut("opening netlify");
    let a = window.open("https://app.netlify.com/");
    windowsB.push(a);
  // } else if (transcript.includes("small")) {
  //   //readOut("Becoming small");
  //   small=1;
  //   if (small) { //
  //     window.open(`${window.location.href}`, "newWindow", "menubar=true,location=true,resizable=true,scrollbars=false,width=200,height=200,top=0,left=0");
  //     window.close();
  //     small = 0;
  //   }
  // } else if (transcript.includes("big")) {
  //   //readOut("becoming big");

  //   if (!small) {
  //     window.open(`${window.location.href}`, "newWindow", "menubar=true,location=true,resizable=true,scrollbars=false,width=1500,height=800,top=0,left=0");
  //     window.close();
  //     small = 1;
  //   }
    

  } else {
    readOut("Sorry sir I did Not Understand what you said");
  }


  //***********************************************************/

}
//else{readOut("Please follow the syntak of the command")}
//}




recognition.onend = function () {
  if (stopingR === false) {
    setTimeout(() => {
      recognition.start();
    }, 500);
  } else if (stopingR === true) {
    recognition.stop();
    document.querySelector("#stop_jarvis_btn").style.display = "none"
  }
};

// speak out



function readOut(message) {
  speech.text = message;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("Speaking out");
  // createMsg("jmsg", message);
}



// small jarvis
const smallJarvis = document.querySelector("#small_jarvis")

smallJarvis.addEventListener("click", () => {
  window.open(`${window.location.href}`, "newWindow", "menubar=true,location=true,resizable=false,scrollbars=false,width=200,height=200,top=0,left=0")
  window.close()
})



document.querySelector("#jarvis_start").addEventListener("click", () => {
  recognition.start()
})