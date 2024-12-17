// const { processExcelData } = require('../utils/xlsxhandler');

// // 处理 Excel 文件并保存为 JSON
// processExcelData('每日数据.xlsx', 'data.json');

// 用爬虫进行数据收集。

const { crawlEastMoney, scheduleDataCrawling } = require('../utils/crawler');

// 单次爬取
crawlEastMoney()
  .then((data) => console.log('爬取成功:', data))
  .catch((err) => console.error('爬取失败:', err));

// 或者启动定时爬取（每5分钟一次）
// scheduleDataCrawling(5 * 60 * 1000);
