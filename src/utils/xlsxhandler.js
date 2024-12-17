const XLSX = require('xlsx');
const fs = require('fs');

// Table 映射 Json
var map = {
  名称: 'name',
  代码: 'code',
  日期: 'date',
  开盘价: 'price.open',
  最高价: 'price.high',
  最低价: 'price.low',
  收盘价: 'price.close',
  结算价: 'price.settlement',
  成交量: 'volume',
  持仓量: 'openInterest',
  成交额: 'turnover',
  日增仓: 'dailyIncrease',
  资金流向: 'capitalFlow',
  上轨: 'bollinger.upper',
  中轨: 'bollinger.middle',
  下轨: 'bollinger.lower',
};

// 路径映射
var pathMap = {
  铜: 'src/data/有色金属/铜.js',
  铝: 'src/data/有色金属/铝.js',
  锌: 'src/data/有色金属/锌.js',
  铅: 'src/data/有色金属/铅.js',
  镍: 'src/data/有色金属/镍.js',
};

// 基础对象结构
const baseDataStructure = {
  filePath: '',
  name: '',
  code: '',
  date: '',
  price: {
    open: null,
    high: null,
    low: null,
    close: null,
    settlement: null,
  },
  volume: null,
  openInterest: null,
  turnover: null,
  dailyIncrease: null,
  capitalFlow: null,
  bollinger: {
    upper: null,
    middle: null,
    lower: null,
  },
};

/**
 * 将 Excel 文件转换为 JSON 数据
 * @param {string} filePath - Excel 文件路径
 * @param {Object} options - 配置选项
 * @param {string} options.sheet - 工作表名称（可选，默认读取第一个工作表）
 * @param {boolean} options.header - 是否包含表头（默认为 true）
 * @returns {Array} 转换后的 JSON 数据数组
 */
function xlsxToJson(filePath, options = {}) {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      throw new Error(`文件不存在: ${filePath}`);
    }

    // 读取 Excel 文件
    const workbook = XLSX.readFile(filePath);

    // 获取工作表名称
    const sheetName = options.sheet || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // 转换为 JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: options.header === false ? 1 : undefined,
      raw: true,
      dateNF: 'yyyy-mm-dd',
    });

    return jsonData;
  } catch (error) {
    console.error('Excel 转换失败:', error);
    throw error;
  }
}

/**
 * 将 JSON 数据保存为 Excel 文件
 * @param {Array} jsonData - 要保存的 JSON 数据
 * @param {string} outputPath - 输出文件路径
 * @param {Object} options - 配置选项
 * @param {string} options.sheet - 工作表名称（默认为 "Sheet1"）
 */
function jsonToXlsx(jsonData, outputPath, options = {}) {
  try {
    // 创建工作簿
    const workbook = XLSX.utils.book_new();

    // 将 JSON 转换为工作表
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, options.sheet || 'Sheet1');

    // 写入文件
    XLSX.writeFile(workbook, outputPath);

    console.log(`文件已保存: ${outputPath}`);
  } catch (error) {
    console.error('保存 Excel 失败:', error);
    throw error;
  }
}

/**
 * 获取工作表中的所有列名
 * @param {string} filePath - Excel 文件路径
 * @param {string} sheetName - 工作表名称（可选）
 * @returns {Array} 列名数组
 */
function getColumnNames(filePath, sheetName) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheet = sheetName || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheet];

    // 获取工作表的范围
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const columnNames = [];

    // 遍历第一行获取列名
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      const cell = worksheet[cellAddress];
      columnNames.push(cell ? cell.v : '');
    }

    return columnNames;
  } catch (error) {
    console.error('获取列名失败:', error);
    throw error;
  }
}

// 添加 Excel 日期转换函数
function excelDateToJSDate(excelDate) {
  // Excel的基准日期是1900年1月1日，但是Excel错误地将1900年当作闰年，所以需要减去2天
  var excelEpoch = new Date(1900, 0, 1);
  var excelOffset = 1; // 因为Excel将1900年1月0日和1月1日都计算在内

  // 将Excel日期序列号转换为毫秒数
  var utcDays = excelDate - excelOffset;
  var utcValue = utcDays * 86400000; // 一天的毫秒数

  // 创建一个新的Date对象，并设置为UTC时间
  var resultDate = new Date(excelEpoch.getTime() + utcValue);

  return resultDate;
}

/**
 * 将 Excel 数据转换为指定格式并保存为 JSON 文件
 * @param {string} filePath - Excel 文件路径
 * @param {string} outputPath - 输出 JSON 文件路径
 */
function processExcelData(filePath, outputPath = 'data.json') {
  try {
    // 读取 Excel 数据
    const rawData = xlsxToJson(filePath, { header: false });

    if (!rawData || rawData.length < 2) {
      throw new Error('Excel 文件数据不足');
    }

    // 获取表头（第一行）
    const headers = Object.values(rawData[0]);

    // 处理数据（从第二行开始���
    const processedData = rawData.slice(1).map((row) => {
      // 使用结构克隆基础对象
      const item = JSON.parse(JSON.stringify(baseDataStructure));

      headers.forEach((header, index) => {
        const value = Object.values(row)[index];
        const mappedKey = map[header];

        if (mappedKey) {
          if (mappedKey === 'date' && value) {
            // 处理日期格式
            if (typeof value === 'number') {
              // 处理 Excel 序列号日期
              const jsDate = excelDateToJSDate(value);
              const year = jsDate.getFullYear();
              const month = String(jsDate.getMonth() + 1).padStart(2, '0');
              const day = String(jsDate.getDate()).padStart(2, '0');
              item.date = `${year}-${month}-${day}`;
            } else if (typeof value === 'string') {
              // 保留字符串日期处理逻辑，以防万一
              const [year, month, day] = value.split('/');
              if (year && month && day) {
                item.date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
              }
            }
          } else if (mappedKey.includes('.')) {
            // 处理嵌套属性（如 price.open, bollinger.upper）
            const [parent, child] = mappedKey.split('.');
            item[parent][child] = value;
          } else {
            item[mappedKey] = value;
          }
        }
      });

      // 根据名称添加文件路径
      if (item.name && pathMap[item.name]) {
        item.filePath = pathMap[item.name];
      }

      return item;
    });

    // 保存为 JSON 文件
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2), 'utf8');

    console.log(`数据已保存到: ${outputPath}`);
    return processedData;
  } catch (error) {
    console.error('处理数据失败:', error);
    throw error;
  }
}

module.exports = {
  xlsxToJson,
  jsonToXlsx,
  getColumnNames,
  processExcelData,
};
