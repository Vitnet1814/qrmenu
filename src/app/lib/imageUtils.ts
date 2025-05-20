export const processImageClient = async (file: File): Promise<File | null> => {
  const MAX_FILE_SIZE = 1024 * 1024; // 1MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  return new Promise((resolve) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.error('Непідтримуваний тип файлу. Дозволені: jpg, jpeg, png.');
      resolve(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      // Попереднє стискання на клієнті (опціонально)
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          const ratio = Math.min(800 / width, 600 / height); // Приблизні розміри для попереднього стискання
          width *= ratio;
          height *= ratio;
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: file.type }));
            } else {
              resolve(null);
            }
          }, file.type, 0.7); // Початкова якість стиснення
        };
        img.onerror = () => resolve(null);
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } else {
      resolve(file); // Файл невеликий, передаємо як є
    }
  });
};