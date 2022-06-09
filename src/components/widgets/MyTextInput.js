import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="mb-3 flex items-center justify-center">
      <div className="flex-1">
        <label
          className="w-full block mb-2 font-medium text-gray-900 dark:text-gray-300"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      </div>
      <div className="flex-1">
        <input {...field} {...props} />
      </div>
      <div className="flex-1">
        <div className="flex items-center px-4 w-full">
          {meta.touched && meta.error ? (
            <div className="text-sm text-red-500">{meta.error}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyTextInput;
