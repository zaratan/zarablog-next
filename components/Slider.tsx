import React from 'react';
import classCompactor from '../helpers/classCompator';
import {
  generateHandleClick,
  generateHandleKeypress,
} from '../helpers/handlers';

import styles from './Slider.module.scss';

const Slider = ({
  active,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  action = () => {},
}: {
  active?: boolean;
  action?: () => void;
}) => (
  <span
    className={styles.container}
    role="button"
    tabIndex={0}
    onClick={generateHandleClick(action)}
    onKeyDown={generateHandleKeypress(action)}
  >
    <span>|</span>
    <span
      className={classCompactor([
        styles.slider,
        active ? styles.right : styles.left,
      ])}
    >
      <span className="pusher">===</span>ø
    </span>
    <span>|</span>
  </span>
);

export default Slider;
