// -------- QS --------
const loanAmountInput = document.querySelector(".loan-amount");
const loanTimeInput = document.querySelector(".loan-time");
const nominalRateInput = document.querySelector(".nominal-rate");
const guaranteeInput = document.querySelector(".guarantee-costs");
const applicationFeeInput = document.querySelector(".application-fee");
const brokerageFeeInput = document.querySelector(".brokerage-fee");
const insuranceInput = document.querySelector(".insurance-rate");
const resultValue = document.querySelector(".result .value");
const monthlyValue = document.querySelector(".monthly .value");
const calculateBtn = document.querySelector(".calculate-btn");
// -------- -------- --------

// -------- Inputs values --------
let loanAmount = parseFloat(loanAmountInput.value);
let loanTime = parseFloat(loanTimeInput.value);
let nominalRate = parseFloat(nominalRateInput.value);
let guaranteeCosts = parseFloat(guaranteeInput.value);
let loanapplicationFeeAmount = parseFloat(applicationFeeInput.value);
let brokerageFeeAmount = parseFloat(brokerageFeeInput.value);
let insuranceRate = parseFloat(insuranceInput.value);

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  loanTime = parseFloat(loanTimeInput.value);
  nominalRate = parseFloat(nominalRateInput.value);
  guaranteeCosts = parseFloat(guaranteeInput.value);
  loanapplicationFeeAmount = parseFloat(applicationFeeInput.value);
  insuranceRate = parseFloat(insuranceInput.value);
};
// -------- -------- --------

// -------- Functions --------
function TaegCalculation() {
  let result =
    loanAmount +
    loanTime +
    nominalRate +
    guaranteeCosts +
    loanapplicationFeeAmount +
    insuranceRate;
  return result;
}

const monthlyValueCalcul = () => {
  monthlyValue.innerHTML = monthlyWInsurance.toFixed(2);
};

// -------- -------- --------
loanAmount = 300000;
loanTime = 240;
nominalRate = 1.7;
guaranteeCosts = 1500;
loanapplicationFeeAmount = 500;
brokerageFeeAmount = 0;
insuranceRate = 0.3;
// --------Calculs pour TAEG --------

// calcul tx périodique mensuel simplifié
let txPeriodiqueMonthly = nominalRate / 100 / 12;

// calcul mensualités sans assurance
let monthlyWoInsurance =
  loanAmount *
  (txPeriodiqueMonthly / (1 - Math.pow(1 - txPeriodiqueMonthly, loanTime)));

// calcul montant interets
let interestAmount = monthlyWoInsurance * loanTime - loanAmount;

// calcul cout assurance / mois
let MonthlyInsuranceCost = ((insuranceRate / 100) * loanAmount) / 12;

// calcul cout total assurance
let totalInsuranceCost = MonthlyInsuranceCost * loanTime;

// calcul mensualité avec assurance
let monthlyWInsurance = monthlyWoInsurance + MonthlyInsuranceCost;
console.log(monthlyWInsurance);

// calcul cout total du crédit (interets + assurance + frais)
let totalLoanAmount =
  interestAmount +
  totalInsuranceCost +
  guaranteeCosts +
  loanapplicationFeeAmount +
  brokerageFeeAmount;
console.log(totalLoanAmount);

// calcul montant interet(= cout total du crédit) pour un TAEG inconnu (i)

// -------- -------- --------

// -------- AEL --------
calculateBtn.addEventListener("click", () => {
  refreshInputValues();
  monthlyValueCalcul();
  let result = TaegCalculation();
  resultValue.innerHTML = result;
});
// -------- -------- --------
