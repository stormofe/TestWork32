'use client';

interface SuggestionListProps {
  items: string[];
  onSelect: (item: string) => void;
  className?: string;
}

export default function SuggestionList({
  items,
  onSelect,
  className,
}: SuggestionListProps) {
  if (items.length === 0) return null;

  return (
    <ul
      className={`list-group position-absolute w-100 shadow-sm ${className || ''}`}
      style={{ zIndex: 1000 }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="list-group-item list-group-item-action"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
