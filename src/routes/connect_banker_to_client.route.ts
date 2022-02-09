import express from 'express';
import { Banker } from '../entities/Banker';
import { Client } from '../entities/Client';
import { bankRouter } from './banker.route';

const router = express.Router()

router.post('/api/banker/:bankerId/client/:clientId', async (req, res)=>{

  const {
    clientId,
    bankerId
  } = req.params

  const client = await Client.findOne(parseInt(clientId))
  const banker = await Banker.findOne(parseInt(bankerId))

  if(!client || !banker) {
    return res.json({
      message: "client or banker not found"
    })
  } 
 
    banker.clients = [
      client
    ]

   await banker.save();
 
  return res.json({
    message: "banker and client connected"
  })

 })

export {
  router as connectBankerToClient
}