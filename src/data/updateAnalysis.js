import { processGuoTaiData, updateCommodityData } from '../utils/国泰君安';
import fs from 'fs';
import path from 'path';

// 商品类别和对应的目录映射
const COMMODITY_DIRS = {
  贵金属组: 'precious_metals',
  有色金属组: 'base_metals',
  硅产业链: 'silicon_chain',
  黑色金属组: 'ferrous_metals',
  化工品组: 'chemicals',
  农产品组: 'agricultural',
};

// 商品代码映射
const COMMODITY_CODES = {
  黄金: 'gold',
  白银: 'silver',
  铜: 'cu',
  铝: 'al',
  // ... 其他商品映射
};

// 读取数据来源文件
const sourceText = fs.readFileSync(path.resolve(__dirname, '../utils/数据来源.md'), 'utf-8');

// 处理数据
const analysisData = processGuoTaiData(sourceText);

// 更新各个商品的数据文件
function updateAllCommodities() {
  Object.entries(analysisData).forEach(([commodityName, data]) => {
    const code = COMMODITY_CODES[commodityName];
    if (!code) return;

    // 确定商品所在的目录
    const dir = Object.entries(COMMODITY_DIRS).find(([category, _]) =>
      filter.menuItems.find(
        (item) => item.title === category && item.children.some((child) => child.title === commodityName)
      )
    )?.[1];

    if (!dir) return;

    const filePath = path.resolve(__dirname, `./${dir}/${code}.js`);
    if (fs.existsSync(filePath)) {
      let commodityData = require(filePath).default;
      commodityData = updateCommodityData(commodityData, data);

      // 将更新后的数据写回文件
      const content = `const ${code} = ${JSON.stringify(commodityData, null, 2)};\n\nexport default ${code};`;
      fs.writeFileSync(filePath, content);
    }
  });
}

export { updateAllCommodities };
