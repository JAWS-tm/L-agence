import classNames from 'classnames';
import styles from './styles.module.scss';
import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  type: 'text' | 'number' | 'email' | 'password';
  errorMsg?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <div className={styles.inputContainer}>
      <input
        {...props}
        ref={ref}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={classNames(styles.input, props.errorMsg && styles.error)}
      />
      {props.errorMsg && (
        <span className={styles.errorMsg}>{props.errorMsg}</span>
      )}
    </div>
  );
});

export default Input;
