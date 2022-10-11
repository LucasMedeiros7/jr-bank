import express from 'express';
import { accountRoutes } from './routes';

const app = express();
const port = 3333;

app.use(express.json());
app.use(accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
