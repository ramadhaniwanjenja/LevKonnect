import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function VerifyAccount() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyUser = async () => {
      const token = searchParams.get('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify?token=${token}`);
        alert(res.data.message);
      } catch (err) {
        alert("Verification failed");
      }
    };
    verifyUser();
  }, []);

  return <div>Verifying your account...</div>;
}

export default VerifyAccount;
