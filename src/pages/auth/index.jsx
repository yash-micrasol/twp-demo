import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/auth/slice';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/main_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isProtected, setIsProtected] = useState(true);

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
      setIsLoading(true);
      dispatch(loginUser(val)).then((e) => {
        if (e.type === "loginUser/fulfilled") {
          navigate("/");
          setIsLoading(false);
        }
      });
      resetForm({});
    },
  });

  const { values, touched, errors, handleBlur, setFieldValue, handleSubmit } =
    formik;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <img src={logo} alt="Logo" className="w-[80%] mx-auto" />
      <div className="mx-4 space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="relative block">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute w-6 h-6 transform -translate-y-1/2 pointer-events-none top-1/2 left-3"
            />
            <Input
              id="email"
              type="text"
              name="email"
              value={values.email}
              onChange={(e) => {
                setFieldValue("email", e.target.value);
              }}
              onBlur={handleBlur}
              placeholder="Email"
              className="w-full py-3 pl-12 border rounded outline-none"
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
              className="absolute w-6 h-6 transform -translate-y-1/2 pointer-events-none top-1/2 left-3"
            />
            <Input
              id="password"
              type={isProtected ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={(e) => {
                setFieldValue("password", e.target.value);
              }}
              onBlur={handleBlur}
              placeholder="Password"
              className="w-full px-12 py-3 border rounded outline-none"
            />
            <FontAwesomeIcon
              icon={isProtected ? faEye : faEyeSlash}
              onClick={() => {
                setIsProtected(!isProtected);
              }}
              className="absolute w-6 h-6 transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
            />
          </label>
          {errors.password && touched.password && (
            <p className="text-redColor text-start">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white rounded bg-blue"
        >
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default Auth;
