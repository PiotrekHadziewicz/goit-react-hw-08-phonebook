import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRequestStatus } from 'store/Auth/selectors';
import { createUser } from 'store/Auth/actions';
import { Link } from 'react-router-dom';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  RegistrationFormContainer,
} from './RegistrationForm.styles';

const formValidate = (values) => {
  if (values.firstname.length < 3) {
    return false;
  }

  if (!values.email.includes('@')) {
    return false;
  }

  if (values.password.length < 7) {
    return false;
  }

  return true;
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const userRequestStatus = useSelector(selectUserRequestStatus);

  const inputRef = useRef();
  const firstNameId = useRef(nanoid());
  const emailId = useRef(nanoid());
  const passwordId = useRef(nanoid());

  const [formValues, setFormValues] = useState({
    firstname: '',
    email: '',
    password: '',
  });
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, firstname } = formValues;
    dispatch(
      createUser({
        name: `${firstname}`,
        email,
        password,
      }),
    );
  };

  const handleInputValueChange = (event) => {
    setFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const isSubmitButtonEnabled = formValidate(formValues);

  return (
    <RegistrationFormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor={firstNameId.current}>Name:</label>
        <StyledInput
          ref={inputRef}
          id={firstNameId.current}
          name="firstname"
          placeholder="Name"
          value={formValues.firstname}
          onChange={handleInputValueChange}
        />

        <label htmlFor={emailId.current}>Email address:</label>
        <StyledInput
          id={emailId.current}
          name="email"
          placeholder="Email address"
          value={formValues.email}
          type="email"
          onChange={handleInputValueChange}
        />

        <label htmlFor={passwordId.current}>Password:</label>
        <StyledInput
          id={passwordId.current}
          name="password"
          placeholder="Password"
          type="password"
          value={formValues.password}
          onChange={handleInputValueChange}
        />

        <Link to="/login">Already have account? Sign In</Link>

        <SubmitButton
          type="submit"
          appearance="primary"
          disabled={!isSubmitButtonEnabled || userRequestStatus === 'fetching'}
        >
          Submit
        </SubmitButton>
      </StyledForm>
    </RegistrationFormContainer>
  );
};

export default RegistrationForm;