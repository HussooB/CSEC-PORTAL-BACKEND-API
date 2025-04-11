import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<void> => {
    res.send("Logging in");
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.send("Logging out");
};
