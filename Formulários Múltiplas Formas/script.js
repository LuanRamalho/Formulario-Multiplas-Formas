const formContainer = document.getElementsByClassName("form-container");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const steps = document.getElementsByClassName("steps");
const error = document.getElementById("error-message");

let currentStep = 0;

window.onload = () => {
  currentStep = 0;
  steps[currentStep].classList.add("highlight");
  updateStepVisibility(currentStep);
  toggleButtonVisibility();
};

//Display buttons
const toggleButtonVisibility = () => {
  if (currentStep === 0) {
    previousBtn.classList.add("hide");
  } else {
    previousBtn.classList.remove("hide");
  }

  if (currentStep === formContainer.length - 1) {
    nextBtn.classList.add("hide");
    submitBtn.classList.remove("hide");
  } else {
    nextBtn.classList.remove("hide");
    submitBtn.classList.add("hide");
  }
};

//Display form options based on stepIndex
const updateStepVisibility = (stepIndex) => {
  for (let i = 0; i < formContainer.length; i++) {
    const element = formContainer[i];
    if (i === stepIndex) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  }
  toggleButtonVisibility();
};

//set highlight to next/previous step number
const updateStepHighlight = (stepIndex) => {
  for (let i = 0; i < steps.length; i++) {
    steps[i].classList.remove("highlight");
  }
  steps[stepIndex].classList.add("highlight");
};

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (areFieldsFilled()) {
    if (currentStep < formContainer.length - 1) {
      currentStep++;
      updateStepHighlight(currentStep);
      updateStepVisibility(currentStep);
    }
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (areFieldsFilled()) {
    submitBtn.disabled = true;
    previousBtn.disabled = true;
    alert("Sucesso");
  }
});

previousBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentStep > 0) {
    currentStep--;
    updateStepHighlight(currentStep);
    updateStepVisibility(currentStep);
  }
});
//Password verification
const passwordVerify = (password) => {
  const regEx =
    /^(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[\$\%\^\&\!@\#\*\(\)\+\=`~\?\>\<])/;
  return regEx.test(password) && password.length >= 8;
};

//Phone verification
const phoneVerify = (number) => {
  const regEx = /^[0-9]{11}$/;
  return regEx.test(number);
};

//email verification
const emailVerify = (input) => {
  const regEx = /^[a-z0-9_]+@[a-z]{3,}\.[a-z\.]{3,}$/;
  return regEx.test(input);
};
const areFieldsFilled = () => {
  const currentStepContainer = formContainer[currentStep];
  const inputs = currentStepContainer.querySelectorAll("input");
  for (let input of inputs) {
    const inputValue = input.value.trim();
    switch (input.type) {
      case "email":
        if (!emailVerify(inputValue)) {
          error.innerText = "Por favor, digite o email corretamente";
          return false;
        }
        break;
      case "number":
        if (!parseInt(inputValue)) {
          error.innerText = "Por favor, entre com o número correto";
          return false;
        }
        if (input.id == "phone-input" && !phoneVerify(inputValue)) {
          error.innerText = "Número de Telefone deve haver 11 dígitos, incluindo o DDD";
          return false;
        }
        break;
      case "password":
        if (!passwordVerify(inputValue)) {
          error.innerText =
            "Senha, incluindo letras maiúsculas, minúsculas, caracteres especiais, números, devem ser >= 8";
          return false;
        }
        break;
      default:
        if (inputValue === "") {
          error.innerText = "Por favor, insira os dois valores primeiro";
          return false;
        }
        break;
    }
  }
  error.innerText = "";
  return true;
};
