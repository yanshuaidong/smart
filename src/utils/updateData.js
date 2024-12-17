// 更新每日数据js
// 需要一个模板json，我们吧数据填进去，经过js运行，将数据填到个个js文件里面。

// 映射
var map = {
  名称: 'name',
  代码: 'code',
  日期: 'date',
  开盘价: 'price.open',
  最高价: 'price.high',
  最低价: 'price.low',
  收盘价: 'price.close',
  结算价: 'price.settlement',
  成交量: 'volume',
  持仓量: 'openInterest',
  成交额: 'turnover',
  日增仓: 'dailyIncrease',
  资金流向: 'capitalFlow',
  上轨: 'bollinger.upper',
  中轨: 'bollinger.middle',
  下轨: 'bollinger.lower',
};

// 路径映射
var pathMap = {
  铜: 'src/data/有色金属/铜.js',
  铝: 'src/data/有色金属/铝.js',
  锌: 'src/data/有色金属/锌.js',
  铅: 'src/data/有色金属/铅.js',
  镍: 'src/data/有色金属/镍.js',
};

var template = [
  {
    filePath: 'src/data/有色金属/铜.js', // 文件地址
    name: '铜', // 名称
    code: 'cu', // 代码
    date: '2024-12-17', // 日期
    price: {
      open: 69420, // 开盘价
      high: 69850, // 最高价
      low: 69100, // 最低价
      close: 69580, // 收盘价
      settlement: 69600, // 结算价
    },
    volume: 125680, // 成交量
    openInterest: 89750, // 持仓量
    turnover: 438620000, // 成交额(万元)
    dailyIncrease: 125680, // 日增仓
    capitalFlow: 125680, // 资金流向
    // 布林线
    bollinger: {
      upper: 70000, // 上轨
      middle: 69600, // 中轨
      lower: 69200, // 下轨
    },
  },
];
console.log(template);
