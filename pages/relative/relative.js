// pages/relative/relative.js - 亲戚称谓计算器
// 亲戚关系数据
var RELATIONS = {
  'f': '爸爸', 'm': '妈妈', 'h': '老公', 'w': '老婆',
  'fb': '爷爷', 'mb': '外公', 'hb': '公公', 'wb': '岳父',
  'fm': '奶奶', 'mm': '外婆', 'hm': '婆婆', 'wm': '岳母',
  'ob': '哥哥', 'lb': '弟弟', 'os': '姐姐', 'ls': '妹妹',
  'fob': '伯父', 'flb': '叔叔', 'fos': '姑妈', 'mob': '大舅', 'mlb': '小舅', 'mos': '姨妈',
  's': '儿子', 'd': '女儿', 'ss': '孙子', 'sd': '孙女', 'ds': '外孙', 'dd': '外孙女',
  'obs': '侄子', 'obd': '侄女', 'oss': '外甥', 'osd': '外甥女',
  'fobs': '堂兄', 'flbs': '堂弟', 'foss': '表姐', 'mobs': '表哥', 'moss': '表妹'
};

Page({
  data: {
    chain: [],
    chainDisplay: [],
    result: '',
    resultDesc: '',
    buttons: [
      { id: 'f', label: '父', desc: '爸爸' },
      { id: 'm', label: '母', desc: '妈妈' },
      { id: 'ob', label: '兄', desc: '哥哥' },
      { id: 'lb', label: '弟', desc: '弟弟' },
      { id: 'os', label: '姐', desc: '姐姐' },
      { id: 'ls', label: '妹', desc: '妹妹' },
      { id: 'h', label: '夫', desc: '老公' },
      { id: 'w', label: '妻', desc: '老婆' },
      { id: 's', label: '子', desc: '儿子' },
      { id: 'd', label: '女', desc: '女儿' }
    ]
  },

  onButtonTap(e) {
    var id = e.currentTarget.dataset.id;
    var chain = this.data.chain.slice();
    chain.push(id);
    this.calcResult(chain);
  },

  calcResult(chain) {
    var key = chain.join('');
    var result = RELATIONS[key];
    var chainDisplay = chain.map(function(c) {
      for (var i = 0; i < this.data.buttons.length; i++) {
        if (this.data.buttons[i].id === c) return this.data.buttons[i].desc;
      }
      return c;
    }.bind(this));

    var resultDesc = chainDisplay.join('的');
    if (result) {
      resultDesc += ' = ' + result;
    } else {
      result = '未知关系';
      resultDesc += ' = 暂未收录该关系';
    }

    this.setData({
      chain: chain,
      chainDisplay: chainDisplay,
      result: result,
      resultDesc: resultDesc
    });
  },

  undo() {
    var chain = this.data.chain.slice(0, -1);
    if (chain.length === 0) {
      this.setData({ chain: [], chainDisplay: [], result: '', resultDesc: '' });
    } else {
      this.calcResult(chain);
    }
  },

  reset() {
    this.setData({ chain: [], chainDisplay: [], result: '', resultDesc: '' });
  },

  onShareAppMessage() {
    return {
      title: '亲戚称谓计算器 - 过年不再叫错人',
      path: '/pages/relative/relative'
    };
  }
});
