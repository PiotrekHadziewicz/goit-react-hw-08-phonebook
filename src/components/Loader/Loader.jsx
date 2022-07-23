import styles from './Loader.module.css';
import { Circles } from 'react-loader-spinner';

export const Loader = () => (
  <div className={styles.Loader}>
    <Circles color={'#3f51b5'} height={100} width={100} />
  </div>
);
