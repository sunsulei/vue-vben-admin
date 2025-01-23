import { ElMessage, ElMessageBox } from 'element-plus';

export const MsgUtil = {
  messageError: (txt: string) => {
    ElMessage.error(txt);
  },
  messageSuccess: (txt: string) => {
    ElMessage.success(txt);
  },
  messageInfo: (txt: string) => {
    ElMessage.info(txt);
  },
  messageConfirm: (txt: string, callback: () => void) => {
    ElMessageBox.confirm(txt, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      callback();
    });
  },
};
