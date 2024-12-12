// 数据清洗，处理进入数据库
const str = ``;

const data = {
  company: '国泰君安',
  date: new Date().toISOString().split('T')[0],
  report: str,
};

// 处理期货公司文本数据的工具函数
function processGuoTaiData(text, date) {
  // 将文本按行分割
  const lines = text.split('\n').filter((line) => line.trim());

  const commodityAnalysis = {};

  lines.forEach((line) => {
    // 用冒号分割商品名称和分析内容
    const [commodity, analysisWithDirection] = line.split('：').map((s) => s.trim());
    if (!commodity || !analysisWithDirection) return;

    // 从方括号中提取方向
    const directionMatch = analysisWithDirection.match(/\[(.*?)\]/);
    if (!directionMatch) return;

    // 将中文方向转换为英文
    const directionMap = {
      多: 'LONG',
      空: 'SHORT',
      震荡: 'NEUTRAL',
    };

    const direction = directionMap[directionMatch[1]] || 'NEUTRAL';

    // 去除方括号部分，获取纯分析内容
    const analysis = analysisWithDirection.replace(/\[.*?\]/, '').trim();

    // 构建分析对象
    commodityAnalysis[commodity] = {
      date: date || new Date().toISOString().split('T')[0],
      company: '国泰君安',
      direction,
      analysis,
    };
  });

  return commodityAnalysis;
}

// 更新商品数据的函数
function updateCommodityData(commodityData, analysis) {
  if (!commodityData.data) {
    commodityData.data = [];
  }

  // 获取最新的数据记录
  const latestData = commodityData.data[0] || {};

  // 更新建议
  if (!latestData.recommendations) {
    latestData.recommendations = [];
  }

  // 添加或更新国泰君安的建议
  const guotaiIndex = latestData.recommendations.findIndex((rec) => rec.company === '国泰君安期货');

  const recommendation = {
    company: '国泰君安期货',
    direction: analysis.direction,
    reason: analysis.analysis,
    confidence: analysis.confidence,
    date: analysis.date,
  };

  if (guotaiIndex >= 0) {
    latestData.recommendations[guotaiIndex] = recommendation;
  } else {
    latestData.recommendations.push(recommendation);
  }

  return commodityData;
}

// 更新所有商品数据
function updateAllCommodities(date) {
  try {
    // 直接使用 str 变量中的数据，而不是读取文件
    const analysisData = processGuoTaiData(str, date);
    console.log(analysisData);

    // 铜数据更新
    if (analysisData['铜']) {
      const cuData = {
        name: '铜',
        data: [
          {
            date: date || new Date().toISOString().split('T')[0],
            recommendations: [
              {
                company: '国泰君安期货',
                direction: analysisData['铜'].direction,
                reason: analysisData['铜'].analysis,
                confidence: analysisData['铜'].confidence,
                date: analysisData['铜'].date,
              },
            ],
          },
        ],
      };

      // 返回处理后的数据，而不是写入文件
      return {
        commodities: {
          铜: cuData,
        },
        date: date || new Date().toISOString().split('T')[0],
        source: '国泰君安',
      };
    }

    console.log('数据处理完成');
    return null;
  } catch (error) {
    console.error('处理数据时发生错误:', error);
    return null;
  }
}

updateAllCommodities(data);
