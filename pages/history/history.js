// pages/history/history.js
Page({
  data: {
    history: [],
    empty: true
  },

  onShow() {
    const history = wx.getStorageSync('history') || [];
    const memeHistory = wx.getStorageSync('memeHistory') || [];
    const translateHistory = wx.getStorageSync('translateHistory') || [];
    
    const allHistory = [
      ...history.map(h => ({ ...h, type: 'tool' })),
      ...memeHistory.map(h => ({ ...h, type: 'meme', toolName: '随机表情包' })),
      ...translateHistory.map(h => ({ ...h, type: 'translate', toolName: '兽语翻译' }))
    ];

    // 按时间排序
    allHistory.sort((a, b) => (b.id || 0) - (a.id || 0));

    this.setData({
      history: allHistory.slice(0, 50),
      empty: allHistory.length === 0
    });
  },

  clearHistory() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有使用记录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('history');
          wx.removeStorageSync('memeHistory');
          wx.removeStorageSync('translateHistory');
          this.setData({ history: [], empty: true });
          wx.showToast({ title: '已清空', icon: 'success' });
        }
      }
    });
  }
});
