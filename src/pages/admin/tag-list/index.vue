<template>
  <div>
    <!-- 表头分页查询条件， shadow="never" 指定 card 卡片组件没有阴影 -->
    <el-card shadow="never" class="mb-5">
      <!-- flex 布局，内容垂直居中 -->
      <div class="flex items-center">
        <el-text>标签名称</el-text>
        <div class="ml-3 w-52 mr-5">
          <el-input v-model="searchTagName" placeholder="请输入（模糊查询）" />
        </div>

        <el-text>创建日期</el-text>
        <div class="ml-3 w-30 mr-5">
          <!-- 日期选择组件（区间选择） -->
          <el-date-picker
            v-model="pickDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="default"
            value-format="YYYY-MM-DD"
            :shortcuts="shortcuts"
            @change="datepickerChange"
          />
        </div>

        <el-button type="primary" class="ml-3" :icon="Search" @click="getTableData">查询</el-button>
        <el-button class="ml-3" :icon="RefreshRight" @click="reset">重置</el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <!-- 新增按钮 -->
      <div class="mb-5">
        <el-button type="primary" @click="addTagBtnClick">
          <el-icon class="mr-1">
            <Plus />
          </el-icon>
          新增</el-button
        >
      </div>

      <!-- 分页列表 -->
      <el-table :data="tableData" border stripe style="width: 100%" v-loading="tableLoading">
        <el-table-column prop="name" label="标签名称" width="180">
          <template #default="scope">
            <el-tag type="success">{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="deleteTagSubmit(scope.row)">
              <el-icon class="mr-1">
                <Delete />
              </el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="mt-10 flex justify-center">
        <el-pagination
          v-model:current-page="current"
          v-model:page-size="size"
          :page-sizes="[10, 20, 50]"
          :small="false"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getTableData"
        />
      </div>
    </el-card>

    <!-- 添加分类 -->
    <FormDialog ref="formDialogRef" title="添加标签" destroyOnClose @submit="onSubmit">
      <el-form ref="formRef" :model="form">
        <el-form-item label="标签名称" prop="name">
          <div class="flex gap-2 items-center">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <span class="w-20">
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">
                + New Tag
              </el-button>
            </span>
          </div>
        </el-form-item>
      </el-form>
    </FormDialog>
  </div>
</template>

<script lang="ts" setup>
import { Search, RefreshRight } from '@element-plus/icons-vue'
import { ref, reactive, nextTick } from 'vue'
import { getTagPageList, addTag, deleteTag } from '@/api/admin/tag.ts'
import { showMessage, showModel } from '@/utils/index'
import FormDialog from '@/components/FormDialog.vue'
import type { FormInstance, InputInstance } from 'element-plus'
// 分页查询的标签名称
const searchTagName = ref('')
// 日期
const pickDate = ref<string[]>([])

// 查询条件：开始结束时间
const startDate = ref('')
const endDate = ref('')

// 监听日期组件改变事件，并将开始结束时间设置到变量中
const datepickerChange = (date: string[]) => {
  startDate.value = date[0]
  endDate.value = date[1]

  console.log('开始时间：' + startDate.value + ', 结束时间：' + endDate.value)
}

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

// 表格加载 Loading
const tableLoading = ref(false)
// 表格数据
const tableData = ref([])
// 当前页码，给了一个默认值 1
const current = ref(1)
// 总数据量，给了个默认值 0
const total = ref(0)
// 每页显示的数据量，给了个默认值 10
const size = ref(10)

// 获取分页数据
function getTableData() {
  // 显示表格 loading
  tableLoading.value = true
  // 调用后台分页接口，并传入所需参数

  getTagPageList({
    current: current.value,
    size: size.value,
    startDate: startDate.value,
    endDate: endDate.value,
    name: searchTagName.value,
  })
    .then((res) => {
      if (res.success == true) {
        tableData.value = res.data
        current.value = res.current || 1
        size.value = res.size || 10
        total.value = res.total || 0
      }
    })
    .finally(() => (tableLoading.value = false)) // 隐藏表格 loading
}
getTableData()

// 每页展示数量变更事件
const handleSizeChange = (chooseSize: number) => {
  console.log('选择的页码' + chooseSize)
  size.value = chooseSize
  getTableData()
}

// 重置查询条件
const reset = () => {
  searchTagName.value = ''
  pickDate.value = []
  startDate.value = ''
  endDate.value = ''
}

// 对话框是否显示
const formDialogRef = ref<InstanceType<typeof FormDialog>>()

// 新增分类按钮点击事件
const addTagBtnClick = () => {
  formDialogRef.value!.open()
}

// 表单引用
const formRef = ref<FormInstance>()

// 添加文章分类表单对象
const form = reactive({
  name: '',
})

const onSubmit = () => {
  // 先验证 form 表单字段
  formRef.value!.validate((valid) => {
    if (!valid) {
      console.log('表单验证不通过')
      return
    }

    // 显示提交按钮 loading
    formDialogRef.value!.showBtnLoading()
    addTag({ tags: dynamicTags.value })
      .then((res) => {
        if (res.success == true) {
          showMessage('添加成功')
          // 将表单中分类名称置空
          form.name = ''
          // 隐藏对话框
          formDialogRef.value!.close()
          // 重新请求分页接口，渲染数据
          getTableData()
        } else {
          // 获取服务端返回的错误消息
          const message = res.message
          // 提示错误消息
          showMessage(message, 'error')
        }
      })
      .finally(() => formDialogRef.value!.closeBtnLoading()) // 隐藏提交按钮 loading
  })
}

// 删除分类
const deleteTagSubmit = (row: { id: number }) => {
  showModel('是否确定要删除该标签？')
    .then(() => {
      deleteTag(row.id).then((res) => {
        if (res.success == true) {
          showMessage('删除成功')
          // 重新请求分页接口，渲染数据
          getTableData()
        } else {
          // 获取服务端返回的错误消息
          const message = res.message
          // 提示错误消息
          showMessage(message, 'error')
        }
      })
    })
    .catch(() => {
      console.log('取消了')
    })
}

// 添加标签
const inputValue = ref('')
const dynamicTags = ref<string[]>([])
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
