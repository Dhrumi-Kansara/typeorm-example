import { createConnection } from "typeorm";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transacton";
import { clientRouter } from './routes/client.route';
import { bankRouter } from './routes/banker.route';
import { transactionRouter } from './routes/transaction.route';
import { connectBankerToClient } from './routes/connect_banker_to_client.route';

import express from "express";

const app = express()

const main = async () => {

  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "bank_typeorm_eg",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    })

    console.log('Connected to Postgress')

    app.use(express.json())

    app.use(clientRouter)
    app.use(bankRouter)
    app.use(transactionRouter)
    app.use(connectBankerToClient)

    app.listen(6000, ()=>console.log('server started on port 6000'))

  } catch(e) {
    console.log(e)
  }
  
}

main()