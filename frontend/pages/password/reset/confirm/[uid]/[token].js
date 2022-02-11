import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { useResetPasswordConfirmMutation } from "slices/authAPI";
import { selectCurrentUser } from "slices/authSlice";
import { Form } from "react-bootstrap";

export default function ResetPasswordConfirm() {
  const user = useSelector(selectCurrentUser);
  if (user) {
    router.push('/')
  }

  // const dispatch = useDispatch()
  const router = useRouter();
  const { uid, token } = router.query;
  
  const [userpasswordresetConfirm, { isSuccess, isLoading, isError, data }] = useResetPasswordConfirmMutation();

  const [resetConfirmationActivationFormData, setResetConfirmationActivationFormData] = useState({
    new_password : '',
    re_new_password : ''
  });

  const{ new_password, re_new_password } = resetConfirmationActivationFormData;

  const handleResetConfirmFormChange = e => {
    setResetConfirmationActivationFormData({
      ...resetConfirmationActivationFormData,
      [e.target.name]: e.target.value
    })
  };

  const handlepasswordresetConfirmActivation = async () => {
    try {
      await userpasswordresetConfirm({ uid, token, new_password, re_new_password })
      // await resendActivationEmail(email).unwrap()
      // .then((payload) => console.log('fulfilled', payload))
      // .catch((error) => console.log('rejected', error))

      if (isSuccess) {
        alert('success')
      }        
      
    } catch (error) {
      console.log(error)
    }
  };

  if (isSuccess) {
    router.push('/')
  }

  return (
    <>
      <div>
        <h4>Reset Password Confirmation</h4>
      </div>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password" 
            name='new_password'
            onChange={handleResetConfirmFormChange}
            value={new_password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm New Password" 
            name='re_new_password'
            onChange={handleResetConfirmFormChange}
            value={re_new_password}
          />
        </Form.Group>


        {isLoading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
        <Button
          variant="primary"
          type="submit"
          onClick={handlepasswordresetConfirmActivation}
        >
          Reset Password
        </Button>
        )}
    </>
  );
}