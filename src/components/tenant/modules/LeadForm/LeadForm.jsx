import React, { useState } from 'react';
import SettingsLayout from '../../settings/Settings';
import PreviewForm from './Preview';




// Form Builder component with preview
const FormBuilder = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [formTitle, setFormTitle] = useState('Lead Generation Form');
  
  // Initial state for form configuration
  const [formConfig, setFormConfig] = useState({
    customFields: [
      { id: 'inquiry', label: 'Inquiry Type', type: 'select', required: true, 
        options: [
          { value: 'sales', label: 'Sales' },
          { value: 'support', label: 'Support' },
          { value: 'partnership', label: 'Partnership' }
        ]
      }
    ],
    formStyle: {
      containerClass: ''
    },
    buttonStyle: {
      text: 'Submit',
      class: ''
    }
  });
  
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
  
  // Templates for different industries
  
  
  // New field template
  const [newField, setNewField] = useState({
    id: '',
    label: '',
    type: 'text',
    required: false,
    options: [
      { value: 'option1', label: 'Option 1' }
    ]
  });
  
  // Handle adding a new field
  const handleAddField = () => {
    if (!newField.id || !newField.label) return;
    
    setFormConfig({
      ...formConfig,
      customFields: [
        ...formConfig.customFields,
        {
          ...newField,
          id: newField.id.toLowerCase().replace(/\s+/g, '_')
        }
      ]
    });
    
    // Reset new field form
    setNewField({
      id: '',
      label: '',
      type: 'text',
      required: false,
      options: [
        { value: 'option1', label: 'Option 1' }
      ]
    });
  };
  
  // Handle removing a field
  const handleRemoveField = (fieldId) => {
    setFormConfig({
      ...formConfig,
      customFields: formConfig.customFields.filter(field => field.id !== fieldId)
    });
  };
  
  // Handle template selection
  const handleSelectTemplate = (template) => {
    setFormConfig(template.config);
    setFormTitle(`${template.name} Lead Form`);
  };
  
  // Dummy submission handler for preview
  const handlePreviewSubmit = (data) => {
    console.log('Form submitted:', data);
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
  
  // Add option to dropdown/select field
  const handleAddOption = () => {
    setNewField({
      ...newField,
      options: [
        ...newField.options,
        { value: `option${newField.options.length + 1}`, label: `Option ${newField.options.length + 1}` }
      ]
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Form Title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submit Button Text
                  </label>
                  <input
                    type="text"
                    value={formConfig.buttonStyle.text || 'Submit'}
                    onChange={(e) => handleButtonTextChange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Industry templates */}
            
            
            {/* New field form */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-3">Add New Field</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Label
                  </label>
                  <input
                    type="text"
                    value={newField.label}
                    onChange={(e) => setNewField({...newField, label: e.target.value, id: e.target.value.toLowerCase().replace(/\s+/g, '_')})}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Job Title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Field Type
                  </label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({...newField, type: e.target.value})}
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
                    checked={newField.required}
                    onChange={(e) => setNewField({...newField, required: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="required-field" className="ml-2 text-sm text-gray-700">
                    Required Field
                  </label>
                </div>
                
                {/* Options for select/dropdown fields */}
                {newField.type === 'select' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    
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
                          placeholder="Value"
                          className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={handleAddField}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column: Current fields */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-3">Form Fields</h2>
            
            <div className="mb-4 p-3 bg-gray-100 rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">Required Fields</h3>
              <div className="space-y-2">
                <div className="p-2 border border-gray-300 rounded bg-white">
                  <span className="font-medium">Full Name</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="p-2 border border-gray-300 rounded bg-white">
                  <span className="font-medium">Email Address</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="p-2 border border-gray-300 rounded bg-white">
                  <span className="font-medium">Contact Number</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
                <div className="p-2 border border-gray-300 rounded bg-white">
                  <span className="font-medium">Location</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium text-gray-700 mb-2">Custom Fields</h3>
            {formConfig.customFields.length === 0 ? (
              <p className="text-gray-500 italic">No custom fields added yet.</p>
            ) : (
              <div className="space-y-2">
                {formConfig.customFields.map((field) => (
                  <div key={field.id} className="p-2 border border-gray-300 rounded bg-white flex justify-between items-center">
                    <div>
                      <span className="font-medium">{field.label}</span>
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                      <div className="text-xs text-gray-500">Type: {field.type}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        // Preview tab
        <div>
          <div className="bg-gray-100 p-4 rounded-md mb-4 text-center text-gray-700">
            This is how your form will appear to users. All fields are disabled in preview mode.
          </div>
          
          <PreviewForm
            tenantConfig={formConfig}
            onSubmit={handlePreviewSubmit}
            formTitle={formTitle}
            isPreview={true}
          />
        </div>
      )}
    </div>
    </SettingsLayout>
  );
};

export default FormBuilder;