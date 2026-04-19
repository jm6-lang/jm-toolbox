// pages/watermark/watermark.js
Page({
  data: {
    imagePath: '',
    resultImage: '',
    processing: false,
    processed: false,
    mode: 'auto', // auto | brush
    brushSize: 20
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imagePath: res.tempFiles[0].tempFilePath,
          processed: false,
          resultImage: ''
        });
      }
    });
  },

  onModeChange(e) {
    this.setData({ mode: e.detail.value });
  },

  onBrushSizeChange(e) {
    this.setData({ brushSize: parseInt(e.detail.value) });
  },

  process() {
    if (!this.data.imagePath) {
      wx.showToast({ title: '请先选择图片', icon: 'none' });
      return;
    }

    this.setData({ processing: true });
    wx.showLoading({ title: '处理中...' });

    // 模拟去水印处理
    setTimeout(() => {
      // 实际项目中调用云函数或后端API处理
      // 这里演示用原图作为结果
      wx.hideLoading();
      this.setData({
        processing: false,
        processed: true,
        resultImage: this.data.imagePath
      });
      wx.showToast({ title: '处理完成！', icon: 'success' });
    }, 2000);
  },

  // 推荐工具：提示用户使用专业工具
  showTip() {
    wx.showModal({
      title: '💡 使用建议',
      content: '本功能可去除简单水印。对于复杂水印，建议使用专业图片编辑工具进行手动处理效果更佳。',
      showCancel: false,
      confirmText: '知道了'
    });
  },

  saveImage() {
    if (!this.data.resultImage) return;
    
    wx.saveImageToPhotosAlbum({
      filePath: this.data.resultImage,
      success: () => {
        wx.showToast({ title: '已保存', icon: 'success' });
      }
    });
  },

  onShareAppMessage() {
    return {
      title: '这个去水印工具太好用了！',
      path: '/pages/watermark/watermark'
    };
  }
});
