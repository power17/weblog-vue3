import { ElMessage } from 'element-plus'
type MessageType = 'primary' | 'success' | 'warning' | 'info' | 'error'
export function showMessage(message: string = '提示内容', type: MessageType = 'success') {
  return ElMessage({
    message,
    type,
  })
}
