import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createUserAsPresident = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password, division, group } = req.body;

        // Validate input
        if (!email || !password || !division) {
            res.status(400).json({
                success: false,
                error: "Email, password, and division are required.",
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                error: "User with this email already exists.",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            division,
            group: group || "unassigned",
        });
        if (newUser) {
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: newUser,
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Failure to create new user.",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while creating the user.",
            details: error,
        });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        res.send("Fetching user");
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching the user.",
            details: error,
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        res.send("Updating user");
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while updating the user.",
            details: error,
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        res.send("Deleting user");
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while deleting the user.",
            details: error,
        });
    }
};

export const listUsers = async (req: Request, res: Response) => {
    try {
        res.send("Listing users");
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while listing the users.",
            details: error,
        });
    }
};
