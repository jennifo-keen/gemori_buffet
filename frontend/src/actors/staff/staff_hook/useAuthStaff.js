import { useContext } from 'react';
import { AuthStaffContext } from '../staff_context/AuthStaffContext';

const useAuthStaff = () => useContext(AuthStaffContext);

export default useAuthStaff;