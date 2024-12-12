const template = {
  // 基础信息
  name: '', // 商品名称
  code: '', // 商品代码
  exchange: '', // 交易所
  unit: '', // 计量单位

  // 市场数据
  data: [
    {
      date: '', // 日期
      price: {
        open: 0, // 开盘价
        high: 0, // 最高价
        low: 0, // 最低价
        close: 0, // 收盘价
        settlement: 0, // 结算价
      },
      volume: 0, // 成交量
      openInterest: 0, // 持仓量
      turnover: 0, // 成交额(万元)

      // 期货公司分析建议
      recommendations: [
        {
          company: '',
          direction: '', // 看多/看空/中性
          analysis: '',
        },
      ],

      // 个人分析建议
      myAnalysis: {
        direction: '',
        analysis: '',
      },

      // 每日消息面
      news: [
        {
          title: '',
          impact: '', // POSITIVE, NEGATIVE, NEUTRAL
          importance: '', // HIGH, MEDIUM, LOW
          source: '',
          url: '',
        },
      ],

      // 基本面数据
      fundamentals: {
        supply: {
          globalProduction: 0,
          chinaProduction: 0,
          maintenanceImpact: 0,
        },
        demand: {
          globalConsumption: 0,
          chinaConsumption: 0,
          industryDemand: 0,
        },
        inventory: {
          exchange: 0,
          social: 0,
          changeWeekly: 0,
        },
        priceDrivers: [
          {
            factor: '',
            impact: '', // POSITIVE, NEGATIVE, NEUTRAL
            description: '',
          },
        ],
      },
    },
  ],
};

export default template;
