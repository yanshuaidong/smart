// 期货涨幅和主力分析
var data = {
  title: '商品期货多数上涨，贵金属涨幅居前',
  content: [
    {
      name: '涨幅榜',
      list: [
        {
          name: '欧线',
          increase: '2.76%',
        },
        {
          name: '沪银',
          increase: '2.24%',
        },
        {
          name: '沪镍',
          increase: '2.11%',
          reason: '【消息】印尼镍出口政策调整，供应减少',
        },
        {
          name: '红枣',
          increase: '2.05%',
          reason: '原因未知',
        },
        {
          name: '甲醇',
          increase: '1.89%',
          reason: '原因未知',
        },
      ],
    },
    {
      name: '跌幅榜',
      list: [],
    },
    {
      name: '流入榜',
      list: [],
    },
    {
      name: '流出榜',
      list: [],
    },
  ],
};

module.exports = data;
