// pages/compress/compress.js - 图片压缩
Page({
  data: {
    images: [],
    quality: 80,
    totalOriginal: 0,
    totalCompressed: 0,
    totalOriginalStr: '0KB',
    totalCompressedStr: '0KB',
    processing: false
  },

  formatSize(bytes) {
    if (bytes < 1024) return bytes + 'B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + 'KB';
    return (bytes / 1048576).toFixed(2) + 'MB';
  },

  chooseImages() {
    const that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(f => ({
          path: f.tempFilePath,
          size: f.size,
          sizeStr: that.formatSize(f.size),
          compressed: false,
          compressedPath: '',
          compressedSize: 0,
          compressedSizeStr: '',
          ratio: '',
          ratioGood: false
        }));
        const images = that.data.images.concat(newImages);
        const totalOriginal = images.reduce((s, i) => s + i.size, 0);
        that.setData({
          images: images,
          totalOriginal: totalOriginal,
          totalOriginalStr: that.formatSize(totalOriginal)
        });
      }
    });
  },

  onQualityChange(e) {
    this.setData({ quality: parseInt(e.detail.value) });
  },

  async compressAll() {
    if (this.data.images.length === 0) {
      wx.showToast({ title: '请先选择图片', icon: 'none' });
      return;
    }
    this.setData({ processing: true });
    wx.showLoading({ title: '压缩中...' });

    const that = this;
    const images = this.data.images.slice();
    let totalCompressed = 0;

    for (let i = 0; i < images.length; i++) {
      if (!images[i].compressed) {
        try {
          const res = await wx.compressImage({
            src: images[i].path,
            quality: that.data.quality
          });
          const info = await wx.getFileInfo({ filePath: res.tempFilePath });
          const ratio = ((1 - info.size / images[i].size) * 100).toFixed(1);
          const ratioGood = ratio > 0;
          images[i].compressed = true;
          images[i].compressedPath = res.tempFilePath;
          images[i].compressedSize = info.size;
          images[i].compressedSizeStr = that.formatSize(info.size);
          images[i].ratio = ratioGood ? '-' + ratio + '%' : '+0%';
          images[i].ratioGood = ratioGood;
          totalCompressed += info.size;
        } catch (e) {
          images[i].compressed = false;
          totalCompressed += images[i].size;
        }
      } else {
        totalCompressed += images[i].compressedSize || images[i].size;
      }
    }

    wx.hideLoading();
    that.setData({
      images: images,
      totalCompressed: totalCompressed,
      totalCompressedStr: that.formatSize(totalCompressed),
      processing: false
    });
    wx.showToast({ title: '压缩完成！', icon: 'success' });
  },

  saveImage(e) {
    const idx = e.currentTarget.dataset.index;
    const img = this.data.images[idx];
    if (!img.compressed || !img.compressedPath) return;
    wx.saveImageToPhotosAlbum({
      filePath: img.compressedPath,
      success: () => wx.showToast({ title: '已保存', icon: 'success' })
    });
  },

  saveAll() {
    const compressed = this.data.images.filter(i => i.compressed && i.compressedPath);
    if (!compressed.length) { wx.showToast({ title: '没有可保存的图片', icon: 'none' }); return; }
    let saved = 0;
    compressed.forEach(img => {
      wx.saveImageToPhotosAlbum({
        filePath: img.compressedPath,
        success: () => { saved++; if (saved === compressed.length) wx.showToast({ title: '已保存' + saved + '张', icon: 'success' }); }
      });
    });
  },

  onShareAppMessage() {
    return {
      title: '免费图片压缩工具 - 批量压缩缩小体积不失真',
      path: '/pages/compress/compress'
    };
  }
});
