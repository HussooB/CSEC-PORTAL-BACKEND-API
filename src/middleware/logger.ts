import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(
            "S--------------------------------------------------------------------------------"
        );
        console.log(
            `[${new Date().toISOString()}] ${req.method} request for '${
                req.url
            }'`
        );
        console.log(`Status: ${res.statusCode}`);
        console.log(`Duration: ${duration}ms`);
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Query: ${JSON.stringify(req.query)}`);
        console.log(
            "E--------------------------------------------------------------------------------"
        );
    });

    next();
};

export default logger;
