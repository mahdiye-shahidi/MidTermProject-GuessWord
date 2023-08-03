  //Word and Hints Object
  const options = {
    ارام: "وسیع ترین اقیانوس جهان",
    هفت: "تعداد نت های موسیقی",
    زیتون: "درختی که نماد صلح است",
    مارک: "واحد پول کشور آلمان",
    استرالیا: "قاره ای که وسعت کره ماه به اندازه آن است",
    ریاض: "شهری که بزرگترین فرودگاه جهان را دارد",
    کانبرا: "پایتخت استرالیا",
    ملخ: "فراوان ترین موجود کره زمین",
    زبان: "سریع ترین عضله بدن",
    خرگوش : "حیوانی که نماد عید پاک در مسیحیت است"
  };

  
  
  //Initial References
  const message = document.getElementById("message");
  const hintRef = document.querySelector(".hint-ref");
  const controls = document.querySelector(".controls-container");
  const startBtn = document.getElementById("start");
  const letterContainer = document.getElementById("letter-container");
  const userInpSection = document.getElementById("user-input-section");
  const resultText = document.getElementById("result");
  const word = document.getElementById("word");
  const words = Object.keys(options);
  let randomWord = "",
    randomHint = "";
  let winCount = 0,
    lossCount = 0;
  
    
  const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
  
  
  const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters");
    stopGame();
  };
  
  //Start Game
  function chooseDif1() {
    window.location.href = "keyboard.html";
  }
  function chooseDif2() {
    window.location.href = "keyboard.html";
  }
  function chooseDif3() {
    window.location.href = "keyboard.html";
  }
  startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
  });
  
  //Stop Game
  const stopGame = () => {
    controls.classList.remove("hide");
  };
  
  //Generate Word Function
  const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint">
    <span>سوال: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach((value) => {
      displayItem += '<span class="inputSpace">_ </span>';
    });
  
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id='chanceCount'>شانس انتخاب حرف: ${lossCount}</div>`;
  };
  
  //Initial Function
  const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
    const persianCharacters = [
       1581, 1670, 1580, 1579, 1578, 1662, 1576, 1575,
      1582, 1583, 1584, 1585, 1586, 1688, 1587, 1588, 
      1589, 1590, 1591, 1592, 1593, 1594, 1601, 1602, 
      1705, 1711, 1604, 1605, 1606, 1608, 1607, 1740 
    ];
    //For creating letter buttons
    for (let i = 0; i < persianCharacters.length; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
  
      //Number to ASCII[ا-ی]
      button.innerText = String.fromCharCode(persianCharacters[i]);
  
      //Character button onclick
      button.addEventListener("click", () => {
        message.innerText = `درست`;
        message.style.color = "#007000";
        message.style.marginTop = "15px";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
  
        //If array contains clicked value replace the matched Dash with Letter
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            //If character in array is same as clicked button
            if (char === button.innerText) {
              button.classList.add("correct");
              //Replace dash with letter
              inputSpace[index].innerText = char;
              //increment counter
              winCount += 1;
              //If winCount equals word length
              if (winCount == charArray.length) {
                resultText.innerHTML = "آفرین! درسته";
                resultText.style.marginBottom = "24px";
                resultText.style.color = "#04350d";
                resultText.style.fontSize = "22px";
                startBtn.innerText = "سوال بعدی";
                //block all buttons
                blocker();
              }
            }
          });
        } else {
          //lose count
          button.classList.add("incorrect");
          lossCount -= 1;
          document.getElementById(
            "chanceCount"
          ).innerText = `سوال بعدی: ${lossCount}`;
          message.innerText = `اشتباه`;
          message.style.color = "#ff0000";
          message.style.marginTop = "15px";
          if (lossCount == 0) {
            word.innerHTML = `کلمه: <span>${randomWord}</span>`;
            word.style.marginBottom = "20px";
            word.style.color = "#fff6a9";
            word.style.fontSize = "18px";
            resultText.innerHTML ="پاسخ شما نادرست است";
            resultText.style.marginBottom = "20px";
            resultText.style.color = "#fff6a9";
            resultText.style.fontSize = "18px";
            blocker();
          }
        }
  
        //Disable clicked buttons
        button.disabled = true;
      });
  
      //Append generated buttons to the letters container
      letterContainer.appendChild(button);
    }
  };
  
  window.onload = () => {
    init();
  };