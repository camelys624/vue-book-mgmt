<template>
  <div class="book-list-container">
    <el-form :model="searchForm" inline>
      <el-form-item label="书名">
        <el-input
          v-model="searchForm.bookName"
          placeholder="请输入书名"
          @keyup.enter.native="search"
        />
      </el-form-item>
      <el-form-item label="ISBN">
        <el-input
          v-model="searchForm.isbn"
          placeholder="请输入ISBN"
          @keyup.enter.native="search"
        />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchForm.type" placeholder="请选择类型">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      height="550"
      style="width: 100%"
    >
      <el-table-column
        prop="isbn"
        label="ISBN"
      />
      <el-table-column
        prop="bookName"
        label="书名"
      />
      <el-table-column
        prop="author"
        label="作者"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="num"
        label="入库数量"
      />
      <el-table-column
        prop="address"
        label="位置"
      />
      <el-table-column
        prop="publisher"
        label="出版商"
      />
      <el-table-column
        prop="date"
        label="上架日期"
      />
      <el-table-column label="操作" width="220">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            @click="handleEdit(row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="info"
            @click="handleBorrow(row)"
          >借阅</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >销毁</el-button>
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
      title="添加书籍"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <el-form :model="bookForm" :rules="rules" label-width="120px">
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="bookForm.isbn" />
        </el-form-item>
        <el-form-item label="书名" prop="bookName">
          <el-input v-model="bookForm.bookName" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="bookForm.author" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="bookForm.type">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="入库数量" prop="num">
          <el-input v-model="bookForm.num" type="number" />
        </el-form-item>
        <el-form-item label="位置">
          <el-input v-model="bookForm.address" />
        </el-form-item>
        <el-form-item label="出版商">
          <el-input v-model="bookForm.publisher" />
        </el-form-item>
        <el-form-item label="上架日期">
          <el-date-picker
            v-model="bookForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddBook">添加</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    const checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入入库数量'))
      }
      if (value <= 0) {
        return callback(new Error('入库数量必须大于0'))
      }
      callback()
    }

    return {
      searchForm: {
        bookName: '',
        isbn: '',
        type: ''
      },
      loading: false,
      dialogVisible: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      typeList: [
        '全部',
        '语文类',
        '艺术类',
        '中国史地',
        '科学类',
        '应用科学类',
        '哲学类',
        '社会科学类',
        '世界史地',
        '宗教类'
      ],
      tableData: [],
      bookForm: {
        isbn: '',
        bookName: '',
        author: '',
        type: '',
        num: '',
        address: '',
        publisher: '',
        date: ''
      },
      rules: {
        bookName: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        isbn: [
          { required: true, message: '请输入ISBN', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        num: [
          { validator: checkNum, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      this.loading = true
      getList({
        pageNum: this.pageInfo.pageNum,
        pageSize: this.pageInfo.pageSize,
        bookName: this.bookName,
        isbn: this.isbn,
        type: this.type
      }).then(response => {
        this.tableData = response.data.items
        this.pageInfo.total = response.data.total
        this.loading = false
      })
    },
    handleAdd() {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }

      this.bookForm = {
        isbn: '',
        bookName: '',
        author: '',
        type: '',
        num: '',
        address: '',
        publisher: '',
        date: ''
      }

      this.dialogVisible = true
    },
    handleEdit(row) {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].resetFields()
      }
      this.bookForm = { ...row }
      this.dialogVisible = true
      
    },
    handleBorrow({ id }) {
    },
    handleDelete({ id }) {
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.search()
    },
    handleAddBook() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          this.search()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.book-list-container {
  padding: 20px;
}
</style>
