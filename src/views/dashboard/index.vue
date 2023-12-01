<template>
  <div class="dashboard-container">
    <div class="dashboard-row dashboard-number-box">
      <div class="dashboard-item">
        <label>库存</label>
        <span class="dashboard-number store">0</span>
      </div>
      <div class="dashboard-item">
        <label>借出</label>
        <span class="dashboard-number borrow">0</span>
      </div>
      <div class="dashboard-item">
        <label>销毁</label>
        <span class="dashboard-number destroy">0</span>
      </div>
      <div class="dashboard-item">
        <label>今日新增</label>
        <span class="dashboard-number add">0</span>
      </div>
      <div class="dashboard-item">
        <label>今日借出</label>
        <span class="dashboard-number today-borrow">0</span>
      </div>
    </div>
    <div class="dashboard-row">
      <div class="dashboard-item">
        <h3>月借阅归还统计</h3>
        <div id="chart-1" class="dashboard-item-content" style="height: 300px;" />
      </div>
    </div>
    <div class="dashboard-row">
      <div class="dashboard-item">
        <h3>借阅类型统计</h3>
        <div id="chart-2" class="dashboard-item-content" />
      </div>
      <div class="dashboard-item">
        <h3>公告</h3>
        <div class="dashboard-item-content">
          <ul>
            <li v-for="(item, index) in noteList" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      noteList: [],
      logList: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.initBorrowChart()
    this.initTypeChart()
  },
  methods: {
    initBorrowChart() {
      const chart = echarts.init(document.getElementById('chart-1'))
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['借出', '归还']
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '借出',
            type: 'line',
            data: [10, 20, 30, 23, 25, 18, 23, 34, 22]
          },
          {
            name: '归还',
            type: 'line',
            data: [5, 10, 15, 20, 25, 30, 35, 40, 45]
          }
        ]
      }

      chart.setOption(option)
    },
    initTypeChart() {
      const chart = echarts.init(document.getElementById('chart-2'))
      const option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: 'top'
        },
        series: [
          {
            name: '借阅类型',
            type: 'pie',
            radius: [50, 200],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 40, name: '语文类' },
              { value: 38, name: '艺术类' },
              { value: 32, name: '中国史地' },
              { value: 30, name: '科学类' },
              { value: 28, name: '应用科学类' },
              { value: 26, name: '哲学类' },
              { value: 24, name: '社会科学类' },
              { value: 22, name: '世界史地' },
              { value: 18, name: '宗教类' }
            ]
          }
        ]
      }

      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: whitesmoke;
}

.dashboard-row {
  width: 100%;
  display: flex;
  gap: 20px;
}

.dashboard-number-box > div {
  width: 200px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.dashboard-number-box :is(label, span) {
  font-weight: bold;
  font-size: 30px;
}

.store {
  color: cadetblue;
}
.borrow {
  color: coral;
}
.destroy {
  color: crimson;
}
.add {
  color: darkcyan;
}
.today-borrow {
  color: yellow;
}

.dashboard-item {
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 6px;
}

.dashboard-item h3 {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
  margin: -20px -20px 0 -20px;
  padding-left: 20px;
}

.dashboard-item-content {
  height: 500px;
  overflow: auto;
}
</style>
