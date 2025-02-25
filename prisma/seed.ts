import { prisma } from "@/prisma";

async function seed(){
    await prisma.user.createMany({
        data: [
            {
                name: "John Doe",
                email: "snow@gmail",

            },
            {
                name: "John tue",
                email: "Tutu@gmail",
            },
        ],
    })
}

seed().then(() => {
    console.log("Database seed")
    prisma.$disconnect()
})