const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

// 配置参数
const config = {
  url:
    process.argv[2] ||
    'https://fupage.10jqka.com.cn/community/m/detail.html?pid=413755531&source=1&foreign=undefined&c_channel=copylink&c_share_id=805778',
  waitTime: 5000,
  outputDir: path.join(__dirname, '..', 'data', 'news'),
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
};

async function main(config) {
  try {
    console.log('开始下载页面...');
    const { html, title } = await fetchVuePageContent(config.url, config.waitTime, config.userAgent);

    // 使用页面标题作为文件名，处理特殊字符
    const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_');
    const fileName = `${safeTitle}.html`;
    const outputPath = path.join(config.outputDir, fileName);

    // 保存文件
    await saveFile(outputPath, html);
    console.log(`页面下载完成，已保存至: ${outputPath}`);

    return html;
  } catch (error) {
    console.error('下载页面失败:', error);
    throw error;
  }
}

async function fetchVuePageContent(url, waitTime, userAgent) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // 设置更真实的用户代理
    await page.setUserAgent(userAgent);

    await page.setViewport({ width: 1920, height: 1080 });

    console.log('正在访问页面...');
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    console.log('等待页面渲染...');
    // 使用 setTimeout 和 Promise 替代 waitForTimeout
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    // 获取页面标题和内容
    const title = await page.title();
    const html = await page.content();

    return { html, title };
  } catch (error) {
    console.error('抓取页面失败:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function saveFile(outputPath, content) {
  try {
    // 确保目录存在
    const dir = path.dirname(outputPath);
    await fs.mkdir(dir, { recursive: true });

    // 保存文件
    await fs.writeFile(outputPath, content, 'utf8');
    console.log(`成功保存页面内容到: ${outputPath}`);
  } catch (error) {
    console.error('保存文件失败:', error.message);
    throw error;
  }
}

// 直接执行主函数
main(config).catch(console.error);
