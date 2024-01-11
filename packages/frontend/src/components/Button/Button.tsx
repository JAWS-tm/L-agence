import styles from './styles.module.scss';
import classNames from 'classnames';
import Lotties from '../Lotties/Lotties';

type Props = {
  value: string;
  type: 'primary' | 'secondary';
  actionType?: 'button' | 'submit';
  loading?: boolean;
  onClick?: () => void;
};

function Button(props: Props) {
  return (
    <button
      type={props.actionType ?? 'button'}
      onClick={!props.loading ? props.onClick : undefined}
      className={classNames(
        props.type === 'primary' ? styles.primary : styles.secondary,
        styles.button
      )}>
      <p style={props.loading ? { opacity: 0 } : { opacity: 1 }}>
        {props.value}
      </p>
      {props.loading && (
        <div className={styles.loading}>
          <Lotties type="loading" width="45px" />
        </div>
      )}
    </button>
  );
}

export default Button;
