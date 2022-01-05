import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransferMoneyUseCase } from "./TransferMoneyUseCase";



class TransferMoneyController {

 async handle(request: Request, response: Response): Promise<Response> {
  const sender_id = request.user.id;
  const { user_id } = request.params;
  const { amount, description } = request.body;

  const transferMoneyUseCase = container.resolve(TransferMoneyUseCase);

  const transfer = await transferMoneyUseCase.execute({
   sender_id,
   user_id,
   amount,
   description
  })

  return response.json(transfer)
 }
}
export { TransferMoneyController }
