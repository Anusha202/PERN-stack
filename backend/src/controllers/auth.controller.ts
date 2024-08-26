import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const profilePic = gender === 'male'
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = await prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                
            },
        });

        if (newUser) {
            generateToken(newUser.id, res)


            res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,

            });
        } else {
            res.status(400).json({ error: "invalid user data" });
        }

    } catch (erro: any) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    // Login logic
};

export const logout = async (req: Request, res: Response) => {
    // Logout logic
};
