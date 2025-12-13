export interface expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export interface budget {
  id: number;
  totalAmount: number;
  month: number;
  year: number;
}