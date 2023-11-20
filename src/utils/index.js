import * as yup from "yup";

function formatarData(dataString) {
  const data = new Date(dataString);
  const dia = data.getDate().toString().padStart(2, "0");
  const mes = (data.getMonth() + 1).toString().padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
export const makeValidation = async (schema, data, formRef, callback) => {
  formRef.current?.setErrors({});

  try {
    await schema.validate(data, {
      abortEarly: false,
    });
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        if (!error.path || !error.message) {
          return;
        }

        validationErrors[error.path] = error.message;
      });
      formRef.current?.setErrors(validationErrors);
      callback && callback(validationErrors);
    }
    return false;
  }
};

export default formatarData;
