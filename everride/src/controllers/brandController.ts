import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.brand.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  try {
    const data = await prisma.brand.findUnique({
      where: {
        id
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error); // Failed request log
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
};



export const createRecord = async (req: Request, res: Response) => {
  const { name, logoUrl} = req.body;

  if (!name || !logoUrl) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.brand.create({
      data: {
        name,
        logoUrl
      }
    });

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};



export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id) // Sikrer at id er et tal
  const { name, logoUrl} = req.body // Deconstruerer form body objektet

  if(!id) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  if(!name || !logoUrl) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.brand.update({
      where: { id },
      data: {
        name,
        logoUrl
      }
    })

    return res.status(201).json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Noget gik galt i serveren' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  try {
    await prisma.brand.delete({
      where: { id },
    });

    res.status(200).json({ message: `Brand nr. ${id} er slettet` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette brand' });
  }
};












// denne sorterer biler efter brand, fra de eksisterende biler
export const getCarsByBrand = async (req: Request, res: Response) => {
  try {
    // Fetch all cars from DB
    const cars = await prisma.car.findMany();

    // Group cars by brand
    const grouped = cars.reduce((acc, car) => {
      if (!acc[car.brand]) {
        acc[car.brand] = [];
      }
      acc[car.brand].push(car);
      return acc;
    }, {});

    res.json(grouped);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



