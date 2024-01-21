import styles from './styles.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
};

const InfoCardLayout = (props: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>{props.title}</div>
        {props.children}
      </div>
    </div>
  );
};

export default InfoCardLayout;
