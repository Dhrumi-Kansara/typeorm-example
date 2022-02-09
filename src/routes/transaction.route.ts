import express from 'express';
import { Client } from '../entities/Client';
import { Transaction, TransactionTypes } from '../entities/Transacton';
const router = express.Router()

router.post('/api/client/:clientId/transaction', async (req, res)=>{

  const clientId = req.params.clientId

  const {
     type,
     amount
  } = req.body

 
  /* validation */
  if(![TransactionTypes.WITHDRAW, TransactionTypes.DEPOSIT].includes(type)) {
    return res.json({
      message: "invalid transaction type"
    })
  } 
  const client = await Client.findOne(parseInt(clientId))

  if(!client) {
    return res.json({
      message: "client not found"
    })
  } 

  if(type===TransactionTypes.WITHDRAW && amount>client.balance) {
    return res.json({
      message: "Insufficent Balance"
    })
  }

  if(type===TransactionTypes.DEPOSIT && amount<=0) {
    return res.json({
      message: "Invalid Amount"
    })
  }

  /* create transaction */ 
  const transaction = Transaction.create({
    type,
    amount,
    client
  })

  await transaction.save();

  /* update client balance */  
 


  if(type===TransactionTypes.WITHDRAW) {
    client.balance=client.balance-parseFloat(amount)
  } else if(type===TransactionTypes.DEPOSIT) {
    client.balance=client.balance+parseFloat(amount)
  } 

  await client.save();

  return res.json({
    message: "Transaction Saved",
    data: transaction
  });

 })

export {
  router as transactionRouter
}