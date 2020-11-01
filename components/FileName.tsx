import { setMaxListeners } from 'process';
import React from 'react';
import styles from './FileName.module.scss';

const FileName = ({ filename }: { filename: string }) => (
  <span className={styles.fileName}>{filename}</span>
);

export default FileName;
