// pages/translate/translate.js
Page({
  data: {
    mode: 'cat2dog', // cat2dog | dog2cat | cat2human | dog2human | human2animal
    inputText: '',
    result: '',
    history: []
  },

  onLoad() {
    const history = wx.getStorageSync('translateHistory') || [];
    this.setData({ history });
  },

  onModeChange(e) {
    const modes = ['cat2dog', 'dog2cat', 'cat2human', 'dog2human', 'human2animal'];
    this.setData({ mode: modes[e.detail.value] });
  },

  onInput(e) {
    this.setData({ inputText: e.detail.value });
  },

  translate() {
    const text = this.data.inputText.trim();
    if (!text) {
      wx.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }

    const result = this.animalTranslate(text);
    const history = this.data.history;
    history.unshift({
      input: text,
      output: result,
      mode: this.data.mode,
      time: new Date().toLocaleTimeString('zh-CN')
    });
    wx.setStorageSync('translateHistory', history.slice(0, 30));

    this.setData({
      result,
      history: history.slice(0, 10)
    });

    wx.vibrateShort({ type: 'light' });
  },

  animalTranslate(text) {
    // 模拟兽语翻译逻辑
    const catSounds = ['喵', '喵呜', '喵~', '喵喵', '嗷呜', '嗯~'];
    const dogSounds = ['汪', '汪汪', '汪~', '嗷', '嗷嗷', '呜~'];

    const translateWord = (word, isCat) => {
      const sounds = isCat ? catSounds : dogSounds;
      let translated = '';
      for (let i = 0; i < word.length; i++) {
        const charCode = word.charCodeAt(i);
        const soundIndex = (charCode % sounds.length + sounds.length) % sounds.length;
        translated += sounds[soundIndex];
      }
      return translated;
    };

    const isCatMode = this.data.mode === 'cat2dog' || this.data.mode === 'cat2human';
    const isHumanMode = this.data.mode.includes('human') && this.data.mode !== 'human2animal';

    if (this.data.mode === 'human2animal') {
      // 人类语言转动物语言
      const isDog = Math.random() > 0.5;
      const sounds = isDog ? dogSounds : catSounds;
      const animalName = isDog ? '🐶汪星语' : '🐱喵星语';
      let translated = '';
      text.split('').forEach(char => {
        const idx = Math.floor(Math.random() * sounds.length);
        translated += sounds[idx];
      });
      return `【${animalName}】\n${translated}`;
    }

    // 动物语言互译或动物转人类
    let result = '';
    text.split(/([\u4e00-\u9fa5]+)/g).forEach(part => {
      if (/[\u4e00-\u9fa5]/.test(part)) {
        result += translateWord(part, isCatMode);
      } else {
        result += part;
      }
    });

    if (this.data.mode === 'cat2human') {
      return `🐱喵星语翻译：${result}`;
    } else if (this.data.mode === 'dog2human') {
      return `🐶汪星语翻译：${result}`;
    }

    return result;
  },

  copyResult() {
    if (!this.data.result) return;
    wx.setClipboardData({
      data: this.data.result,
      success: () => wx.showToast({ title: '已复制', icon: 'success' })
    });
  },

  clearInput() {
    this.setData({ inputText: '', result: '' });
  },

  onShareAppMessage() {
    return {
      title: '兽语翻译器 - 和猫猫狗狗对话！',
      path: '/pages/translate/translate'
    };
  }
});
