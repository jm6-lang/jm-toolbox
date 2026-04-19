// pages/ruler/ruler.js - 手机尺子
Page({
  data: {
    cmPerPixel: 0,
    inchPerPixel: 0,
    rulerWidth: 0,
    mode: 'cm', // cm or inch
    screenDiagonal: 0,
    showCalibrate: false,
    calibrateSize: 8.56 // 信用卡标准宽度8.56cm
  },

  onLoad() {
    this.calibrate();
  },

  calibrate() {
    const sysInfo = wx.getSystemInfoSync();
    const screenDiagonal = sysInfo.screenDiagonal || 6.1;
    const screenWidth = sysInfo.screenWidth;
    const pixelRatio = sysInfo.pixelRatio;

    // 估算每cm对应的rpx
    // 1rpx = screenWidth/750 物理像素
    // 屏幕物理宽度 = screenWidth * pixelRatio
    // 估算屏幕物理宽度(cm) = 屏幕对角线 * (屏幕宽高比中宽度比例)
    const aspectRatio = screenWidth / sysInfo.screenHeight;
    const widthRatio = aspectRatio / Math.sqrt(aspectRatio * aspectRatio + 1);
    const physicalWidthCm = screenDiagonal * 2.54 * widthRatio;
    
    // 750rpx 对应 physicalWidthCm
    // 1cm = 750 / physicalWidthCm rpx
    const cmPerRpx = physicalWidthCm / 750;
    const cmPerPixel = physicalWidthCm / (screenWidth * pixelRatio);

    this.setData({
      cmPerPixel,
      cmPerRpx,
      screenDiagonal,
      rulerWidth: screenWidth
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
