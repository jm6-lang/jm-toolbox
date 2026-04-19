// pages/calculator/calculator.js - 房贷计算器
Page({
  data: {
    tabs: ['房贷计算', '商业贷款', '公积金'],
    activeTab: 0,
    loanType: 'combo',
    totalPrice: 200,
    downPayment: 30,
    loanYears: 30,
    commercialRate: 3.95,
    fundRate: 2.85,
    yearOptions: [5, 10, 15, 20, 25, 30],
    yearIndex: 5,
    calculated: false,
    monthlyPayment: '0.00',
    loanTotalWan: '0.00',
    totalPaymentWan: '0.00',
    totalInterestWan: '0.00',
    commercialLoanWan: '0.00',
    fundLoanWan: '0.00',
    commercialMonthly: '0.00',
    fundMonthly: '0.00'
  },

  onTabChange(e) {
    const idx = e.currentTarget.dataset.index;
    const types = ['combo', 'commercial', 'fund'];
    this.setData({ activeTab: idx, loanType: types[idx], calculated: false });
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: parseFloat(e.detail.value) || 0, calculated: false });
  },

  onYearChange(e) {
    const idx = e.detail.value;
    this.setData({ yearIndex: idx, loanYears: this.data.yearOptions[idx], calculated: false });
  },

  calculate() {
    const { totalPrice, downPayment, loanYears, commercialRate, fundRate, loanType } = this.data;
    const totalLoan = totalPrice * 10000 * (1 - downPayment / 100);

    let commercialLoan = 0, fundLoan = 0;
    if (loanType === 'combo') {
      commercialLoan = totalLoan * 0.7;
      fundLoan = totalLoan * 0.3;
    } else if (loanType === 'commercial') {
      commercialLoan = totalLoan;
    } else {
      fundLoan = totalLoan;
    }

    const months = loanYears * 12;

    function calcMonthly(principal, annualRate, n) {
      if (principal <= 0) return 0;
      const monthlyRate = annualRate / 100 / 12;
      if (monthlyRate === 0) return principal / n;
      const factor = Math.pow(1 + monthlyRate, n);
      return principal * monthlyRate * factor / (factor - 1);
    }

    const commercialMonthly = calcMonthly(commercialLoan, commercialRate, months);
    const fundMonthly = calcMonthly(fundLoan, fundRate, months);
    const monthlyPayment = commercialMonthly + fundMonthly;
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - totalLoan;

    this.setData({
      monthlyPayment: monthlyPayment.toFixed(2),
      loanTotalWan: (totalLoan / 10000).toFixed(2),
      totalPaymentWan: (totalPayment / 10000).toFixed(2),
      totalInterestWan: (totalInterest / 10000).toFixed(2),
      commercialLoanWan: (commercialLoan / 10000).toFixed(2),
      fundLoanWan: (fundLoan / 10000).toFixed(2),
      commercialMonthly: commercialMonthly.toFixed(2),
      fundMonthly: fundMonthly.toFixed(2),
      calculated: true
    });
  },

  onShareAppMessage() {
    return {
      title: '房贷计算器 - 一键计算月供利息',
      path: '/pages/calculator/calculator'
    };
  }
});
