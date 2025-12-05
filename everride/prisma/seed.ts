import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma';

// Asynkron main-funktion som kører vores seed-data
const main = async () => {
 
  // Sletter eksisterende data i bruger tabellen
  await prisma.user.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.category.deleteMany()
  await prisma.fueltype.deleteMany()



  // Opretter en testbruger i databasen
  const user = await prisma.user.create({
    data: {
      firstname: "Test", 
      lastname: "Bruger", 
      email: "test@example.com", // Login-email
      password: await bcrypt.hash('password', 10), // Password hash 
      role: "USER", // Bruger rolle
      isActive: true // Brugeren er aktiv og må logge ind
    }
  });
  // Udskriver i terminalen at brugeren er oprettet
  console.log("Seed completed for users:", user);


  // Opretter mange brands i databasen
const brands = await prisma.brand.createMany({
  data: [
    { name: "Volvo",
      logoUrl: "volvo.png"
     },
    { name: "Mazda",
      logoUrl: "mazda.png"
     },
    { name: "Honda",
      logoUrl: "honda.png"
     }, 
    { name: "BMW",
      logoUrl: "bmw.png"
     }, 
    { name: "Ellert",
      logoUrl: "ellert.png"
     }
  ]
});
// Udskriver i terminalen at brands er oprettet
console.log("Seed completed for brands:", brands);

// Opretter mange kategorier i databasen
const categories = await prisma.category.createMany({
  data: [
    { name: "Truck" }, 
    { name: "Van" },
    { name: "Sedan" },
    { name: "Station car" },
    { name: "Spand" }
   ]
});
// Udskriver i terminalen at kategorier er oprettet
console.log("Seed completed for categories:", categories);

// Opretter mange drivmidler i databasen
const fueltypes = await prisma.fueltype.createMany({
  data: [
    { name: "Benzin" }, 
    { name: "Diesel" },
    { name: "Hybrid" }, 
    { name: "Electricity" }, 
    { name: "Coffee" } 
   ]
});
// Udskriver i terminalen at drivmidler er oprettet
console.log("Seed completed for fueltypes:", fueltypes);


}



// Kør main-funktionen
main()
  .then(() => prisma.$disconnect()) // Lukker db forbindelsen når alt er ok
  .catch((e) => {
    console.error(e); 
    prisma.$disconnect();
    process.exit(1);
  });





  
/* const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


// Opretter mange drivmidler i databasen
const cars = await prisma.car.createMany({
  data: [
    { categoryId: randomBetween(1, 5),
      brandId: randomBetween(1, 5),
      model: "FH16",
      year: 2020,
      price: 150000,
      fueltypeId: randomBetween(1, 5)
     } 
   ]
});
// Udskriver i terminalen at cars er oprettet
console.log("Seed completed for cars:", cars); */