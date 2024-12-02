<template>
  <div class="home">fasdfasda{{ isCollapse }}</div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HomePage',
  computed: {
    isCollapse() {
      // 存储位置： store.state.{模块名,在store/index.js中module下的}.{state中定义的属性}
      return this.$store.state.tab.isCollapse;
    },
  },
  mounted() {
    console.log('Store getters:', this.$store);
    // this.initChart();
  },
  methods: {
    initChart() {
      if (!this.visitStats.days || !this.visitStats.data) {
        console.error('Visit stats data is not available');
        return;
      }

      this.chart = echarts.init(document.getElementById('chartContainer'));

      const option = {
        title: {
          text: 'Blog Visit Statistics',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: this.visitStats.days,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Visits',
            type: 'bar',
            data: this.visitStats.data,
            itemStyle: {
              color: '#42b983',
            },
          },
        ],
      };

      this.chart.setOption(option);

      window.addEventListener('resize', () => {
        this.chart && this.chart.resize();
      });
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

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.blog-posts {
  display: grid;
  gap: 20px;
}

.post-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-meta {
  color: #666;
  font-size: 0.9em;
}

.read-more {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.read-more:hover {
  background-color: #3aa876;
}

#chartContainer {
  margin: 20px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.stats-summary {
  text-align: center;
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}
</style>
