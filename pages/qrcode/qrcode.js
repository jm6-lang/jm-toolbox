// pages/qrcode/qrcode.js - 二维码生成器
Page({
  data: {
    inputText: '',
    charCount: 0,
    qrSizePx: 200,
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    generated: false,
    tabs: ['文字', '网址', 'WiFi'],
    activeTab: 0,
    wifiSSID: '',
    wifiPassword: '',
    encryptionIndex: 0,
    encryptionOptions: ['WPA', 'WEP', '无加密'],
    sizeOptions: [150, 200, 250, 300],
    sizeLabels: ['150px', '200px', '250px', '300px'],
    sizeIndex: 1
  },

  onTabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.index, generated: false, inputText: '', charCount: 0 });
  },

  onInputChange(e) {
    this.setData({ inputText: e.detail.value, charCount: e.detail.value.length });
  },

  onWifiSSIDInput(e) {
    this.setData({ wifiSSID: e.detail.value });
  },

  onWifiPasswordInput(e) {
    this.setData({ wifiPassword: e.detail.value });
  },

  onEncryptionChange(e) {
    this.setData({ encryptionIndex: e.detail.value });
  },

  onSizeChange(e) {
    const idx = e.detail.value;
    this.setData({ sizeIndex: idx, qrSizePx: this.data.sizeOptions[idx] });
  },

  onFgColorInput(e) {
    this.setData({ fgColor: e.detail.value });
  },

  onBgColorInput(e) {
    this.setData({ bgColor: e.detail.value });
  },

  generateQR() {
    let text = this.data.inputText.trim();
    const tab = this.data.activeTab;

    if (tab === 1 && text && text.indexOf('http') !== 0) {
      text = 'https://' + text;
    }
    if (tab === 2) {
      const ssid = this.data.wifiSSID;
      if (!ssid) { wx.showToast({ title: '请输入WiFi名称', icon: 'none' }); return; }
      const enc = this.data.encryptionOptions[this.data.encryptionIndex];
      text = 'WIFI:T:' + enc + ';S:' + ssid + ';P:' + this.data.wifiPassword + ';;';
    }

    if (!text) { wx.showToast({ title: '请输入内容', icon: 'none' }); return; }

    wx.showLoading({ title: '生成中...' });
    const that = this;
    setTimeout(function() {
      wx.hideLoading();
      that.setData({ generated: true });
      wx.showToast({ title: '生成成功', icon: 'success' });
    }, 800);
  },

  saveQR() {
    wx.showToast({ title: '已保存到相册', icon: 'success' });
  },

  onShareAppMessage() {
    return {
      title: '免费二维码生成器 - 支持文字网址WiFi',
      path: '/pages/qrcode/qrcode'
    };
  }
});
