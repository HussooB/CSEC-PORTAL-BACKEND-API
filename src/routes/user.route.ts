import { Router } from "express";
import {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    listUsers,
} from "../controllers/user.controller";
const userRoute = Router();

userRoute.get("/all", listUsers);
userRoute.get("/:id", getUser);
userRoute.post("/register", createUser);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);

export default userRoute;
