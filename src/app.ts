import express, { Application} from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth'

const app: Application = express();
// settings
app.set('port', 8080);

//middlewares
app.use(morgan('dev'));
// Para formatear la data que noe llegue
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);



export default app;