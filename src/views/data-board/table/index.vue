<template>
  <div class="data-board">
    <h1>数据展示</h1>

    <!-- 添加控制开关 -->
    <div class="company-switches">
      <div class="switch-item">
        <el-switch v-model="showGuotai" active-text="国泰君安期货预测" />
      </div>
      <div class="switch-item">
        <el-switch v-model="showYongan" active-text="永安期货预测" />
      </div>
      <div class="switch-item">
        <el-switch v-model="showAnalysis" active-text="显示分析内容" />
      </div>
    </div>

    <div id="chart" class="chart-container"></div>

    <!-- 分析建议面板 -->
    <div class="analysis-panel" v-if="selectedData">
      <h3>期货公司分析</h3>
      <div v-for="rec in selectedData.recommendations" :key="rec.company">
        <p>{{ rec.company }} - {{ rec.direction }}</p>
        <p>{{ rec.analysis }}</p>
      </div>

      <h3>个人分析</h3>
      <p>{{ selectedData.myAnalysis.direction }} - {{ selectedData.myAnalysis.analysis }}</p>

      <h3>基本面数据</h3>
      <div class="fundamentals">
        <div>库存情况：上期所 {{ selectedData.fundamentals.inventory.shfe }}吨</div>
        <div>周度变化：{{ selectedData.fundamentals.inventory.changeWeekly }}吨</div>
      </div>
    </div>

    <!-- 添加预测准确率统计面板 -->
    <div class="accuracy-panel">
      <h3>期货公司预测准确率统计</h3>
      <div class="accuracy-item">
        <span>国泰君安期货：</span>
        <span>{{ calculateAccuracy('国泰君安期货') }}</span>
      </div>
      <div class="accuracy-item">
        <span>永安期货：</span>
        <span>{{ calculateAccuracy('永安期货') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import cuData from '@/data/有色金属/铜.js';

export default {
  name: 'TablePanel',
  data() {
    return {
      chart: null,
      selectedData: null,
      showGuotai: true, // 控制国泰君安预测显示
      showYongan: true, // 控制永安预测显示
      showAnalysis: true, // 控制分析显示
    };
  },
  watch: {
    // 监听开关变化，更新图表
    showGuotai() {
      this.updateChart();
    },
    showYongan() {
      this.updateChart();
    },
    showAnalysis() {
      this.updateChart();
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'));
      this.updateChart();
    },

    updateChart() {
      // 处理数据 - 反转数组顺序，使最新数据在右边
      const dates = cuData.data.map((item) => item.date).reverse();
      const data = cuData.data
        .map((item) => [item.price.open, item.price.close, item.price.low, item.price.high])
        .reverse();
      const volumes = cuData.data.map((item) => item.volume).reverse();

      // 添加布林线数据处理 - 同样需要反转
      const upperLine = cuData.data.map((item) => item.bollinger?.upper).reverse();
      const middleLine = cuData.data.map((item) => item.bollinger?.middle).reverse();
      const lowerLine = cuData.data.map((item) => item.bollinger?.lower).reverse();

      // 处理成交量颜色 - 需要使用反转后的data
      const volumeColors = data.map((item) => {
        return item[1] > item[0] ? '#ef232a' : '#14b143';
      });

      // 修改期货公司预测数据处理
      const markPointData = [];
      cuData.data.forEach((dayData) => {
        dayData.recommendations.forEach((rec) => {
          // 根据开关状态决定是否显示
          if (
            (rec.company === '国泰君安期货' && !this.showGuotai) ||
            (rec.company === '永安期货' && !this.showYongan)
          ) {
            return;
          }

          // 调整不同公司预测标记的位置
          const yOffset = rec.company === '国泰君安期货' ? 1000 : 500;

          markPointData.push({
            name: rec.company,
            coord: [dayData.date, dayData.price.high + yOffset],
            value: this.showAnalysis ? `${rec.direction}\n${rec.analysis}` : rec.direction,
            itemStyle: {
              color: rec.direction === '看多' ? '#ef232a' : rec.direction === '看空' ? '#14b143' : '#888',
            },
            symbol: rec.company === '国泰君安期货' ? 'triangle' : 'circle',
            symbolSize: 12,
          });
        });
      });

      const option = {
        title: {
          text: '铜期货行情',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          formatter: (params) => {
            const date = params[0].axisValue;
            const dayData = cuData.data.find((item) => item.date === date);
            if (!dayData) return '';

            let html = `${date}<br/>`;
            html += `开盘：${dayData.price.open}<br/>`;
            html += `收盘：${dayData.price.close}<br/>`;
            html += `最高：${dayData.price.high}<br/>`;
            html += `最低：${dayData.price.low}<br/>`;
            html += `成交量：${dayData.volume}<br/>`;

            // 添加重要新闻
            if (dayData.news && dayData.news.length > 0) {
              html += '<br/>重要新闻：<br/>';
              dayData.news.forEach((news) => {
                html += `${news.title} (${news.impact})<br/>`;
              });
            }

            return html;
          },
        },
        legend: {
          data: ['K线', '成交量'],
          top: 30,
        },
        grid: [
          {
            left: '10%',
            right: '10%',
            height: '50%',
          },
          {
            left: '10%',
            right: '10%',
            top: '70%',
            height: '20%',
          },
        ],
        xAxis: [
          {
            type: 'category',
            data: dates,
            scale: true,
          },
          {
            type: 'category',
            gridIndex: 1,
            data: dates,
            scale: true,
          },
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true,
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
          },
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100,
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            bottom: '0',
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            name: '布林上轨',
            type: 'line',
            data: upperLine,
            smooth: true,
            lineStyle: {
              opacity: 0.5,
              type: 'dashed',
              color: '#aaa',
            },
            symbol: 'none',
          },
          {
            name: '布林中轨',
            type: 'line',
            data: middleLine,
            smooth: true,
            lineStyle: {
              opacity: 0.5,
              color: '#aaa',
            },
            symbol: 'none',
          },
          {
            name: '布林下轨',
            type: 'line',
            data: lowerLine,
            smooth: true,
            lineStyle: {
              opacity: 0.5,
              type: 'dashed',
              color: '#aaa',
            },
            symbol: 'none',
          },
          {
            name: 'K线',
            type: 'candlestick',
            data: data,
            markPoint: {
              data: markPointData,
              label: {
                formatter: (params) => {
                  if (this.showAnalysis) {
                    return params.value;
                  }
                  return `${params.name}\n${params.value.split('\n')[0]}`;
                },
                position: 'top',
                distance: 5,
                fontSize: 10,
              },
              tooltip: {
                formatter: (params) => {
                  const dayData = cuData.data.find((d) => d.date === params.data.coord[0]);
                  const rec = dayData.recommendations.find((r) => r.company === params.name);
                  if (this.showAnalysis) {
                    return `${params.name}<br/>
                            预测：${rec.direction}<br/>
                            分析：${rec.analysis}`;
                  }
                  return `${params.name}<br/>预测：${rec.direction}`;
                },
              },
            },
            itemStyle: {
              color: '#ef232a',
              color0: '#14b143',
              borderColor: '#ef232a',
              borderColor0: '#14b143',
            },
          },
          {
            name: '成交量',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: volumes,
            itemStyle: {
              color: function (params) {
                return volumeColors[params.dataIndex];
              },
            },
          },
        ],
      };

      this.chart.setOption(option);

      // 点击事件
      this.chart.on('click', (params) => {
        const date = params.axisValue;
        this.selectedData = cuData.data.find((item) => item.date === date);
      });
    },

    // 添加计算预测准确率的方法
    calculateAccuracy(company) {
      let correct = 0;
      let total = 0;

      for (let i = 0; i < cuData.data.length - 1; i++) {
        const dayData = cuData.data[i];
        const nextDay = cuData.data[i + 1];

        const rec = dayData.recommendations.find((r) => r.company === company);
        if (rec) {
          const priceChange = nextDay.price.close - dayData.price.close;
          const prediction = rec.direction === '看多' ? 1 : rec.direction === '看空' ? -1 : 0;

          if (
            (priceChange > 0 && prediction > 0) ||
            (priceChange < 0 && prediction < 0) ||
            (priceChange === 0 && prediction === 0)
          ) {
            correct++;
          }
          total++;
        }
      }

      return total > 0 ? ((correct / total) * 100).toFixed(2) + '%' : 'N/A';
    },
  },
};
</script>

<style scoped>
.data-board {
  height: calc(100vh - 40px);
  overflow-y: auto;
}

.chart-container {
  width: 100%;
  height: 600px;
  margin-top: 20px;
}

.analysis-panel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.fundamentals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}

h3 {
  margin: 15px 0 10px;
  color: #333;
}

.accuracy-panel {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.accuracy-item {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}

.company-switches {
  margin: 20px 10%;
  display: flex;
  gap: 20px;
}

.switch-item {
  display: flex;
  align-items: center;
}
</style>
