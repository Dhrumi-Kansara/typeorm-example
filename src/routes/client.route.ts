import express from 'express';
import { Client } from '../entities/Client';
import { QueryBuilder } from 'typeorm';
const router = express.Router()

router.post('/api/client', async (req, res)=>{

  const {
    firstName,
    lastName,
    email,
    cardNumber,
    balance
  } = req.body

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  })

  await client.save();

  return res.json(client);

 })

 router.delete('/api/client/:clientId', async (req, res)=>{

  const {clientId} = req.params

  const client = await Client.findOne(parseInt(clientId)) 

  await Client.delete(parseInt(clientId));

  if(!client) {
    return res.json({
      message: "client not found"
    })
  } 
 
  return res.json({
    message: "client deleted"
  });
 })

 router.get('/api/client', async (req, res)=>{
 
  const client = await Client.find()
 
  return res.json({
    data: client
  });
 })

 
 router.get('/api/client/:clientId', async (req, res)=>{

  const {clientId} = req.params;
 
  const client = await Client.createQueryBuilder()
  .select('client')
  .from(Client, 'client')
  .where('client.id=:clientId', {clientId: clientId})
  .getOne()
 
  return res.json({
    data: client
  });
 })

export {
  router as clientRouter
}