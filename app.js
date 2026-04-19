App({
  globalData: {
    userInfo: null,
    version: '1.0.0',
  },
  onLaunch() {
    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) updateManager.applyUpdate();
              }
            });
          });
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '更新失败',
              content: '新版本下载失败，请检查网络后重试。',
              showCancel: false
            });
          });
        }
      });
    }

    // 初始化本地存储
    this.initStorage();
  },

  initStorage() {
    // 初始化工具使用记录
    const usage = wx.getStorageSync('toolUsage') || {};
    if (!usage.count) {
      wx.setStorageSync('toolUsage', { count: 0, tools: {} });
    }
    // 初始化收藏
    const favorites = wx.getStorageSync('favorites') || [];
    if (!Array.isArray(favorites)) {
      wx.setStorageSync('favorites', []);
    }
  }
});
