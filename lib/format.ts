const krwFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatKRW(amount: number): string {
  return krwFormatter.format(amount);
}

export function formatDate(isoString: string): string {
  return dateFormatter.format(new Date(isoString));
}

export function formatQuantity(value: number, unit?: string): string {
  if (unit) return `${value}${unit}`;
  return value.toLocaleString("ko-KR");
}
