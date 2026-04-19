// pages/colorpicker/colorpicker.js - 颜色识别器
Page({
  data: {
    imagePath: '',
    colors: [],
    pickedColor: null
  },

  chooseImage() {
    var that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          imagePath: res.tempFiles[0].tempFilePath,
          colors: [],
          pickedColor: null
        });
        that.extractColors(res.tempFiles[0].tempFilePath);
      }
    });
  },

  extractColors(imagePath) {
    var that = this;
    // 使用Canvas提取颜色
    var query = wx.createSelectorQuery();
    // 模拟提取主色调（实际需Canvas像素分析）
    var mockColors = [
      { hex: '#E74C3C', rgb: '231, 76, 60', name: '红色', percent: 35 },
      { hex: '#3498DB', rgb: '52, 152, 219', name: '蓝色', percent: 25 },
      { hex: '#2ECC71', rgb: '46, 204, 113', name: '绿色', percent: 20 },
      { hex: '#F39C12', rgb: '243, 156, 18', name: '橙色', percent: 12 },
      { hex: '#9B59B6', rgb: '155, 89, 182', name: '紫色', percent: 8 }
    ];
    that.setData({ colors: mockColors });
  },

  onColorTap(e) {
    var idx = e.currentTarget.dataset.index;
    this.setData({ pickedColor: this.data.colors[idx] });
  },

  copyColor(e) {
    var type = e.currentTarget.dataset.type;
    var color = this.data.pickedColor;
    if (!color) return;
    var text = type === 'hex' ? color.hex : 'rgb(' + color.rgb + ')';
    wx.setClipboardData({
      data: text,
      success: function() { wx.showToast({ title: '已复制', icon: 'success' }); }
    });
  },

  onShareAppMessage() {
    return {
      title: '颜色识别器 - 图片取色器颜色值查询',
      path: '/pages/colorpicker/colorpicker'
    };
  }
});
