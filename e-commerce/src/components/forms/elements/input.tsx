import { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  classNameComponent?: string;
  inputType?: 'text' | 'date' | 'password';
  title: string;
  placeholder?: string;
  isRequared: boolean;
  className?: string;
  errorMessage?: string;
  style?: CSSProperties;
  registerObject: UseFormRegisterReturn;
};

function Input({
  id,
  classNameComponent,
  inputType = 'text',
  title,
  placeholder,
  isRequared,
  className = 'input-text',
  errorMessage,
  style,
  registerObject,
}: Props) {
  return (
    <div className={classNameComponent}>
      <label htmlFor={id}>
        {title}
        {isRequared && '*'}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={`${className} ${
            errorMessage ? 'error-background-input' : ''
          }`}
          style={style}
          {...registerObject}
        />
        {errorMessage && <div className="input-error">{errorMessage}</div>}
      </label>
    </div>
  );
}

export default Input;
