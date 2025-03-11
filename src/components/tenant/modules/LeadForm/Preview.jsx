import { useState } from "react";
import SettingsLayout from "../../settings/Settings";


const PreviewForm = ({ 
    tenantConfig = {}, 
    onSubmit, 
    formTitle = "Tenant Form",
    isPreview = false
  }) => {
  
    const requiredFields = [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'contact', label: 'Contact Number', type: 'tel', required: true },
      { id: 'location', label: 'Location', type: 'text', required: true },
    ];
  
  
    const allFields = [...requiredFields, ...(tenantConfig.customFields || [])];
  
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value
      });
      
      // Clear error when field is edited
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    };
  
    // Form validation
    const validateForm = () => {
      if (isPreview) return true; // Skip validation in preview mode
      
      const newErrors = {};
      let isValid = true;
  
      allFields.forEach(field => {
        if (field.required && !formValues[field.id]) {
          newErrors[field.id] = `${field.label} is required`;
          isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && formValues[field.id]) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formValues[field.id])) {
            newErrors[field.id] = 'Please enter a valid email address';
            isValid = false;
          }
        }
        
        // Phone validation
        if (field.type === 'tel' && formValues[field.id]) {
          const phoneRegex = /^\+?[0-9\s\-\(\)]{8,20}$/;
          if (!phoneRegex.test(formValues[field.id])) {
            newErrors[field.id] = 'Please enter a valid phone number';
            isValid = false;
          }
        }
      });
  
      setErrors(newErrors);
      return isValid;
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        onSubmit(formValues);
        // Reset form after submission if needed
        // setFormValues({});
      }
    };
  
    // Render different field types
    const renderField = (field) => {
      const { id, label, type, required, options, placeholder = '' } = field;
      
      switch (type) {
        case 'select':
          return (
            <select
              id={id}
              name={id}
              value={formValues[id] || ''}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required={required}
              disabled={isPreview}
            >
              <option value="">Select {label}</option>
              {options && options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        
        case 'textarea':
          return (
            <textarea
              id={id}
              name={id}
              value={formValues[id] || ''}
              onChange={handleChange}
              placeholder={isPreview ? `Example ${label.toLowerCase()}` : placeholder}
              rows={4}
              className={`w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required={required}
              disabled={isPreview}
            />
          );
        
        case 'date':
          return (
            <input
              type="date"
              id={id}
              name={id}
              value={formValues[id] || ''}
              onChange={handleChange}
              className={`w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required={required}
              disabled={isPreview}
            />
          );
          
        case 'checkbox':
          return (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={id}
                name={id}
                checked={formValues[id] || false}
                onChange={(e) => handleChange({
                  target: {
                    name: id,
                    value: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isPreview}
              />
              <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                {label}
              </label>
            </div>
          );
        
        default:
          return (
            <input
              type={type}
              id={id}
              name={id}
              value={formValues[id] || ''}
              onChange={handleChange}
              placeholder={isPreview ? `Example ${label.toLowerCase()}` : placeholder}
              className={`w-full rounded-md border ${errors[id] ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required={required}
              disabled={isPreview}
            />
          );
      }
    };
  
    // Form appearance customization based on tenant config
    const formStyle = tenantConfig.formStyle || {};
    const buttonStyle = tenantConfig.buttonStyle || {};
  
    return (
        
      <div className={`bg-white rounded-lg shadow-md p-6 mx-auto max-w-2xl ${formStyle.containerClass || ''}`}>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">{formTitle}</h2>
        
        {isPreview && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700 text-center">
            This is a preview. Fields are disabled.
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {allFields.map((field) => (
            <div key={field.id} className="space-y-1">
              {field.type !== 'checkbox' && (
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
              )}
              
              {renderField(field)}
              
              {errors[field.id] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
  
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${buttonStyle.class || ''}`}
              style={buttonStyle.style}
              disabled={isPreview}
            >
              {buttonStyle.text || "Submit"}
            </button>
          </div>
        </form>
      </div>
      
    );
  };

  export default PreviewForm