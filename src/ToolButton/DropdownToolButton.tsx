import * as React from 'react';
import styles from './index.module.less';
import { Tooltip, Dropdown } from 'antd';

interface Props {
  // 当即将显示下拉框时的回调
  onBeforeDropdown?: () => void;
  IconComponent?: React.FunctionComponent;
  icon?: React.ReactElement;
  tip: string;
  showBottomLine?: boolean;
  dropdown?: React.ReactElement;
  actived?: boolean;
  disabled?: boolean;
}
const DropdownToolButton: React.FC<Props> = ({
  onBeforeDropdown,
  IconComponent,
  icon,
  tip,
  showBottomLine: bottom,
  dropdown,
  actived = false,
  disabled = false,
}) => {
  const IconComponent_ = IconComponent!;
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);

  const handleDropdownVisibleChanged = React.useCallback((dropdownVisible: boolean) => {
    if (dropdownVisible) {
      onBeforeDropdown && onBeforeDropdown();
      setTooltipVisible(false);
    }
  }, []);
  const containerStyles = `${styles['container']} ${actived ? styles['container-actived'] : ''} ${
    disabled ? styles['container-disabled'] : ''
  }`;
  const overlay = (
    <div className={containerStyles}>
      <div className={styles['icon-container']}>
        {icon || <IconComponent_ />}
        {bottom && <div className={styles['icon-bottom']} />}
      </div>
      <div className={styles['arrow-container']}>
        <div className={styles['arrow']} />
      </div>
    </div>
  );

  const dropdownView = (
    <Dropdown
      overlay={dropdown}
      trigger={['click']}
      onVisibleChange={handleDropdownVisibleChanged}
      disabled={disabled}
    >
      {overlay}
    </Dropdown>
  );

  return disabled ? (
    dropdownView
  ) : (
    <Tooltip visible={tooltipVisible} placement="bottom" title={tip}>
      {dropdownView}
    </Tooltip>
  );
};

export default DropdownToolButton;
