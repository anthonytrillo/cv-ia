const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

/**
 * Convierte un valor tipo month (YYYY-MM) a formato legible "Mes Año"
 */
export function formatMonthYear(value: string | undefined): string {
  if (!value || value.length < 7) return value ?? '';
  const [year, month] = value.split('-');
  const monthNum = parseInt(month, 10);
  if (Number.isNaN(monthNum) || monthNum < 1 || monthNum > 12) return value;
  return `${MONTHS_ES[monthNum - 1]} ${year}`;
}
