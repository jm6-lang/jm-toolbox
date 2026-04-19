// pages/beadart/beadart.js
const app = getApp();

// 拼豆品牌色卡数据
const COLOR_CARDS = {
  perler: {
    name: 'Perler',
    colors: [
      { hex: '#FFFFFF', name: '白色' },
      { hex: '#000000', name: '黑色' },
      { hex: '#FF0000', name: '红色' },
      { hex: '#00FF00', name: '绿色' },
      { hex: '#0000FF', name: '蓝色' },
      { hex: '#FFFF00', name: '黄色' },
      { hex: '#FFA500', name: '橙色' },
      { hex: '#800080', name: '紫色' },
      { hex: '#FFC0CB', name: '粉色' },
      { hex: '#A0522D', name: '棕色' },
      { hex: '#808080', name: '灰色' },
      { hex: '#F5DEB3', name: '米色' },
      { hex: '#00CED1', name: '青色' },
      { hex: '#FF69B4', name: '热粉' },
      { hex: '#8B4513', name: '深棕' },
      { hex: '#008080', name: '深青' },
      { hex: '#FFD700', name: '金色' },
      { hex: '#C0C0C0', name: '银色' },
      { hex: '#DEB887', name: '浅棕' },
      { hex: '#40E0D0', name: '绿松石' }
    ]
  },
  hama: {
    name: 'Hama',
    colors: [
      { hex: '#FFFFFF', name: '白色' },
      { hex: '#000000', name: '黑色' },
      { hex: '#FF0000', name: '红色' },
      { hex: '#00AA00', name: '绿色' },
      { hex: '#0000CC', name: '蓝色' },
      { hex: '#FFFF00', name: '黄色' },
      { hex: '#FF6600', name: '橙色' },
      { hex: '#9900CC', name: '紫色' },
      { hex: '#FF99CC', name: '粉色' },
      { hex: '#996633', name: '棕色' },
      { hex: '#999999', name: '灰色' },
      { hex: '#FFE4C4', name: '米色' },
      { hex: '#009999', name: '青色' },
      { hex: '#FF6699', name: '热粉' },
      { hex: '#663300', name: '深棕' },
      { hex: '#006666', name: '深青' },
      { hex: '#FFCC00', name: '金色' },
      { hex: '#CCCCCC', name: '银色' },
      { hex: '#CC9966', name: '浅棕' },
      { hex: '#33CCCC', name: '绿松石' }
    ]
  }
};

Page({
  data: {
    // 色卡数据（暴露给wxml）
    COLOR_CARDS,
    // 选中的图片
    imagePath: '',
    // 生成状态
    generating: false,
    generated: false,
    // 生成结果
    resultImage: '',
    // 物料统计
    colorStats: [],
    // 设置
    gridSize: 32,      // 画布尺寸
    colorMerge: 0,     // 颜色合并程度 0-50
    brand: 'perler',  // 当前色卡
    colorCardList: Object.keys(COLOR_CARDS),
    // 已选色卡的颜色
    selectedColors: COLOR_CARDS.perler.colors,
    // 预览缩放
    scale: 1,
    // 是否保存记录
    saved: false
  },

  onLoad() {
    this.setData({
      colorCardList: Object.keys(COLOR_CARDS)
    });
  },

  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({
          imagePath: tempFilePath,
          generated: false,
          resultImage: '',
          colorStats: []
        });
      }
    });
  },

  // 预览原图
  previewOriginal() {
    if (this.data.imagePath) {
      wx.previewImage({
        urls: [this.data.imagePath]
      });
    }
  },

  // 切换色卡
  onBrandChange(e) {
    const brand = e.detail.value;
    this.setData({
      brand,
      selectedColors: COLOR_CARDS[brand].colors,
      generated: false
    });
  },

  // 调整画布尺寸
  onGridSizeChange(e) {
    this.setData({
      gridSize: parseInt(e.detail.value)
    });
  },

  // 调整颜色合并
  onColorMergeChange(e) {
    this.setData({
      colorMerge: parseInt(e.detail.value)
    });
  },

  // 生成拼豆图纸
  generate() {
    if (!this.data.imagePath) {
      wx.showToast({ title: '请先选择图片', icon: 'none' });
      return;
    }

    this.setData({ generating: true });

    wx.showLoading({ title: '生成中...' });

    // 模拟生成过程（实际项目中可调用云函数处理）
    setTimeout(() => {
      // 生成模拟结果
      this.processImage();
    }, 1500);
  },

  // 图片处理（本地Canvas模拟）
  processImage() {
    const { gridSize, colorMerge } = this.data;
    
    // 获取图片信息
    wx.getImageInfo({
      src: this.data.imagePath,
      success: (imgInfo) => {
        // 计算缩放比例
        const maxDim = 300;
        let width = imgInfo.width;
        let height = imgInfo.height;
        
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round(height * maxDim / width);
            width = maxDim;
          } else {
            width = Math.round(width * maxDim / height);
            height = maxDim;
          }
        }

        // 计算网格数量
        const cellW = Math.ceil(width / gridSize);
        const cellH = Math.ceil(height / gridSize);

        // 模拟颜色统计（实际需要Canvas像素分析）
        const colors = this.data.selectedColors;
        const stats = [];
        const usedColors = new Set();

        // 随机分配颜色用于展示
        for (let i = 0; i < Math.min(gridSize * gridSize, 100); i++) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          usedColors.add(color.hex);
        }

        // 生成颜色统计
        usedColors.forEach(hex => {
          const color = colors.find(c => c.hex === hex);
          if (color) {
            stats.push({
              ...color,
              count: Math.floor(Math.random() * 50) + 5
            });
          }
        });

        // 生成结果图片路径（复用原图作为预览）
        const resultPath = this.data.imagePath;

        wx.hideLoading();

        this.setData({
          generating: false,
          generated: true,
          resultImage: resultPath,
          colorStats: stats,
          scale: 1
        });

        wx.showToast({ title: '生成成功！', icon: 'success' });
      },
      fail: () => {
        wx.hideLoading();
        this.setData({ generating: false });
        wx.showToast({ title: '图片加载失败', icon: 'none' });
      }
    });
  },

  // 缩放
  onScaleChange(e) {
    this.setData({
      scale: parseFloat(e.detail.value)
    });
  },

  // 保存图纸
  saveImage() {
    if (!this.data.resultImage) {
      wx.showToast({ title: '请先生成图纸', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '保存中...' });

    wx.saveImageToPhotosAlbum({
      filePath: this.data.resultImage,
      success: () => {
        wx.hideLoading();
        wx.showToast({ title: '已保存到相册', icon: 'success' });
        this.saveToHistory('beadart', '拼豆图纸生成');
      },
      fail: (err) => {
        wx.hideLoading();
        if (err.errMsg.indexOf('auth deny') > -1) {
          wx.showModal({
            title: '提示',
            content: '需要您授权保存图片到相册',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        } else {
          wx.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
  },

  // 保存到历史记录
  saveToHistory(toolId, toolName) {
    const history = wx.getStorageSync('history') || [];
    history.unshift({
      id: Date.now(),
      toolId,
      toolName,
      time: new Date().toLocaleString('zh-CN'),
      imagePath: this.data.resultImage || ''
    });
    // 只保留最近50条
    wx.setStorageSync('history', history.slice(0, 50));
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '我用拼豆图片生成器做了个图纸，快来看看！',
      path: '/pages/beadart/beadart',
      imageUrl: this.data.resultImage || '/assets/icons/share.png'
    };
  }
});
