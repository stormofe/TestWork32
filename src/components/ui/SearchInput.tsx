'use client';

import React from 'react';

interface SearchInputProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  id,
  value,
  placeholder,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div className={`form-group ${className || ''}`}>
      <input
        id={id}
        type="text"
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
