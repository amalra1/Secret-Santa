import React from 'react';
import styles from './TextInput.module.css';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export default function TextInput({ label, error, ...props }: TextInputProps) {
  const inputClassName = `${styles.input} ${error ? styles.inputError : ''}`;

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={inputClassName} // Usa a classe dinâmica
        {...props}
      />
      {/* 3. Se houver um erro, exibe a mensagem abaixo do input */}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}