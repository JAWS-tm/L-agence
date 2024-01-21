import { forwardRef, useId, useState } from 'react';
import styles from './FileInput.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (file: File) => void;
  placeholder?: string;
  extensions?: string[];
  errorMsg?: string;
};

const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, placeholder, extensions, errorMsg, ...props }, ref) => {
    const id = useId();
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null) return;

      const fileUploaded = event.target.files[0];
      setFile(fileUploaded);

      onChange && onChange(fileUploaded);
    };

    const extensionsDescription = extensions
      ? extensions.reduce((acc, str, i, arr) => {
          if (str[0] === '.') str = str.slice(1);

          if (i === 0) return str.toUpperCase();
          if (i === arr.length - 1) return acc + ' ou ' + str.toUpperCase();
          return acc + ', ' + str.toUpperCase();
        }, '')
      : 'Tous les formats';

    return (
      <div className={styles.container}>
        <input
          ref={ref}
          type="file"
          id={id}
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={id} className={errorMsg && styles.error}>
          <div className={styles.fileIcon}>
            {file ? (
              <i className="fa-regular fa-file" />
            ) : (
              <i className="fa-solid fa-upload"></i>
            )}
          </div>

          <div className={styles.textContainer}>
            {file ? (
              <>
                <p>{file.name}</p>
                <p className={styles.secondaryText}>
                  {/* Show file size pretty printed */}
                  {file.size > 1000000
                    ? `${Math.round(file.size / 1000000)} MB`
                    : `${Math.round(file.size / 1000)} KB`}
                </p>
              </>
            ) : (
              <>
                <p>{placeholder}</p>
                <p className={styles.secondaryText}>{extensionsDescription}</p>
              </>
            )}
          </div>
        </label>
        {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
      </div>
    );
  }
);

export default FileInput;
