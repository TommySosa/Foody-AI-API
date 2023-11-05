import bcrypt from "bcryptjs"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, genre, birthdate, password } = await req.body

        if (!first_name || !last_name || !email || !genre || !birthdate || !password) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' })
        }

        const emailExist = await prisma.user.findMany({
            where: { email: email }
        })
        if (emailExist.length > 0) {
            return res.status(409).json({ error: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const formattedBirthdate = new Date(birthdate).toISOString();

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                genre,
                birthdate: formattedBirthdate,
                password: hashedPassword
            }
        })

        const {password: _, ...user} = newUser

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}