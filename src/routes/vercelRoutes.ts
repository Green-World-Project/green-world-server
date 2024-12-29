import express, { Request, Response } from 'express';

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Server is running on vercel...");
});

export default router;
