const app = {
  init: () => {
    const calculateBtn = document.getElementById("calculate-btn");
    calculateBtn.addEventListener("click", app.handleSubmit);
  },

  handleSubmit: () => {
    const values = app.InputValues();
    app.calculTaeg(values);
  },

  calculTaeg: (props) => {
    // calcul tx périodique mensuel simplifié
    let txPeriodiqueMonthly = props.nominalRate / 100 / 12;
    // console.log(txPeriodiqueMonthly);

    // calcul mensualités sans assurance
    let monthlyWoInsurance =
      props.loanAmount *
      (txPeriodiqueMonthly /
        (1 - Math.pow(1 - txPeriodiqueMonthly, props.loanTime)));
    // console.log(monthlyWoInsurance);

    // calcul montant interets
    let interestAmount = monthlyWoInsurance * props.loanTime - props.loanAmount;
    // console.log(interestAmount);

    // calcul cout assurance / mois
    let MonthlyInsuranceCost =
      ((props.insuranceRate / 100) * props.loanAmount) / 12;
    // console.log(MonthlyInsuranceCost);

    // calcul cout total assurance
    let totalInsuranceCost = MonthlyInsuranceCost * props.loanTime;
    // console.log(totalInsuranceCost);

    // calcul mensualité avec assurance
    let monthlyWInsurance = monthlyWoInsurance + MonthlyInsuranceCost;
    // console.log(monthlyWInsurance);

    // calcul cout total du crédit (interets + assurance + frais)
    let totalLoanAmount =
      interestAmount +
      totalInsuranceCost +
      props.guaranteeCosts +
      props.loanapplicationFeeAmount +
      props.brokerageFeeAmount;
    // console.log(totalLoanAmount);

    // calcul montant interet(= cout total du crédit) pour un TAEG inconnu (i)
    let taeg = 0.000001;

    let loanGap =
      props.loanAmount *
        (taeg / (1 - Math.pow(1 - taeg, props.loanTime))) *
        props.loanTime -
      props.loanAmount -
      totalLoanAmount;
    // console.log(loanGap);

    while (loanGap < 0) {
      taeg += 0.00001;
      loanGap =
        props.loanAmount *
          (taeg / (1 - Math.pow(1 - taeg, props.loanTime))) *
          props.loanTime -
        props.loanAmount -
        totalLoanAmount;
    }
    // console.log(taeg);
    let result = (taeg * 12 * 100).toFixed(3);

    const resultValue = document.getElementById("taeg-result");
    const monthlyValue = document.getElementById("monthly-result");
    resultValue.innerHTML = result;
    monthlyValue.innerHTML = monthlyWInsurance.toFixed(2);
  },

  InputValues: () => {
    const loanAmountInput = document.getElementById("loan-amount");
    const loanTimeInput = document.getElementById("loan-time");
    const nominalRateInput = document.getElementById("nominal-rate");
    const guaranteeInput = document.getElementById("guarantee-costs");
    const applicationFeeInput = document.getElementById("application-fee");
    const brokerageFeeInput = document.getElementById("brokerage-fee");
    const insuranceInput = document.getElementById("insurance-rate");

    return {
      loanAmount: parseFloat(loanAmountInput.value),
      loanTime: parseFloat(loanTimeInput.value),
      nominalRate: parseFloat(nominalRateInput.value),
      guaranteeCosts: parseFloat(guaranteeInput.value),
      loanapplicationFeeAmount: parseFloat(applicationFeeInput.value),
      brokerageFeeAmount: parseFloat(brokerageFeeInput.value),
      insuranceRate: parseFloat(insuranceInput.value),
    };
  },
};
document.addEventListener("DOMContentLoaded", app.init);
