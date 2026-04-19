// pages/meme/meme.js
Page({
  data: {
    memes: [
      { id: 1, emoji: '😂', label: '笑死' },
      { id: 2, emoji: '😭', label: '大哭' },
      { id: 3, emoji: '👍', label: '点赞' },
      { id: 4, emoji: '❤️', label: '爱你' },
      { id: 5, emoji: '🔥', label: '热门' },
      { id: 6, emoji: '🤣', label: '笑抽' },
      { id: 7, emoji: '🙄', label: '无语' },
      { id: 8, emoji: '🤔', label: '思考' },
      { id: 9, emoji: '😎', label: '装酷' },
      { id: 10, emoji: '🤷', label: '随便' },
      { id: 11, emoji: '💪', label: '加油' },
      { id: 12, emoji: '🎉', label: '庆祝' },
      { id: 13, emoji: '💔', label: '心碎' },
      { id: 14, emoji: '😱', label: '惊恐' },
      { id: 15, emoji: '🤡', label: '小丑' },
      { id: 16, emoji: '👀', label: '围观' },
      { id: 17, emoji: '🙈', label: '害羞' },
      { id: 18, emoji: '😈', label: '邪恶' },
      { id: 19, emoji: '💀', label: '死了' },
      { id: 20, emoji: '☠️', label: '吓人' }
    ],
    current: null,
    history: [],
    showResult: false
  },

  onLoad() {
    const history = wx.getStorageSync('memeHistory') || [];
    this.setData({ history });
  },

  // 随机抽取
  randomPick() {
    const memes = this.data.memes;
    const index = Math.floor(Math.random() * memes.length);
    const picked = memes[index];
    
    // 记录历史
    const history = this.data.history;
    history.unshift({ ...picked, time: new Date().toLocaleTimeString('zh-CN') });
    wx.setStorageSync('memeHistory', history.slice(0, 50));
    
    this.setData({
      current: picked,
      showResult: true,
      history: history.slice(0, 10)
    });

    // 震动反馈
    wx.vibrateShort({ type: 'medium' });
  },

  // 一键复制
  copyEmoji() {
    if (!this.data.current) return;
    wx.setClipboardData({
      data: this.data.current.emoji,
      success: () => {
        wx.showToast({ title: '已复制表情！', icon: 'success' });
      }
    });
  },

  // 分享
  onShareAppMessage() {
    const current = this.data.current;
    return {
      title: current ? `随机表情包：${current.emoji} ${current.label}` : '随机表情包生成器',
      path: '/pages/meme/meme'
    };
  }
});
