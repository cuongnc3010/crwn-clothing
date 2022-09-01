import { useState } from 'react';
import {
  createUserDocumentFromAuth,
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resp = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(resp);
      resetFormFields();
    } catch (error) {}
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <div className='sign-up-container'>
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
            <Button buttonType='google' onClick={signInWithGoogle}>
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignInForm;
