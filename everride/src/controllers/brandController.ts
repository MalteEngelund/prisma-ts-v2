import { Request, Response } from "express";
import { prisma } from "../prisma.js";






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

