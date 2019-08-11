import * as React from 'react';
import styles from './index.module.less';
import { Tooltip } from 'antd';

interface Props {
  IconComponent?: React.FunctionComponent;
  icon?: React.ReactElement;
  tip: string;
  showBottomLine?: boolean;
  onClick: () => void;
}
const SimpleToolButton: React.FC<Props> = ({
  IconComponent,
  icon,
  tip,
  showBottomLine: bottom,
  onClick,
}) => {
  console.log('tip', tip);
  const IconComponent_ = IconComponent!;
  const overlay = (
    <div className={styles['container']}>
      <div className={styles['icon-container']} onClick={onClick}>
        {icon || <IconComponent_ />}
        {bottom && <div className={styles['icon-bottom']} />}
      </div>
    </div>
  );

  return (
    <Tooltip placement="bottom" title={tip}>
      {overlay}
    </Tooltip>
  );
};

export default SimpleToolButton;
