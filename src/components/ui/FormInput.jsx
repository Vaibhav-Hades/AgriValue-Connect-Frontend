import { forwardRef } from 'react';

const FormInput = forwardRef(({ label, error, icon: Icon, className = '', ...props }, ref) => (
  <div className="space-y-1.5">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <div className="relative">
      {Icon && <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />}
      <input
        ref={ref}
        className={`input-field ${Icon ? 'pl-10' : ''} ${error ? 'border-red-400 focus:ring-red-400' : ''} ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 flex items-center gap-1">{error}</p>}
  </div>
));

FormInput.displayName = 'FormInput';
export default FormInput;
