// lib/utils.ts
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('uk-UA').format(date);
  }
  
  // Тут можуть бути інші утилітарні функції