import React, { useState, useEffect } from 'react';
import SettingsLayout from '../../settings/Settings';
import PreviewForm from './Preview';
import { useSelector, useDispatch } from 'react-redux';
import { addField, fetchFields } from '../../../../redux/slice/LeadFormSlice';

// Form Builder component with preview
const FormBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [formTitle, setFormTitle] = useState('Lead Generation Form');
  const dispatch = useDispatch();
  const { field, loading, error } = useSelector((state) => state.fields);

  useEffect(() => {
    dispatch(fetchFields());
  }, [dispatch]);

  // Initial state for form configuration
  const [formConfig, setFormConfig] = useState({
    field: field?.formfields || [], // Default to an empty array if field is undefined
    formStyle: {
      containerClass: ''
    },
    buttonStyle: {
      text: 'Submit',
      class: ''
    }
  });

  useEffect(() => {
    // Update formConfig when fields are fetched
    if (field?.formfields) {
      setFormConfig((prevConfig) => ({
        ...prevConfig,
        field: field.formfields
      }));
    }
  }, [field]);

  console.log(formConfig.field);

  // Field types available for adding
  const availableFieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email Input' },
    { value: 'tel', label: 'Phone Input' },
    { value: 'select', label: 'Dropdown' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'date', label: 'Date Picker' },
    { value: 'checkbox', label: 'Checkbox' }
  ];

  // New field template
  const [newField, setNewField] = useState({
    field_name: '',
    field_type: 'text',
    is_required: false,
    options: [{ value: 'option1', label: 'Option 1' }]
  });

  const handleAddField = () => {
    if (!newField.field_name) return;

    const updatedOptions = newField.field_type === 'select' ? newField.options : [];

    dispatch(addField({
      field_name: newField.field_name,
      field_type: newField.field_type,
      is_required: newField.is_required,
      options: updatedOptions
    }));

    // Reset the form for the new field after dispatch
    setNewField({
      field_name: '',
      field_type: 'text',
      is_required: false,
      options: [{ value: 'option1', label: 'Option 1' }]
    });
  };

  // Add option to dropdown/select field
  const handleAddOption = () => {
    const updatedOptions = [
      ...newField.options,
      { value: `option${newField.options.length + 1}`, label: `Option ${newField.options.length + 1}` }
    ];

    setNewField({
      ...newField,
      options: updatedOptions
    });
  };

  // Update option in dropdown/select field
  const handleUpdateOption = (index, key, value) => {
    const updatedOptions = [...newField.options];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [key]: value
    };

    setNewField({
      ...newField,
      options: updatedOptions
    });
  };

  // Remove option from dropdown/select field
  const handleRemoveOption = (index) => {
    setNewField({
      ...newField,
      options: newField.options.filter((_, i) => i !== index)
    });
  };

  // Handle updating button text
  const handleButtonTextChange = (text) => {
    setFormConfig({
      ...formConfig,
      buttonStyle: {
        ...formConfig.buttonStyle,
        text
      }
    });
  };

  return (
    <SettingsLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Form Builder</h1>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'builder' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('builder')}
          >
            Builder
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>

        {activeTab === 'builder' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: Form builder options */}
            <div className="space-y-6">
              {/* Form title */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-3">Form Settings</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Text</label>
                    <input
                      type="text"
                      value={formConfig.buttonStyle.text || 'Submit'}
                      onChange={(e) => handleButtonTextChange(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* New field form */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-3">Add New Field</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Label</label>
                    <input
                      type="text"
                      value={newField.field_name}
                      onChange={(e) => setNewField({ ...newField, field_name: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Job Title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                    <select
                      value={newField.field_type}
                      onChange={(e) => setNewField({ ...newField, field_type: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {availableFieldTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="required-field"
                      checked={newField.is_required}
                      onChange={(e) => setNewField({ ...newField, is_required: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="required-field" className="ml-2 text-sm text-gray-700">
                      Required Field
                    </label>
                  </div>

                  {/* Options for select/dropdown fields */}
                  {newField.field_type === 'select' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Options</label>

                      {newField.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={option.label}
                            onChange={(e) => handleUpdateOption(index, 'label', e.target.value)}
                            placeholder="Option label"
                            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={option.value}
                            onChange={(e) => handleUpdateOption(index, 'value', e.target.value)}
                            placeholder="Option value"
                            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(index)}
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={handleAddOption}
                        className="text-blue-500 text-sm"
                      >
                        Add Option
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleAddField}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Add Field
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: Form preview */}
            <PreviewForm formTitle={formTitle} formConfig={formConfig} isPreview={true} />
          </div>
        ) : (
          <PreviewForm formTitle={formTitle} formConfig={formConfig} isPreview={true} />
        )}
      </div>
    </SettingsLayout>
  );
};

export default FormBuilder;
