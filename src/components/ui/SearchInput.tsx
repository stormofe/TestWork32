'use client';

import React from 'react';

interface SearchInputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  id,
  label,
  value,
  placeholder,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div className={`form-group ${className || ''}`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
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
