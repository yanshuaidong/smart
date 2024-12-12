<template>
  <div class="data-board">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <div v-for="(item, index) in menuItems" :key="index">
        <!-- 含子菜单的项目 -->
        <el-submenu v-if="item.children" :key="item.index" :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.index"
            :index="subItem.index"
            :disabled="subItem.disabled"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
        <!-- 普通菜单项 -->
        <el-menu-item v-else :key="`menu-item-${item.index}`" :index="item.index" :disabled="item.disabled">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { menuItems } from '@/assets/js/filter.js';

export default {
  name: 'FilterPanel',
  data() {
    return {
      menuItems,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index) {
      const findMenuItem = (items, targetIndex) => {
        for (const item of items) {
          if (item.children) {
            const found = item.children.find((child) => child.index === targetIndex);
            if (found) return found;
          } else if (item.index === targetIndex) {
            return item;
          }
        }
        return null;
      };

      const selectedItem = findMenuItem(this.menuItems, index);

      if (selectedItem && selectedItem.path) {
        this.$router.push(`/boards/${selectedItem.path}`).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.data-board {
  width: 240px;
  height: calc(100vh - 40px);
  overflow-y: auto;
}
</style>
