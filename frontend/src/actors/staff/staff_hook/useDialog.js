import { useContext } from 'react';
import { DialogContext } from '../staff_context/DialogContext';

const useDialog = () => useContext(DialogContext);

export default useDialog;