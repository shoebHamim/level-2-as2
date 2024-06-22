import cors  from 'cors';
import express, { Application, Request, Response } from "express";
import { productRoute } from './app/modules/product/product.route';
import { orderRoute } from './app/modules/order/order.route';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors())


app.use('/api/products/',productRoute)
app.use('/api/orders/',orderRoute)


app.get("/", (req: Request, res: Response) => {
  res.send("PH level2 assignment 2 server root path!");
});

app.all('/*',(req:Request,res:Response)=>{
  res.json({
    success:false,
    message:"Route not found"

  })
})


export default app;
