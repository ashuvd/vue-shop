import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export function useCategoryForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      amount: 0
    }
  });
  const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Введите название категории')
  );
  const { value: type, errorMessage: typeError, handleBlur: typeBlur } = useField(
    'type',
    yup
      .string()
      .trim()
      .required('Введите тип категории')
  );

  const onSubmit = handleSubmit(fn)

  return {
    title,
    titleError,
    titleBlur,
    type,
    typeError,
    typeBlur,
    isSubmitting,
    onSubmit
  }
}
