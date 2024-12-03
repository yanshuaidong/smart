<template>
  <div class="home">
    <div id="mychart" class="chart"></div>
    <el-row>
      <el-button @click="showNotification">显示通知</el-button>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapState(['count']),
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      var myChart = echarts.init(document.getElementById('mychart'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
    showNotification() {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('通知标题', {
              body: '这是通知的内容',
              icon: 'path/to/icon.png', // 可选: 通知图标
            });
          } else {
            console.log('用户拒绝了通知权限');
          }
        });
      } else {
        console.log('当前浏览器不支持通知');
      }
    },
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
};
</script>

<style scoped lang="scss">
.home {
  .chart {
    width: 100%;
    height: 400px;
  }
}
</style>
