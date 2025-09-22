import classNames from 'classnames';
import { Icon } from '../commons/Icons';

const Select = ({ options, value, onChange, placeholder, className }) => {
  const selectWrapperClass = classNames('select-wrapper position-relative w-100', className);

  return (
    <div className={selectWrapperClass}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className='form-control w-100'
      >
        {/* {placeholder && <option value="">{placeholder}</option>} */}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <Icon name="angles-up-down" className="select-icon" />
    </div>
  );
};

export { Select };
