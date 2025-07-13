import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';

export default function FlashPopup() {
  const { flash } = usePage().props;

  const success = typeof flash.success === 'function' ? flash.success() : flash.success;
  const error = typeof flash.error === 'function' ? flash.error() : flash.error;

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: success,
        confirmButtonColor: '#0ea5e9',
      });
    }

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#ef4444',
      });
    }
  }, [success, error]);

  return null;
}
