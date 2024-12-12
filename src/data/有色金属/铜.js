const cu = {
  // 基础信息
  name: '铜',
  code: 'cu',
  exchange: 'SHFE', // 上海期货交易所
  unit: '元/吨',

  // 市场数据
  data: [
    {
      date: '2024-01-01',
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

      // 新增：期货公司分析建议
      recommendations: [
        {
          company: '国泰君安期货',
          direction: '看多',
          analysis: '1. 智利铜矿罢工影响供应；2. 新能源行业需求旺盛',
        },
        {
          company: '永安期货',
          direction: '看空',
          analysis: '1. 宏观经济下行压力；2. 房地产需求疲软',
        },
      ],

      // 新增：个人分析建议
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },

      // 新增：每日消息面
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE', // POSITIVE, NEGATIVE, NEUTRAL
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
        // ... 更多消息
      ],

      // 新增：每日基本面数据
      fundamentals: {
        supply: {
          globalProduction: 2150000, // 全球产量(吨)
          chinaProduction: 850000, // 中国产量(吨)
          maintenanceImpact: 50000, // 检修影响量(吨)
        },
        demand: {
          globalConsumption: 2180000, // 全球消费量(吨)
          chinaConsumption: 1050000, // 中国消费量(吨)
          newEnergyDemand: 180000, // 新能源领域需求(吨)
        },
        inventory: {
          shfe: 35680, // 上期所库存
          lme: 125000, // LME库存
          bonded: 128900, // 保税区库存
          changeWeekly: -2500, // 周度库存变化
        },
        priceDrivers: [
          {
            factor: '供需缺口',
            impact: 'POSITIVE',
            description: '全球供需缺口约3万吨',
          },
          {
            factor: '美元指数',
            impact: 'NEGATIVE',
            description: '美元走强对铜价形成压制',
          },
        ],
      },
    },
    // ... 更多历史数据
  ],
};

export default cu;
