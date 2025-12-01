import { Request, Response } from "express";
import { prisma } from "../prisma.js";

/* export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany({
      select: {
        // testing
        PassengerCar: true,
        Van: true,
        Truck: true
      }
    })
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af kategorier`)
  }
}; */




// samme som brandController
export const getCarsByCategory = async (req: Request, res: Response) => {
  try {
    // Fetch all cars from DB
    const cars = await prisma.car.findMany();

    // Group cars by brand
    const grouped = cars.reduce((acc, car) => {
      if (!acc[car.category]) {
        acc[car.category] = [];
      }
      acc[car.category].push(car);
      return acc;
    }, {});

    res.json(grouped);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};