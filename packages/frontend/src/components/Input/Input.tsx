import classNames from 'classnames';
import styles from './styles.module.scss';
import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  errorMsg?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ errorMsg, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <input
          {...props}
          ref={ref}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={classNames(styles.input, errorMsg && styles.error)}
        />
        {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
      </div>
    );
  }
);

export default Input;
