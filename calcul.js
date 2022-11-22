// -------- QS --------
const loanAmountInput = document.querySelector(".loan-amount");
const loanTimeInput = document.querySelector(".loan-time");
const nominalRateInput = document.querySelector(".nominal-rate");
const guaranteeInput = document.querySelector(".guarantee-costs");
const applicationFeeInput = document.querySelector(".application-fee");
const insuranceInput = document.querySelector(".insurance-rate");

const resultValue = document.querySelector(".result .value");

const calculateBtn = document.querySelector(".calculate-btn");
// -------- -------- --------

// -------- Inputs values --------
let loanAmount = parseFloat(loanAmountInput.value);
let loanTime = parseFloat(loanTimeInput.value);
let nominalRate = parseFloat(nominalRateInput.value);
let guaranteeCosts = parseFloat(guaranteeInput.value);
let loanapplicationFeeAmount = parseFloat(applicationFeeInput.value);
let insuranceRate = parseFloat(insuranceInput.value);
// -------- -------- --------

// -------- Functions --------
function add() {
  let result =
    loanAmount +
    loanTime +
    nominalRate +
    guaranteeCosts +
    loanapplicationFeeAmount +
    insuranceRate;
  return result;
}

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  loanTime = parseFloat(loanTimeInput.value);
  nominalRate = parseFloat(nominalRateInput.value);
  guaranteeCosts = parseFloat(guaranteeInput.value);
  loanapplicationFeeAmount = parseFloat(applicationFeeInput.value);
  insuranceRate = parseFloat(insuranceInput.value);
};
// -------- -------- --------

// -------- AEL --------
calculateBtn.addEventListener("click", () => {
  refreshInputValues();
  let result = add();
  resultValue.innerHTML = result;
});
// -------- -------- --------

let interestCost = (insuranceRate * loanAmount * loanTime) / 12;

// crédit de 300 000
// 240 mois (20 ans)
// frais de garanties 1500€ avec 1.7%
//
