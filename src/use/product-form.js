import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export function useProductForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      count: 1,
      price: 0
    }
  });
  const { value: title, errorMessage: titleError, handleBlur: titleBlur } = useField(
    'title',
    yup
      .string()
      .trim()
      .required('Введите название продукта')
  );
  const { value: img, errorMessage: imgError, handleBlur: imgBlur } = useField(
    'img',
    yup
      .string()
      .trim()
      .required('Введите путь до изображения')
  );
  const { value: price, errorMessage: priceError, handleBlur: priceBlur } = useField(
    'price',
    yup
      .string()
      .trim()
      .required('Введите цену продукта')
  );
  const { value: count, errorMessage: countError, handleBlur: countBlur } = useField(
    'count',
    yup
      .number()
      .required('Введите количество продуктов на складе')
      .min(0, 'Количество не может быть меньше 0')
  );
  const { value: category } = useField('category');

  const onSubmit = handleSubmit(fn)

  return {
    title,
    titleError,
    titleBlur,
    img,
    imgError,
    imgBlur,
    price,
    priceError,
    priceBlur,
    count,
    countError,
    countBlur,
    category,
    isSubmitting,
    onSubmit
  }
}
