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
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: success,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } else if (warning) {
      Swal.fire({
        icon: 'warning',
        title: 'Perhatian',
        text: warning,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });
    }
  }, [success, error, warning]);

  return null;
}
