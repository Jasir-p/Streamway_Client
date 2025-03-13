import { useState } from "react";
import SettingsLayout from "../../settings/Settings";
import { X } from "lucide-react";


const PreviewForm = ({ 
    formConfig = {}, 
    onSubmit, 
    formTitle = "Tenant Form",
    isPreview = false
  }) => {
  
    const requiredFields = [
      { id: 'name', field_name: 'Full Name', field_type: 'text', is_required: true },
      { id: 'email', field_name: 'Email Address', field_type: 'email', is_required: true },
      { id: 'contact', field_name: 'Contact Number', field_type: 'tel', is_required: true },
      { id: 'location', field_name: 'Location', field_type: 'text', is_required: true },
    ];
  
    console.log(formConfig.field)
    const allFields = [
      ...requiredFields, 
      ...(Array.isArray(formConfig.field) ? formConfig.field : [])
    ];
  
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
  
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };
  
    const renderField = (field) => {
      const { id, field_name, field_type, is_required, options, placeholder = '' } = field;
  
      switch (field_type) {
        case 'select':
          return (
            <select
              id={id}
              name={id}
              value={formValues[id] || ''}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={is_required}
              disabled={isPreview}
            >
              <option value="">Select {field_name}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
  
        case 'checkbox':
          return (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={id}
                name={id}
                checked={formValues[id] || false}
                onChange={(e) => handleChange({ target: { name: id, value: e.target.checked } })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isPreview}
              />
              <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                {field_name}
              </label>
            </div>
          );
  
        default:
          return (
            <input
              type={field_type}
              id={id}
              name={id}
              value={formValues[id] || ''}
              onChange={handleChange}
              placeholder={isPreview ? `Example ${field_name.toLowerCase()}` : placeholder}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={is_required}
              disabled={isPreview}
            />
          );
      }
    };
  
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">{formTitle}</h2>
        <form>
          {allFields.map((field) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.field_name}
              </label>
              {renderField(field)}
              
            </div>

          ))}
  
          {!isPreview ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          ) : (
            <p className="text-gray-500 text-sm text-center">Preview Mode</p>
          )}
        </form>
      </div>
    );
  };
  
  export default PreviewForm;
  