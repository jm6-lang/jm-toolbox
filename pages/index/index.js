// pages/index/index.js
const app = getApp();

Page({
  data: {
    tools: [
      {
        id: 'countdown',
        name: '倒计时日历',
        desc: '纪念日考试生日天数倒计时提醒',
        icon: '📅',
        iconBg: '#E17055',
        tag: '热搜',
        tagClass: 'tag-red',
        hot: true,
        category: 'life'
      },
      {
        id: 'qrcode',
        name: '二维码生成器',
        desc: '文字/网址/WiFi一键生成二维码',
        icon: '📱',
        iconBg: '#E84393',
        tag: '实用',
        tagClass: 'tag-pink',
        hot: true,
        category: 'image'
      },
      {
        id: 'compress',
        name: '图片压缩',
        desc: '批量压缩照片，缩小体积不失真',
        icon: '📦',
        iconBg: '#00B894',
        tag: '热门',
        tagClass: 'tag-green',
        hot: true,
        category: 'image'
      },
      {
        id: 'calculator',
        name: '房贷计算器',
        desc: '商贷/公积金/组合贷月供计算',
        icon: '🏠',
        iconBg: '#0984E3',
        tag: '热门',
        tagClass: 'tag-blue',
        hot: true,
        category: 'life'
      },
      {
        id: 'relative',
        name: '亲戚称谓计算器',
        desc: '过年走亲戚不再叫错人',
        icon: '👨‍👩‍👧‍👦',
        iconBg: '#FDCB6E',
        tag: '趣味',
        tagClass: 'tag-yellow',
        hot: true,
        category: 'life'
      },
      {
        id: 'colorpicker',
        name: '颜色识别器',
        desc: '图片取色器，识别颜色值HEX/RGB',
        icon: '🎨',
        iconBg: '#6C5CE7',
        tag: '设计',
        tagClass: 'tag-purple',
        hot: false,
        category: 'image'
      },
      {
        id: 'beadart',
        name: '拼豆图纸生成器',
        desc: '上传图片生成拼豆图纸和色板',
        icon: '🧩',
        iconBg: '#A29BFE',
        tag: '手工',
        tagClass: 'tag-purple',
        hot: false,
        category: 'image'
      },
      {
        id: 'watermark',
        name: '图片去水印',
        desc: '智能去除图片水印和Logo',
        icon: '🧹',
        iconBg: '#3498DB',
        tag: '',
        tagClass: '',
        hot: false,
        category: 'image'
      },
      {
        id: 'ruler',
        name: '手机尺子',
        desc: '手机秒变尺子，随时测量长度',
        icon: '📏',
        iconBg: '#FDCB6E',
        tag: '',
        tagClass: '',
        hot: false,
        category: 'life'
      },
      {
        id: 'sensitive',
        name: '敏感词检测',
        desc: '检测文本中的敏感词和违规词',
        icon: '🔍',
        iconBg: '#E74C3C',
        tag: '运营',
        tagClass: 'tag-red',
        hot: false,
        category: 'text'
      },
      {
        id: 'meme',
        name: '随机表情包',
        desc: '海量表情包随机获取，斗图必备',
        icon: '😄',
        iconBg: '#F39C12',
        tag: '',
        tagClass: '',
        hot: false,
        category: 'fun'
      },
      {
        id: 'translate',
        name: '兽语翻译器',
        desc: '喵星人汪星人语言互译',
        icon: '🐱',
        iconBg: '#27AE60',
        tag: '',
        tagClass: '',
        hot: false,
        category: 'fun'
      }
    ],
    categories: [
      { id: 'all', name: '全部' },
      { id: 'life', name: '生活' },
      { id: 'image', name: '图片' },
      { id: 'text', name: '文字' },
      { id: 'fun', name: '趣味' }
    ],
    activeCategory: 'all',
    filteredTools: [],
    sectionTitle: '全部工具',
    stats: {
      toolsUsed: 0,
      totalUsers: '10万+'
    },
    banner: {
      title: 'JM工具箱',
      subtitle: '永久免费 · 无限使用 · 12款实用工具'
    }
  },

  onLoad() {
    this.filterTools();
    this.updateStats();
  },

  onShow() {
    this.updateStats();
  },

  filterTools() {
    const { tools, activeCategory, categories } = this.data;
    const filtered = activeCategory === 'all' ? tools : tools.filter(function(t) { return t.category === activeCategory; });
    const cat = categories.find(function(c) { return c.id === activeCategory; });
    this.setData({ filteredTools: filtered, sectionTitle: cat ? cat.name : '全部工具' });
  },

  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeCategory: id });
    this.filterTools();
  },

  updateStats() {
    const usage = wx.getStorageSync('toolUsage') || {};
    this.setData({
      'stats.toolsUsed': usage.count || 0
    });
  },

  goTool(e) {
    const id = e.currentTarget.dataset.id;
    this.recordUsage(id);
    
    const routes = {
      beadart: '/pages/beadart/beadart',
      watermark: '/pages/watermark/watermark',
      sensitive: '/pages/sensitive/sensitive',
      meme: '/pages/meme/meme',
      translate: '/pages/translate/translate',
      qrcode: '/pages/qrcode/qrcode',
      compress: '/pages/compress/compress',
      ruler: '/pages/ruler/ruler',
      calculator: '/pages/calculator/calculator',
      countdown: '/pages/countdown/countdown',
      relative: '/pages/relative/relative',
      colorpicker: '/pages/colorpicker/colorpicker'
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
      title: 'JM工具箱 - 免费倒计时/二维码/图片压缩/房贷计算/亲戚称谓',
      path: '/pages/index/index'
    };
  },

  onAddToFavorites() {
    return {
      title: 'JM工具箱 - 永久免费12款实用工具合集'
    };
  }
});
