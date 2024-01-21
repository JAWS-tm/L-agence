import classNames from 'classnames';
import styles from './Checkbox.module.scss';
import { forwardRef } from 'react';

type Props = {
  checked?: boolean;
  label?: string | React.ReactNode;
  onCheck?: (value: boolean) => void;
  className?: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ checked, label, onCheck, className }, ref) => {
    return (
      <div className={classNames(styles.container, className)}>
        <label>
          <div style={{ position: 'relative' }}>
            <input
              ref={ref}
              className={styles.input}
              type="checkbox"
              checked={checked}
              onChange={() => onCheck && onCheck(!checked)}
            />
            <i className={classNames('fa-solid fa-check', styles.icon)} />
          </div>
          <span className={styles.label}>{label}</span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
