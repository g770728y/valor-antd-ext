import * as React from 'react';
import styles from './index.module.less';
import { Tooltip } from 'antd';

interface Props {
  IconComponent?: React.FunctionComponent;
  icon?: React.ReactElement;
  tip: string;
  showBottomLine?: boolean;
  onClick: () => void;
  actived?: boolean;
  disabled?: boolean;
}
const SimpleToolButton: React.FC<Props> = ({
  IconComponent,
  icon,
  tip,
  showBottomLine: bottom,
  onClick,
  actived = false,
  disabled = false,
}) => {
  const IconComponent_ = IconComponent!;
  const containerStyles = `${styles['container']} ${actived ? styles['container-actived'] : ''} ${
    disabled ? styles['container-disabled'] : ''
  }`;
  const overlay = (
    <div className={containerStyles}>
      <div className={styles['icon-container']} onClick={() => !disabled && onClick()}>
        {icon || <IconComponent_ />}
        {bottom && <div className={styles['icon-bottom']} />}
      </div>
    </div>
  );

  return disabled ? (
    overlay
  ) : (
    <Tooltip placement="bottom" title={tip}>
      {overlay}
    </Tooltip>
  );
};

export default SimpleToolButton;
