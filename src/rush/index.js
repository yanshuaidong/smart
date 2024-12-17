const { crawlEastMoney } = require('./crawlerRush');
const { analyzeData } = require('./analysisRush');

async function run() {
  try {
    // 爬取数据
    await crawlEastMoney();

    // 分析数据
    await analyzeData();
  } catch (error) {
    console.error('执行过程中发生错误:', error.message);
  }
}

// 每分钟执行一次
setInterval(run, 60000);

// 立即执行一次
run();
