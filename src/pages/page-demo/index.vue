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

        <el-table-column type="index" width="70">
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="150">
        </el-table-column>

        <el-table-column label="日期" width="200">
        <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>

        <el-table-column prop="addr" label="地址" width="300">
        </el-table-column>

        <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button type="danger" @click="handleDel(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>

    </el-table>

    <!-- 编辑界面 -->
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="right">

        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        
          <el-form-item label="日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
          </el-form-item>


        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.addr" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    </d2-container>
</template>
<script>
export default {
    data() {
          return {
            tableData3: [],
            formLabelWidth:'100px',
            dialogFormVisible: false,
            //编辑表单数据
            form: {
              name: '',
              date: '',
              addr: '',
              email: ''
            },
          }
        },

    created(){
      this.axiosGetRole();
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
      },
      handleEdit:function(index,row){
        this.dialogFormVisible = true;
        this.form = Object.assign({},row);
      }
    },
    
    mounted(){
      
    },
}
</script>

