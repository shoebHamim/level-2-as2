export type TProduct={
  name:string,
  description:string,
  price:number,
  category:string,
  tags:string[],
  variants:object[],
  inventory:{
    quantity:number,
    inStock:boolean
  }
}