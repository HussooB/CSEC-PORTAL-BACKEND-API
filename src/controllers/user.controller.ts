import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    try {
        res.send("Creating user");
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
