// pages/calculator/calculator.js - 房贷计算器
Page({
  data: {
    tabs: ['房贷计算', '商业贷款', '公积金'],
    activeTab: 0,
    loanType: 'combo', // combo, commercial, fund
    totalPrice: 200,
    downPayment: 30,
    loanYears: 30,
    commercialRate: 3.95,
    fundRate: 2.85,
    commercialLoan: 0,
    fundLoan: 0,
    // 计算结果
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    calculated: false,
    // 选项
    yearOptions: [5, 10, 15, 20, 25, 30],
    yearIndex: 5
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

    // 等额本息公式: M = P * r * (1+r)^n / ((1+r)^n - 1)
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
      commercialLoan,
      fundLoan,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
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
