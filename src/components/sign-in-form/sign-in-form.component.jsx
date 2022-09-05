import { useState } from 'react';
import { BsGoogle } from 'react-icons/bs';
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for this account');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.log(`Loging in encoutered an error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className='sign-in-container'>
        <h2>Already have an account ?</h2>
        <span>Sign In With Your Email And Password</span>
        <form onSubmit={handleSubmit}>
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
          <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>
            <Button
              type='button'
              buttonType='google'
              onClick={signInWithGoogle}
            >
              Google Sign-In
              <span className='icon-container'>
                <BsGoogle />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignInForm;
