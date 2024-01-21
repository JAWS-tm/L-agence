import { forwardRef } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  errorMsg?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ errorMsg, ...props }, ref) => {
    return (
      <div>
        <textarea
          {...props}
          ref={ref}
          className={classNames(styles.textareaForm, errorMsg && styles.error)}
        />
        {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
      </div>
    );
  }
);
export default TextArea;
