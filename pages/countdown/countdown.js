// pages/countdown/countdown.js - 倒计时日历
Page({
  data: {
    events: [],
    showAdd: false,
    newTitle: '',
    newDate: '',
    today: ''
  },

  onLoad() {
    const now = new Date();
    const today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    this.setData({ today });

    // 加载保存的事件
    const events = wx.getStorageSync('countdown_events') || [];
    // 如果没有事件，添加默认示例
    if (events.length === 0) {
      const nextNewYear = new Date(now.getFullYear() + 1, 0, 1);
      events.push({
        id: Date.now(),
        title: '新年快乐',
        date: nextNewYear.getFullYear() + '-01-01',
        days: this.calcDays(nextNewYear),
        isPast: false
      });
    }
    this.refreshEvents(events);
  },

  calcDays(targetDate) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff;
  },

  refreshEvents(events) {
    const refreshed = events.map(e => {
      const days = this.calcDays(e.date);
      return Object.assign({}, e, { days: days, isPast: days < 0 });
    });
    // 按天数排序，未来的排前面
    refreshed.sort(function(a, b) { return a.days - b.days; });
    this.setData({ events: refreshed });
    wx.setStorageSync('countdown_events', refreshed);
  },

  showAddForm() {
    this.setData({ showAdd: true, newTitle: '', newDate: '' });
  },

  hideAddForm() {
    this.setData({ showAdd: false });
  },

  onTitleInput(e) {
    this.setData({ newTitle: e.detail.value });
  },

  onDateChange(e) {
    this.setData({ newDate: e.detail.value });
  },

  addEvent() {
    const title = this.data.newTitle.trim();
    const date = this.data.newDate;
    if (!title) { wx.showToast({ title: '请输入事件名称', icon: 'none' }); return; }
    if (!date) { wx.showToast({ title: '请选择日期', icon: 'none' }); return; }

    const events = this.data.events.slice();
    events.push({
      id: Date.now(),
      title: title,
      date: date,
      days: this.calcDays(date),
      isPast: false
    });
    this.refreshEvents(events);
    this.setData({ showAdd: false });
    wx.showToast({ title: '添加成功', icon: 'success' });
  },

  deleteEvent(e) {
    const id = e.currentTarget.dataset.id;
    const events = this.data.events.filter(function(ev) { return ev.id !== id; });
    this.refreshEvents(events);
  },

  onShareAppMessage() {
    return {
      title: '倒计时日历 - 纪念日考试倒计时提醒工具',
      path: '/pages/countdown/countdown'
    };
  }
});
