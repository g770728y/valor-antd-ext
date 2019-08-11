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
}
const SplitToolButton: React.FC<Props> = ({
  IconComponent,
  icon,
  tip,
  showBottomLine: bottom,
  onClick,
  dropdown,
}) => {
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);

  const handleDropdownVisibleChanged = React.useCallback((dropdownVisible: boolean) => {
    if (dropdownVisible) {
      setTooltipVisible(false);
    }
  }, []);
  const IconComponent_ = IconComponent!;
  const overlay = (
    <div className={styles['container']}>
      <div className={styles['icon-container']} onClick={onClick}>
        {icon || <IconComponent_ />}
        {bottom && <div className={styles['icon-bottom']} />}
      </div>
      <Dropdown
        overlay={dropdown}
        trigger={['click']}
        onVisibleChange={handleDropdownVisibleChanged}
      >
        <div className={`${styles['arrow-container']} ${styles['split']}`}>
          <div className={styles['arrow']} />
        </div>
      </Dropdown>
    </div>
  );

  return (
    <Tooltip visible={tooltipVisible} placement="bottom" title={tip}>
      {overlay}
    </Tooltip>
  );
};

export default SplitToolButton;
