<template>
    <d2-container type='full'>
     <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        
        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column label="日期" width="200">
        <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="200">
        </el-table-column>

        <el-table-column prop="addr" label="地址" width="300">
        </el-table-column>

        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
        </el-table-column>

    </el-table>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    </d2-container>
</template>
<script>
export default {
        data() {
          return {
            tableData3: [],
          }
        },

    methods: {

      // 模拟发送请求
      axiosGetRole(){
        this.$axios.post('/news/api',{withCredentials:true})
        .then((response) => {
          this.tableData3 = response.articles
          console.log(this.tableData3)
        })
        .catch((error) =>{
          console.log(error)
        })
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    mounted(){
      this.axiosGetRole();
    }
}
</script>

