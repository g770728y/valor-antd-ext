import * as React from 'react';
import styles from './index.module.less';
import { Tooltip, Dropdown } from 'antd';

interface Props {
  IconComponent?: React.FunctionComponent;
  icon?: React.ReactElement;
  tip: string;
  showBottomLine?: boolean;
  onClick: () => void;
  dropdown?: React.ReactElement;
  actived?: boolean;
  disabled?: boolean;
}
const SplitToolButton: React.FC<Props> = ({
  IconComponent,
  icon,
  tip,
  showBottomLine: bottom,
  onClick,
  dropdown,
  actived = false,
  disabled = false,
}) => {
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);

  const handleDropdownVisibleChanged = React.useCallback((dropdownVisible: boolean) => {
    if (dropdownVisible) {
      setTooltipVisible(false);
    }
  }, []);
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
      <Dropdown
        overlay={dropdown}
        trigger={['click']}
        onVisibleChange={handleDropdownVisibleChanged}
        disabled={disabled}
      >
        <div className={`${styles['arrow-container']} ${styles['split']}`}>
          <div className={styles['arrow']} />
        </div>
      </Dropdown>
    </div>
  );

  return disabled ? (
    overlay
  ) : (
    <Tooltip visible={tooltipVisible} placement="bottom" title={tip}>
      {overlay}
    </Tooltip>
  );
};

export default SplitToolButton;
