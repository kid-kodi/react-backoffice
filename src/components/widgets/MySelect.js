import { useField } from "formik";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3 flex items-center justify-center">
      <label
        className="w-full block mb-2 font-medium text-gray-900 dark:text-gray-300"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select {...field} {...props} />
      <div className="flex items-center px-4 w-full">
        {meta.touched && meta.error ? (
          <div className="mt-2 text-sm text-red-500">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MySelect;
