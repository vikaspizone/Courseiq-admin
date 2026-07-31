/**
 * FormInput Component.
 * UI component for FormInput.
 */

import React from 'react';
import { useField } from 'formik';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const id = props.id || props.name;

  return (
    <div className="flex flex-col space-y-1.5 mb-4">
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...field}
        {...props}
        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          meta.touched && meta.error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input focus-visible:ring-blue-500'
        }`}
      />
      {meta.touched && meta.error ? (
        <span className="text-[0.8rem] font-medium text-red-500">{meta.error}</span>
      ) : null}
    </div>
  );
};
