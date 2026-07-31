/**
 * FormSelect Component.
 * UI component for FormSelect.
 */

import React from 'react';
import { useField } from 'formik';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  const id = props.id || props.name;

  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
        {label}
      </label>
      <select
        id={id}
        {...field}
        {...props}
        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          meta.touched && meta.error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input focus-visible:ring-blue-500'
        }`}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <span className="text-[0.8rem] font-medium text-red-500">{meta.error}</span>
      ) : null}
    </div>
  );
};
