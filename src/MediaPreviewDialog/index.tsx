import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import { filename, getFileExt, download } from 'valor-app-utils';

interface Props {
  url: string;
  size: number;
  fileName: string;
  type: string;
  onClose: () => void;
}
const MediaPreviewDialog: React.FC<Props> = ({ url, size, fileName, type, onClose }) => {
  return (
    <Modal
      title={fileName}
      visible={true}
      onCancel={onClose}
      footer={null}
      width="80vw"
      style={{ top: 30 }}
    >
      <div style={{ height: 'calc(100vh - 55px - 160px)' }}>
        {type === 'pdf' ? (
          <object data={url} type="application/pdf" width="100%" height="100%"></object>
        ) : (
          <div>
            不支持{type}文件, 请下载到本地打开
            <Button onClick={() => download(url, fileName)} type="primary" size="small">
              {' '}
              下载...
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export { MediaPreviewDialog };

export function openMediaPreviewDialog(args: {
  url: string;
  size?: number;
  fileName?: string;
  type?: string;
}) {
  const fileName = args.fileName || filename(args.url);
  const ext = getFileExt(fileName!);

  const type =
    args.type ||
    (['doc', 'docx'].includes(ext || '')
      ? 'word'
      : ['xls', 'xlsx', 'csv'].includes(ext || '')
      ? 'excel'
      : ['ppt', 'pptx'].includes(ext || '')
      ? 'powerpoint'
      : ext);
  const size = args.size || 0;

  let el = document.createElement('div');
  document.body.appendChild(el);
  function unmount() {
    ReactDOM.unmountComponentAtNode(el);
    document.body.removeChild(el);
  }
  ReactDOM.render(
    <MediaPreviewDialog
      {...args}
      fileName={fileName!}
      type={type!}
      size={size}
      onClose={unmount}
    />,
    el,
  );
}
