// pages/about/about.js
const app = getApp();

Page({
  data: {
    version: '1.0.0',
    updateTime: '2026-04-19',
    features: [
      { icon: '🎨', text: '拼豆图片生成器 - 多种色卡支持' },
      { icon: '🧹', text: '图片去水印 - 智能处理' },
      { icon: '🔍', text: '敏感词检测 - 自媒体必备' },
      { icon: '😄', text: '随机表情包 - 斗图神器' },
      { icon: '🐱', text: '兽语翻译 - 趣味翻译' }
    ]
  },

  onShareAppMessage() {
    return {
      title: 'JM的工具箱 - 永久免费的工具合集',
      path: '/pages/index/index'
    };
  }
});
