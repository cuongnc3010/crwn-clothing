import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Confirmation password does not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Cannot create user, email already in use');
          break;
        case 'auth/weak-password':
          alert('Password should be at least 6 characters');
          break;
        default:
          console.log(`User creation encoutered an error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className='sign-up-container'>
        <h2>Don't have an account ?</h2>
        <span>Sign Up With Your Email And Password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            inputOptions={{
              type: 'text',
              required: true,
              name: 'displayName',
              value: displayName,
              onChange: handleChange,
            }}
          />

          <FormInput
            label='Email'
            inputOptions={{
              type: 'email',
              required: true,
              name: 'email',
              value: email,
              onChange: handleChange,
            }}
          />

          <FormInput
            label='Password'
            inputOptions={{
              type: 'password',
              required: true,
              name: 'password',
              value: password,
              onChange: handleChange,
            }}
          />

          <FormInput
            label='Confirm Password'
            inputOptions={{
              type: 'password',
              required: true,
              name: 'confirmPassword',
              value: confirmPassword,
              onChange: handleChange,
            }}
          />
          <Button type='submit' buttonType=''>
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};
export default SignUpForm;
