'use client';

import styles from './StarToggle.module.scss';

interface Props {
  active: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
  title?: string;
}

export default function StarToggle({
  active,
  onToggle,
  size = 40,
  className = '',
  title,
}: Props) {
  const fullClassName = `${styles.star} ${!active ? styles.inactive : ''} ${className}`.trim();

  return (
    <button
      className={fullClassName}
      style={{ fontSize: `${size}px` }}
      onClick={onToggle}
      aria-label={title || (active ? 'Удалить из избранного' : 'Добавить в избранное')}
      title={title}
    >
      {active ? '★' : '☆'}
    </button>
  );
}
