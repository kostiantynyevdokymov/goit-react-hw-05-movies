import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const searchSchema = Yup.object().shape({
  searchMovie: Yup.string()
    .min(2, 'Very short')
    .max(20, 'Very long')
    .required('Required'),
});

const SearchBox = ({ onSubmit }) => (
  <Formik
    initialValues={{ searchMovie: '' }}
    onSubmit={onSubmit}
    validationSchema={searchSchema}
  >
    {({ errors, touched }) => (
      <Form>
        <Field name="searchMovie">
          {errors.searchMovie && touched.searchMovie ? (
            <div>{errors.searchMovie}</div>
          ) : null}
        </Field>
      </Form>
    )}
  </Formik>
);

export default SearchBox;
SearchBox.propType = {
  onSubmit: PropTypes.func.isRequired,
};
