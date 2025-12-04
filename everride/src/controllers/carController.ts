import { Request, Response } from 'express';
import { prisma } from '../prisma.js';



export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany({
      include:{
        brand: true,
        category: true
      }
      /* jeg har udkommenteret select, da jeg nu bruger include (brandId relation)
      select: {
        id: true, // maybe?
        category: true,
        brandId: true, // brand eller brandId skal bruge include
        model: true,
        year: true,
        price: true,
        fueltype: true
      }, */
      /* orderBy: {
        id: 'asc'
      } */
    })
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af biler`)
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id has no value' });
  }

  try {
    const data = await prisma.car.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        model: true,
        brand: {
          select: {
            name: true
          }
        },
      }
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error); // Failed request log
    res.status(500).json({ error: 'Failed to fetch car' });
  }
};


export const createRecord = async (req: Request, res: Response) => {
  const { categoryId, brandId, model, year, price, fueltypeId } = req.body;

  if (!categoryId || !brandId || !model || !year || !price || !fueltypeId) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.car.create({
      data: {
        categoryId: Number(categoryId),
        brandId: Number(brandId), // brandId: Number(brandId) // relation i stedet for brand
        model,
        year: Number(year),
        price: Number(price),
        fueltypeId: Number(fueltypeId)
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
  const { categoryId, brandId, model, year, price, fueltypeId } = req.body // Deconstruerer form body objektet

  if(!id) {
    return res.status(400).json({ error: 'Id skal have en gyldig værdi' });
  }

  if(!categoryId || !brandId || !model || !year || !price || !fueltypeId) {
    return res.status(400).json({ error: 'Alle felter skal udfyldes' });
  }

  try {
    const data = await prisma.car.update({
      where: { id },
      data: {
        categoryId: Number(categoryId),
        brandId: Number(brandId), // brandId: Number(brandId) // relation i stedet for brand
        model,
        year: Number(year),
        price: Number(price),
        fueltypeId: Number(fueltypeId)
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
    await prisma.car.delete({
      where: { id },
    });

    res.status(200).json({ message: `Bil nr. ${id} er slettet` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Kunne ikke slette bilen' });
  }
};