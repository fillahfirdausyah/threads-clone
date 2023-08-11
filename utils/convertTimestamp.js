export const convertTimestamp = (timestamp) => {
  // Waktu saat ini dalam format ISO
  const waktuSaatIni = new Date();

  // Waktu yang akan diubah
  const waktuTarget = new Date(timestamp); // Ganti dengan waktu yang diinginkan

  // Menghitung selisih waktu dalam milidetik
  const selisihWaktu = waktuSaatIni - waktuTarget;

  // Menghitung selisih hari, jam, dan menit
  const selisihHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
  const selisihJam = Math.floor(selisihWaktu / (1000 * 60 * 60));
  const selisihMenit = Math.floor(
    (selisihWaktu % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Menghasilkan teks berdasarkan selisih waktu
  let formatWaktu = '';
  if (selisihHari === 0) {
    if (selisihJam === 0 && selisihMenit === 0) {
      formatWaktu = 'Now';
    } else if (selisihJam === 0) {
      formatWaktu = `${selisihMenit}m`;
    } else {
      formatWaktu = `${selisihJam}h`;
    }
  } else if (selisihHari === 1) {
    formatWaktu = '1d';
  } else {
    formatWaktu = `${selisihHari}d`;
  }

  return formatWaktu;
};
