import { Request, Response } from 'express';
import { documentationService } from '../services/documentationService'

export const getDocumentation = (req: Request, res: Response) => {
    try {
        res.status(200).sendFile(documentationService());
    } catch (error) {
        if (error instanceof Error)
            res.status(404).json({ message: error });
    }
};