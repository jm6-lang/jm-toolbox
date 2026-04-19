// pages/index/index.js
const app = getApp();

Page({
  data: {
    tools: [
      {
        id: 'beadart',
        name: '拼豆图片生成器',
        desc: '上传图片，生成拼豆图纸',
        icon: '🎨',
        iconBg: '#6C5CE7',
        tag: '手工必备',
        tagClass: 'tag-purple',
        hot: true
      },
      {
        id: 'watermark',
        name: '图片去水印',
        desc: '智能去除图片水印和Logo',
        icon: '🧹',
        iconBg: '#3498DB',
        tag: '热门',
        tagClass: 'tag-blue',
        hot: true
      },
      {
        id: 'sensitive',
        name: '敏感词检测',
        desc: '检测文本中的敏感词和违规词',
        icon: '🔍',
        iconBg: '#E74C3C',
        tag: '运营必备',
        tagClass: 'tag-red',
        hot: false
      },
      {
        id: 'meme',
        name: '随机表情包',
        desc: '海量表情包随机获取，斗图必备',
        icon: '😄',
        iconBg: '#F39C12',
        tag: '娱乐',
        tagClass: 'tag-orange',
        hot: true
      },
      {
        id: 'translate',
        name: '兽语翻译器',
        desc: '喵星人汪星人语言互译',
        icon: '🐱',
        iconBg: '#27AE60',
        tag: '趣味',
        tagClass: 'tag-green',
        hot: false
      }
    ],
    stats: {
      toolsUsed: 0,
      totalUsers: '10万+'
    },
    banner: {
      title: 'JM的工具箱',
      subtitle: '永久免费 · 无限使用'
    }
  },

  onLoad() {
    this.updateStats();
  },

  onShow() {
    this.updateStats();
  },

  updateStats() {
    const usage = wx.getStorageSync('toolUsage') || {};
    this.setData({
      'stats.toolsUsed': usage.count || 0
    });
  },

  goTool(e) {
    const id = e.currentTarget.dataset.id;
    const tool = this.data.tools.find(t => t.id === id);
    
    // 记录使用
    this.recordUsage(id);
    
    // 跳转
    const routes = {
      beadart: '/pages/beadart/beadart',
      watermark: '/pages/watermark/watermark',
      sensitive: '/pages/sensitive/sensitive',
      meme: '/pages/meme/meme',
      translate: '/pages/translate/translate'
    };
    
    if (routes[id]) {
      wx.navigateTo({ url: routes[id] });
    }
  },

  recordUsage(toolId) {
    const usage = wx.getStorageSync('toolUsage') || { count: 0, tools: {} };
    usage.count = (usage.count || 0) + 1;
    usage.tools[toolId] = (usage.tools[toolId] || 0) + 1;
    wx.setStorageSync('toolUsage', usage);
  },

  onShareAppMessage() {
    return {
      title: 'JM的工具箱 - 永久免费的工具合集',
      path: '/pages/index/index',
      imageUrl: '/assets/icons/share.png'
    };
  },

  onAddToFavorites() {
    return {
      title: 'JM的工具箱'
    };
  }
});
