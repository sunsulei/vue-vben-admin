import { ElMessage } from 'element-plus';

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
};
