import * as React from 'react';
import styles from './index.module.less';
import { Tooltip, Dropdown } from 'antd';

interface Props {
  IconComponent?: React.FunctionComponent;
  icon?: React.ReactElement;
  tip: string;
  showBottomLine?: boolean;
  dropdown?: React.ReactElement;
}
const DropdownToolButton: React.FC<Props> = ({
  IconComponent,
  icon,
  tip,
  showBottomLine: bottom,
  dropdown,
}) => {
  const IconComponent_ = IconComponent!;
  const [tooltipVisible, setTooltipVisible] = React.useState<boolean>(false);

  const handleDropdownVisibleChanged = React.useCallback((dropdownVisible: boolean) => {
    if (dropdownVisible) {
      setTooltipVisible(false);
    }
  }, []);
  const overlay = (
    <div className={styles['container']}>
      <div className={styles['icon-container']}>
        {icon || <IconComponent_ />}
        {bottom && <div className={styles['icon-bottom']} />}
      </div>
      <div className={styles['arrow-container']}>
        <div className={styles['arrow']} />
      </div>
    </div>
  );

  return (
    <Tooltip visible={tooltipVisible} placement="bottom" title={tip}>
      <Dropdown
        overlay={dropdown}
        trigger={['click']}
        onVisibleChange={handleDropdownVisibleChanged}
      >
        {overlay}
      </Dropdown>
    </Tooltip>
  );
};

export default DropdownToolButton;
