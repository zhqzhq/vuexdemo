<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      :value="inputvalue"
      @change="handleinputchange"
      class="my_ipt"
    />
    <a-button type="primary" @click="additemtodolist">添加事项</a-button>

    <a-list bordered :dataSource="todolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="ckchange($event, item.id)">{{
          item.info
        }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeitembyid(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ undoneitem }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="view === 'all' ? 'pirmary' : 'default'"
            @click="changeview('all')"
            >全部</a-button
          >
          <a-button
            :type="view === 'undone' ? 'pirmary' : 'default'"
            @click="changeview('undone')"
            >未完成</a-button
          >
          <a-button
            :type="view === 'done' ? 'pirmary' : 'default'"
            @click="changeview('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["list", "inputvalue", "view"]),
    ...mapGetters(["undoneitem", "todolist"]),
  },
  methods: {
    handleinputchange(e) {
      this.$store.commit("setInputvalue", e.target.value);
    },
    additemtodolist() {
      if (this.inputvalue.trim().length <= 0) {
        return this.$message.warning("输入框不允许为空");
      }
      this.$store.commit("additem");
    },
    removeitembyid(id) {
      console.log(id);
      this.$store.commit("removeitems", id);
    },
    ckchange(e, id) {
      const param = {
        status: e.target.checked,
        id: id,
      };
      this.$store.commit("setck", param);
    },
    clean() {
      this.$store.commit("cleanitem");
    },
    changeview(key) {
      this.$store.commit("viewchange", key);
    },
  },
};
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
