export const employeeDti = (cartValue, monthlyIncome, loan, interestRate, minimumDownPay, tenor,) => {
  if (minimumDownPay < cartValue * 0.3) {
    return
  }
  const monthlyNetIncome = monthlyIncome - loan;
  const shoppingCredit = cartValue - minimumDownPay;
  const monthlyRepayment = ((shoppingCredit * interestRate * tenor) + shoppingCredit) / tenor
  const dti = (monthlyRepayment / monthlyNetIncome) * 100

  return {
    dti: Number(dti.toFixed(1)),
    shoppingCredit: Math.round(shoppingCredit),
    monthlyRepayment: Math.round(monthlyRepayment)
  }
}

export const businessDti = (cartValue, monthlyIncome, monthlyExpenses, loan, interestRate, minimumDownPay, tenor,) => {
  if (minimumDownPay < cartValue * 0.3) {
    return
  }
  if (minimumDownPay > cartValue){
    return
  }
  const monthlyNetIncome = monthlyIncome - monthlyExpenses - loan;
  const shoppingCredit = cartValue - minimumDownPay;
  const monthlyRepayment = ((shoppingCredit * interestRate * tenor) + shoppingCredit) / tenor
  const dti = (monthlyRepayment / monthlyNetIncome) * 100
  return {
    dti: Number(dti.toFixed(1)),
    shoppingCredit: Math.round(shoppingCredit),
    monthlyRepayment: Math.round(monthlyRepayment)
  }
}

export const setStatus = (cartValue, monthlyIncome, monthlyExpenses, loan, interestRate, minimumDownPay, passedMonth) => {

  let monthsArray = [];
  let data;
  let textString = '';
  let monthlyRepay = [];
  let repay;
  for (let i = 0; i < arrayOfStatuses.length; i++) {
    let tenor = i + 1
    data = businessDti(cartValue, monthlyIncome, monthlyExpenses, loan, interestRate, minimumDownPay, tenor)
    const dti = data.dti
    monthlyRepay.push(data.monthlyRepayment)
    if (dti < 16) {
      monthsArray.push({ id: (i + 1), monthlyRepayment: monthlyRepay[i], text: arrayOfStatuses[0].status, description: arrayOfStatuses[0].description });
    } else if (dti < 26) {
      monthsArray.push({ id: (i + 1), monthlyRepayment: monthlyRepay[i], text: arrayOfStatuses[1].status, description: arrayOfStatuses[1].description });
    } else if (dti < 36) {
      monthsArray.push({ id: (i + 1), monthlyRepayment: monthlyRepay[i], text: arrayOfStatuses[2].status, description: arrayOfStatuses[2].description });
    } else if (dti < 41) {
      monthsArray.push({ id: (i + 1), monthlyRepayment: monthlyRepay[i], text: arrayOfStatuses[3].status, description: arrayOfStatuses[3].description });
    } else if (dti < 46) {
      monthsArray.push({ id: (i + 1), monthlyRepayment: monthlyRepay[i], text: arrayOfStatuses[4].status, description: arrayOfStatuses[4].description });
    } else {
      monthsArray.push({ id: (i + 1), monthlyRepayment: monthlyRepay[i], text: arrayOfStatuses[5].status, description: arrayOfStatuses[5].description });
    }

    textString = monthsArray[passedMonth - 1]?.description;
    repay = monthsArray[passedMonth - 1]?.monthlyRepayment
  }

  // console.log(repay)
  return {
    monthsArray,
    data,
    monthlyRepay,
    textString,
    repay,
  };
}

const arrayOfStatuses = [
  { status: 'Great', description: 'Based on your information, You will be in excellent financial shape with this payment plan. The payback period and down payment option is perfect for you.' },
  { status: 'Good', description: 'Based on your information,this is a healthy payment plan for You. The payback period and down payment option is just about right.' },
  { status: 'Fair', description: 'Based on your information,You will still have enough income left over after paying off this purchase. The payback period and down payment option seems ok.' },
  { status: 'Stretching', description: 'Based on your information,You will be using much of your income to pay off this purchase.Try to increase your payback period or increase your down payment' },
  { status: 'Aggressive', description: 'Based on your information,your monthly payment with this plan is excessive and your application may be declined. Adjust your payback period or down payment to increase your odds of getting approved.' },
  { status: 'High', description: 'We consider the monthly payment under this plan extremely high and your chances of getting this plan approved is slim. We strongly advise that you increase your down payment or payback period.' }
];
