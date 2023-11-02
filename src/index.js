import express from 'express'
import cors from 'cors'
import recipesRoutes from './routes/recipes.routes.js'

const app = express()

process.env.TZ = 'UTC';

app.use(express.json())

app.use(cors({
    origin: '*'
}))
app.use('/api', recipesRoutes)


app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
})