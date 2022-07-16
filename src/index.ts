import bandRoute from './routes/bandRoute';
import userRoute from './routes/userRoute';
import { app } from './controller/app';

app.use('/user', userRoute);
app.use('/band', bandRoute);