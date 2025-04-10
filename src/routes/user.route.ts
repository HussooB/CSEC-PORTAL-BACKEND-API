import { Router } from "express";
import {
    createUserAsPresident,
    getUser,
    updateUser,
    deleteUser,
    listUsers,
} from "../controllers/user.controller";
const userRoute = Router();

userRoute.get("/all", listUsers);
userRoute.get("/:id", getUser);
userRoute.post("/register", createUserAsPresident);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);

export default userRoute;
