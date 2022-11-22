import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/auth/slice';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/main_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Please Enter Email"),
      password: Yup.string().required("Please Enter Password"),
    }),
    onSubmit: (val, { resetForm }) => {
      dispatch(loginUser(val)).then(
        (e) => e.type === "loginUser/fulfilled" && navigate("/")
      );
      resetForm({});
    },
  });

  const { values, touched, errors, handleBlur, setFieldValue, handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <img src={logo} alt="Logo" className="w-[80%] mx-auto" />
      <div className="space-y-4 mx-4">
        <div className="space-y-1">
          <label htmlFor="email" className="relative block">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
            />
            <Input
              id="email"
              type="text"
              name="email"
              value={values.email}
              onChange={(e) => {
                setFieldValue('email', e.target.value);
              }}
              onBlur={handleBlur}
              placeholder="Email"
              className="rounded w-full py-3 pl-12 border outline-none"
            />
          </label>
          {errors.email && touched.email && (
            <p className="text-redColor text-start">{errors.email}</p>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="relative block">
            <FontAwesomeIcon
              icon={faLock}
              className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
            />
            <Input
              id="password"
              type="text"
              name="password"
              value={values.password}
              onChange={(e) => {
                setFieldValue('password', e.target.value);
              }}
              onBlur={handleBlur}
              placeholder="Password"
              className="rounded w-full py-3 pl-12 border outline-none"
            />
          </label>
          {errors.password && touched.password && (
            <p className="text-redColor text-start">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="w-full py-3 rounded bg-blue text-white">
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default Auth;
