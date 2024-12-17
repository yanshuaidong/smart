const fs = require('fs').promises;
const path = require('path');

async function analyzeData() {
  try {
    const dataDir = path.join(__dirname, 'data');
    const files = await fs.readdir(dataDir);

    // 找到最新的文件
    const latestFile = files
      .filter((file) => file.startsWith('futures_market_data_'))
      .sort()
      .pop();

    if (!latestFile) {
      console.log('没有找到数据文件');
      return;
    }

    const filePath = path.join(dataDir, latestFile);
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));

    // 找到价格变化最大的品种
    let maxChange = 0;
    let maxChangeCommodity = null;

    data.marketData.forEach((commodity) => {
      const change = parseFloat(commodity.changePercent.replace('%', ''));
      if (Math.abs(change) > Math.abs(maxChange)) {
        maxChange = change;
        maxChangeCommodity = commodity;
      }
    });

    if (maxChangeCommodity) {
      console.log(`价格变化最大的品种: ${maxChangeCommodity.name} (${maxChangeCommodity.code})`);
      console.log(`变化百分比: ${maxChange}%`);
    } else {
      console.log('没有找到价格变化的品种');
    }
  } catch (error) {
    console.error('分析数据时发生错误:', error.message);
  }
}

// 导出 analyzeData 函数
module.exports = {
  analyzeData,
};
