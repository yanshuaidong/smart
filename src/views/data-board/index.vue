<template>
  <div class="data-board">
    <div class="header">
      <div class="left">
        <div class="title">数据看板</div>
      </div>
      <div class="right"></div>
    </div>
    <div class="wrapper">
      <div class="left">
        <FilterPanel />
      </div>
      <div class="right">
        <TablePanel />
      </div>
    </div>
  </div>
</template>

<script>
import FilterPanel from './filter/index.vue';
import TablePanel from './table/index.vue';

export default {
  name: 'DataBoard',
  components: {
    FilterPanel,
    TablePanel,
  },
  data() {
    return {
      // 这里可以添加需要的数据
    };
  },
  methods: {
    // 这里可以添加需要的方法
  },
};
</script>

<style scoped lang="scss">
.data-board {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    background-color: #409eff;
    .left {
      .title {
        width: 100%;
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        line-height: 40px;
      }
    }
  }
  .wrapper {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    .left {
      width: 240px;
    }
    .right {
      width: calc(100% - 240px);
    }
  }
}
</style>
