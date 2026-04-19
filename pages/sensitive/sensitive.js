// pages/sensitive/sensitive.js
Page({
  data: {
    inputText: '',
    result: null,
    checked: false,
    loading: false
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  // 本地敏感词库（可扩展）
  checkSensitive() {
    const text = this.data.inputText.trim();
    if (!text) {
      wx.showToast({ title: '请输入要检测的文本', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    // 模拟检测延迟
    setTimeout(() => {
      const result = this.analyzeText(text);
      this.setData({
        result,
        checked: true,
        loading: false
      });
    }, 800);
  },

  analyzeText(text) {
    // 敏感词库（简化示例，实际项目应使用更完善的词库）
    const sensitiveWords = [
      '暴力', '色情', '赌博', '毒品', '诈骗',
      '反动', '分裂', '恐怖', '谣言', '虚假',
      '敏感', '违规', '违法', '犯罪', '黑产'
    ];

    const found = [];
    let cleanText = text;

    sensitiveWords.forEach(word => {
      if (text.includes(word)) {
        // 替换敏感词为星号
        cleanText = cleanText.replace(new RegExp(word, 'g'), '★'.repeat(word.length));
        found.push(word);
      }
    });

    // 检测政治敏感词（使用正则模拟）
    const politicalPatterns = [
      /\b(某党|某政府|体制)\b/g
    ];

    politicalPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        found.push(...matches);
        cleanText = cleanText.replace(pattern, '***');
      }
    });

    // 计算安全评分
    const score = Math.max(0, 100 - found.length * 15);

    let level, levelText;
    if (score >= 90) {
      level = 'safe';
      levelText = '✅ 安全';
    } else if (score >= 70) {
      level = 'warning';
      levelText = '⚠️ 需注意';
    } else {
      level = 'danger';
      levelText = '❌ 存在风险';
    }

    return {
      score,
      level,
      levelText,
      found,
      cleanText,
      charCount: text.length
    };
  },

  // 复制结果
  copyResult() {
    if (!this.data.result) return;
    wx.setClipboardData({
      data: this.data.result.cleanText,
      success: () => {
        wx.showToast({ title: '已复制', icon: 'success' });
      }
    });
  },

  // 清空
  clear() {
    this.setData({
      inputText: '',
      result: null,
      checked: false
    });
  },

  onShareAppMessage() {
    return {
      title: '敏感词检测 - 自媒体运营必备工具',
      path: '/pages/sensitive/sensitive'
    };
  }
});
