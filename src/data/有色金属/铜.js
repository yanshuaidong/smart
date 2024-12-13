const cu = {
  // 基础信息
  name: '铜',
  code: 'cu',
  exchange: 'SHFE', // 上海期货交易所
  unit: '元/吨',

  // 市场数据
  data: [
    {
      date: '2024-01-10',
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

      // 新增布林线数据
      bollinger: {
        upper: 70250, // 上轨线
        middle: 69100, // 中轨线(20日移动平均)
        lower: 67950, // 下轨线
        bandwidth: 3.32, // 带宽
        percentB: 0.68, // %B值
      },
    },
    {
      date: '2024-01-09',
      price: {
        open: 69100,
        high: 69600,
        low: 68900,
        close: 69420,
        settlement: 69400,
      },
      volume: 118500,
      openInterest: 88900,
      turnover: 412450000,
      recommendations: [
        {
          company: '国泰君安期货',
          direction: '看多',
          analysis: '1. 库存持续下降；2. 技术面呈现上升趋势',
        },
        {
          company: '永安期货',
          direction: '中性',
          analysis: '短期震荡，建议观望',
        },
      ],
      myAnalysis: {
        direction: '看多',
        analysis: '成交量放大，价格突破压力位',
      },
      news: [
        {
          title: '中国1月份新能源汽车产销两旺',
          impact: 'POSITIVE',
          importance: 'MEDIUM',
          source: '中国汽车工业协会',
          url: 'https://example.com/news/2',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2148000,
          chinaProduction: 848000,
          maintenanceImpact: 48000,
        },
        demand: {
          globalConsumption: 2175000,
          chinaConsumption: 1048000,
          newEnergyDemand: 178000,
        },
        inventory: {
          shfe: 36000,
          lme: 126000,
          bonded: 129000,
          changeWeekly: -2000,
        },
        priceDrivers: [
          {
            factor: '库存',
            impact: 'POSITIVE',
            description: '库存继续下降',
          },
          {
            factor: '宏观面',
            impact: 'NEUTRAL',
            description: '经济数据喜忧参半',
          },
        ],
      },

      // 新增布林线数据
      bollinger: {
        upper: 70180,
        middle: 69050,
        lower: 67920,
        bandwidth: 3.28,
        percentB: 0.65,
      },
    },
    {
      date: '2024-01-08',
      price: {
        open: 68800,
        high: 69200,
        low: 68600,
        close: 69100,
        settlement: 69080,
      },
      volume: 115200,
      openInterest: 87500,
      turnover: 398600000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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

      // 新增布林线数据
      bollinger: {
        upper: 70100,
        middle: 68980,
        lower: 67860,
        bandwidth: 3.25,
        percentB: 0.62,
      },
    },
    {
      date: '2024-01-07',
      price: {
        open: 68500,
        high: 68900,
        low: 68300,
        close: 68800,
        settlement: 68750,
      },
      volume: 108900,
      openInterest: 86800,
      turnover: 375200000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
    {
      date: '2024-01-06',
      price: {
        open: 68700,
        high: 68800,
        low: 68200,
        close: 68500,
        settlement: 68480,
      },
      volume: 98500,
      openInterest: 85900,
      turnover: 338600000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
    {
      date: '2024-01-05',
      price: {
        open: 68900,
        high: 69000,
        low: 68500,
        close: 68700,
        settlement: 68680,
      },
      volume: 105600,
      openInterest: 85200,
      turnover: 362800000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
    {
      date: '2024-01-04',
      price: {
        open: 68600,
        high: 69100,
        low: 68400,
        close: 68900,
        settlement: 68880,
      },
      volume: 112300,
      openInterest: 84600,
      turnover: 386500000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
    {
      date: '2024-01-03',
      price: {
        open: 68400,
        high: 68800,
        low: 68200,
        close: 68600,
        settlement: 68580,
      },
      volume: 96800,
      openInterest: 83900,
      turnover: 332400000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
    {
      date: '2024-01-02',
      price: {
        open: 68200,
        high: 68600,
        low: 68000,
        close: 68400,
        settlement: 68380,
      },
      volume: 89500,
      openInterest: 83200,
      turnover: 306800000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
    {
      date: '2024-01-01',
      price: {
        open: 68000,
        high: 68400,
        low: 67800,
        close: 68200,
        settlement: 68180,
      },
      volume: 78600,
      openInterest: 82500,
      turnover: 268500000,
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
      myAnalysis: {
        direction: '看多',
        analysis: '技术面突破前期高点，叠加基本面利好',
      },
      news: [
        {
          title: '智利最大铜矿工人罢工持续',
          impact: 'POSITIVE',
          importance: 'HIGH',
          source: 'Reuters',
          url: 'https://example.com/news/1',
        },
      ],
      fundamentals: {
        supply: {
          globalProduction: 2150000,
          chinaProduction: 850000,
          maintenanceImpact: 50000,
        },
        demand: {
          globalConsumption: 2180000,
          chinaConsumption: 1050000,
          newEnergyDemand: 180000,
        },
        inventory: {
          shfe: 35680,
          lme: 125000,
          bonded: 128900,
          changeWeekly: -2500,
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
  ],
};

export default cu;
