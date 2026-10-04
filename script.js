function generatePassword() {

  const lengthInput = document.getElementById("length");

  const length = Number(lengthInput.value);

  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;

  let characters = "";


  // Build character set
  if (uppercase) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (lowercase) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }

  if (numbers) {
    characters += "0123456789";
  }

  if (symbols) {
    characters += "!@#$%^&*()_+[]{}|;:,.<>?";
  }


  // Check whether at least one character type is selected
  if (characters.length === 0) {

    document.getElementById("password").textContent =
      "Select at least one option.";

    return;
  }


  // Generate password
  let password = "";

  for (let i = 0; i < length; i++) {

    const randomIndex = Math.floor(
      Math.random() * characters.length
    );

    password += characters.charAt(randomIndex);
  }


  /*
      Split password after 35 characters.
  
      Example:
  
      35 characters:
      ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789
  
      40 characters:
      ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789
      0abc1
  
      50 characters:
      ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789
      0abc1DEFgh2IJKlm3
  */

  const firstLine = password.substring(0, 35);

  const secondLine = password.substring(35);


  const passwordElement =
    document.getElementById("password");


  // Clear previous password
  passwordElement.innerHTML = "";


  // Add first line
  const firstLineElement =
    document.createElement("span");

  firstLineElement.textContent = firstLine;

  passwordElement.appendChild(firstLineElement);


  // Add second line if necessary
  if (secondLine.length > 0) {

    const lineBreak =
      document.createElement("br");

    const secondLineElement =
      document.createElement("span");

    secondLineElement.textContent = secondLine;


    passwordElement.appendChild(lineBreak);

    passwordElement.appendChild(secondLineElement);
  }


}

/* =========================
Number input → Slider
========================= */

function updateSlider() {

  const lengthInput =
    document.getElementById("length");

  const slider =
    document.getElementById("length-slider");


  let length = Number(lengthInput.value);


  // Keep value between 5 and 50
  if (length < 5) {
    length = 5;
  }

  if (length > 50) {
    length = 50;
  }


  lengthInput.value = length;

  slider.value = length;


  generatePassword();


}

/* =========================
Slider → Number input
========================= */

function updateNumber() {

  const slider =
    document.getElementById("length-slider");

  const lengthInput =
    document.getElementById("length");


  const length = Number(slider.value);


  lengthInput.value = length;


  generatePassword();


}

/* =========================
Copy Password
========================= */

function copyPassword() {

  const passwordElement =
    document.getElementById("password");


  /*
      textContent gets the actual password
      without the visual <br>.
  */

  const password =
    passwordElement.textContent;


  if (!password) {
    return;
  }


  navigator.clipboard.writeText(password)
    .then(() => {

      alert("Password copied to clipboard!");

    })
    .catch(() => {

      alert("Unable to copy password.");

    });


}

/* =========================
Initial Password
========================= */

generatePassword();