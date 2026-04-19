// pages/ruler/ruler.js - 手机尺子
Page({
  data: {
    mode: 'cm',
    ticks: [],
    screenDiagonal: 0
  },

  onLoad() {
    const sysInfo = wx.getSystemInfoSync();
    const screenDiagonal = sysInfo.screenDiagonal || 6.1;
    const screenWidth = sysInfo.screenWidth;
    const pixelRatio = sysInfo.pixelRatio;
    const aspectRatio = screenWidth / sysInfo.screenHeight;
    const widthRatio = aspectRatio / Math.sqrt(aspectRatio * aspectRatio + 1);
    const physicalWidthCm = screenDiagonal * 2.54 * widthRatio;
    
    // 1cm = 750 / physicalWidthCm rpx
    const rpxPerCm = Math.round(750 / physicalWidthCm);
    
    const ticks = [];
    for (let i = 1; i <= 15; i++) {
      ticks.push({
        value: i,
        left: i * rpxPerCm,
        isMajor: true
      });
      // 半厘米刻度
      ticks.push({
        value: '',
        left: (i - 0.5) * rpxPerCm,
        isMajor: false
      });
    }

    this.setData({
      ticks: ticks,
      screenDiagonal: screenDiagonal,
      rpxPerCm: rpxPerCm
    });
  },

  switchMode() {
    this.setData({ mode: this.data.mode === 'cm' ? 'inch' : 'cm' });
  },

  onShareAppMessage() {
    return {
      title: '手机尺子 - 随时随地测量长度',
      path: '/pages/ruler/ruler'
    };
  }
});
