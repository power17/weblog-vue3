import { ElMessage, ElMessageBox } from 'element-plus'
import type { messageType } from 'element-plus'
// type MessageType = 'primary' | 'success' | 'warning' | 'info' | 'error'
export function showMessage(message: string = '提示内容', type: messageType = 'success') {
  return ElMessage({
    message,
    type,
  })
}

// 弹出确认框
export function showModel(content = '提示内容', type: messageType = 'warning', title = '') {
  return ElMessageBox.confirm(content, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type,
    title,
  })
}
