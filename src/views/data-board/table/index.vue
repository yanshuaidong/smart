<template>
  <div class="data-board">
    <h1>数据展示</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>商品名称</th>
            <th>价格</th>
            <th>单位</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.name }}</td>
            <!-- <td>{{ item.price }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.date }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getAllData } from '@/data';

export default {
  name: 'TablePanel',
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // 获取所有数据并展平为一个数组
      this.tableData = getAllData();
      console.log('getAllData', this.tableData);
    },
  },
};
</script>

<style scoped>
.data-board {
  padding: 20px;
}

.table-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
