import React from 'react';
import { Input } from './components/forms/Input';
import { Checkbox } from './components/forms/Checkbox';
import { Radio } from './components/forms/Radio';
import { Select } from './components/forms/Select';
import { Switch } from './components/forms/Switch';
import { Textarea } from './components/forms/Textarea';
import { FormGroup } from './components/forms/FormGroup';

const App = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('');
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [textareaValue, setTextareaValue] = React.useState('');

  const handleInputChange = (value) => setInputValue(value);
  const handleCheckboxChange = (checked) => setCheckboxChecked(checked);
  const handleRadioChange = (value) => setRadioValue(value);
  const handleSelectChange = (value) => setSelectValue(value);
  const handleSwitchChange = (checked) => setSwitchChecked(checked);
  const handleTextareaChange = (value) => setTextareaValue(value);

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="app">
      <FormGroup label="Input">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
      </FormGroup>
      <FormGroup label="Checkbox">
        <Checkbox
          checked={checkboxChecked}
          onChange={handleCheckboxChange}
          label="Check me"
        />
      </FormGroup>
      <FormGroup label="Radio">
        <Radio
          name="radioGroup"
          value="radio1"
          checked={radioValue === 'radio1'}
          onChange={handleRadioChange}
          label="Radio 1"
        />
        <Radio
          name="radioGroup"
          value="radio2"
          checked={radioValue === 'radio2'}
          onChange={handleRadioChange}
          label="Radio 2"
        />
      </FormGroup>
      <FormGroup label="Select">
        <Select
          options={options}
          value={selectValue}
          onChange={handleSelectChange}
          placeholder="Select an option"
        />
      </FormGroup>
      <FormGroup label="Switch">
        <Switch
          checked={switchChecked}
          onChange={handleSwitchChange}
          label="Toggle me"
        />
      </FormGroup>
      <FormGroup label="Textarea">
        <Textarea
          value={textareaValue}
          onChange={handleTextareaChange}
          placeholder="Enter multi-line text"
        />
      </FormGroup>
    </div>
  );
};

export default App;