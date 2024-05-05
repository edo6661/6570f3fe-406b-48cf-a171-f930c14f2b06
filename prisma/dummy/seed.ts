const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  const dummyData = [
    {
      firstName: "John",
      lastName: "Doe",
      position: "SALES",
      phone: "1234567890",
      email: "john.doe@example.co.id",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      position: "MARKETING",
      phone: "0987654321",
      email: "jane.smith@example.co.id",
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      position: "IT",
      phone: "5551234567",
      email: "michael.johnson@example.co.id",
    },
    {
      firstName: "Emily",
      lastName: "Brown",
      position: "HR",
      phone: "9876543210",
      email: "emily.brown@example.co.id",
    },
    // ! generate random data
    {
      firstName: "James",
      lastName: "Williams",
      position: "SALES",
      phone: "1234567890",
      email: "james@gmail.co.id",
    },
    {
      firstName: "Mary",
      lastName: "Jones",
      position: "MARKETING",
      phone: "0987654321",
      email: "jones@gmail.co.id",
    },
    {
      firstName: "David",
      lastName: "Davis",
      position: "IT",
      phone: "5551234567",
      email: "davis@gmail.co.id",
    },
  ];

  for (const data of dummyData) {
    await db.data.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        position: data.position,
        phone: data.phone,
        email: data.email,
      },
    });
  }

  console.log("Dummy data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
