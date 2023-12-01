<template>
  <div class="app-container">
    <el-form :model="searchForm" inline>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="searchForm.role" placeholder="请选择角色">
          <el-option label="全部" value="" />
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleOpenDialog()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      height="550"
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="name" />
      <el-table-column label="权限" prop="role" />
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleOpenDialog(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.total"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="ruleForm" :model="userForm" :rules="rules" label-width="120px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="userForm.confirmPassword" type="password" />
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select v-model="userForm.role">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">确认</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.userForm.confirmPassword !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      tableData: [],
      searchForm: {
        name: '',
        role: ''
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      listLoading: false,
      dialogVisible: false,
      userForm: {
        name: '',
        password: '',
        confirmPassword: '',
        role: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUsers().then(response => {
        this.tableData = response.data.items
        this.listLoading = false
      })
    },
    handleSearch() {
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.fetchData()
    },
    handleOpenDialog(row) {
      if (row) {
        this.userForm = { ...row }
      } else {
        this.userForm = {
          name: '',
          password: '',
          confirmPassword: '',
          role: ''
        }
      }

      this.dialogVisible = true

      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields()
      })
    },
    handleAdd() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.fetchData()
        } else {
          return false
        }
      })
    },
    handleDelete() {
      console.log('delete')
    }
  }
}
</script>
