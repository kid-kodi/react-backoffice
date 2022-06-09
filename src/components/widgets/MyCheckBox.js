import { useField } from "formik";

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="mb-3 flex items-center justify-center">
      <div className="space-x-4 w-full block mb-2 font-medium text-gray-900 dark:text-gray-300">
        <input type="checkbox" {...field} {...props} />
        <label>{children}</label>
      </div>
      <div className="flex items-center px-4 w-full">
        {meta.touched && meta.error ? (
          <div className="mt-2 text-sm text-red-500">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MyCheckbox;
