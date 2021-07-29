import { Request, Response } from 'express';

import correios from '../../services/freights/correios';

export default async function store(req: Request, res: Response) {

    const {
        destZipCode,
        height,
        length,
        weight,
        width
    } = req.body;

    const { pac, sedex } = await correios({ destZipCode, height, length, weight, width});

    return res.json({ pac, sedex });
}
