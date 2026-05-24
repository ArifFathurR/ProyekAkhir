import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';

export default function FlashPopup() {
  const { flash } = usePage().props;

  const success = typeof flash.success === 'function' ? flash.success() : flash.success;
  const error = typeof flash.error === 'function' ? flash.error() : flash.error;
  const warning = typeof flash.warning === 'function' ? flash.warning() : flash.warning;

  useEffect(() => {
    if (success) {
      if (warning) {
        Swal.fire({
          icon: 'warning',
          title: 'Perhatian',
          html: `${success}<br><br><span style="color: #d97706; font-weight: 600;">${warning}</span>`,
          confirmButtonColor: '#d97706',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: success,
          confirmButtonColor: '#0ea5e9',
        });
      }
    } else if (warning) {
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: warning,
        confirmButtonColor: '#d97706',
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
  }, [success, error, warning]);

  return null;
}
