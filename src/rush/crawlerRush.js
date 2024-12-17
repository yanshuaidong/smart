const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

/**
 * 爬取东方财富网期货行情页面
 * @param {string} url - 目标URL
 * @returns {Promise<void>}
 */
async function crawlEastMoney(url = 'https://qhweb.eastmoney.com/quote') {
  let browser;
  try {
    // 启动浏览器
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    });

    // 创建新页面
    const page = await browser.newPage();

    // 设置请求头
    await page.setExtraHTTPHeaders({
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    });

    // 访问页面
    await page.goto(url, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000,
    });

    // 等待页面加载完成
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 提取期货行情数据
    const futuresData = await page.evaluate(() => {
      const data = {
        timestamp: new Date().toISOString(),
        marketData: [],
      };

      // 获取所有期货行情数据行
      const rows = document.querySelectorAll('.rightPart .trBox .tr');

      rows.forEach((row) => {
        // 获取合约名称和代码
        const nameCell = row.querySelector('.nameCell');
        const name = nameCell?.querySelector('.name')?.textContent.trim() || '';
        const code = nameCell?.querySelector('.code')?.textContent.trim() || '';

        // 获取其他数据单元格
        const cells = row.querySelectorAll('.td:not(.nameCell)');

        const rowData = {
          name,
          code,
          latestPrice: cells[0]?.textContent.trim() || '',
          changePercent: cells[1]?.textContent.trim() || '',
          volume: cells[2]?.textContent.trim() || '',
          positions: cells[3]?.textContent.trim() || '', // 持仓量
          dailyIncrease: cells[4]?.textContent.trim() || '', // 日增仓
          speculationRatio: cells[5]?.textContent.trim() || '', // 投机度
          turnover: cells[6]?.textContent.trim() || '', // 成交额
          change: cells[7]?.textContent.trim() || '', // 涨跌
          openPrice: cells[8]?.textContent.trim() || '',
          highPrice: cells[9]?.textContent.trim() || '',
          lowPrice: cells[10]?.textContent.trim() || '',
          amplitude: cells[11]?.textContent.trim() || '', // 振幅
          preSettlement: cells[12]?.textContent.trim() || '', // 昨结算
        };

        // 只添加有效数据
        if (name && code) {
          data.marketData.push(rowData);
        }
      });

      return data;
    });

    // 保存JSON到data文件夹
    const currentDir = path.join(__dirname, 'data');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // 格式化时间戳
    const jsonPath = path.join(currentDir, `futures_market_data_${timestamp}.json`);
    await fs.writeFile(jsonPath, JSON.stringify(futuresData, null, 2), 'utf8');

    console.log('数据保存成功！');
    console.log(`JSON文件已保存至: ${jsonPath}`);
    console.log(`共获取 ${futuresData.marketData.length} 条期货数据`);

    return futuresData;
  } catch (error) {
    console.error('爬取页面时发生错误:', error.message);
    throw error;
  } finally {
    // 确保浏览器被关闭
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = {
  crawlEastMoney,
};
