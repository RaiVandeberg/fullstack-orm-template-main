import { Request, Response } from "express"
import { prisma } from "@/prisma"

class QuestionsController {
  async index(request: Request, response: Response) {
    
    const questions = await prisma.question.findMany({
      where: {
        title: {
          contains: request.query.title?.toString().trim(),
          mode: "insensitive", //não faz diferença entre maiúsculas e minúsculas
        },
      },
      //ordem alfabetica
      orderBy: {
        title: "asc",
      },
    })
    return response.json(questions)
  }

  async create(request: Request, response: Response) {

    const { title, content, user_id } = request.body

    await prisma.question.create({
      data:{ 
        title,
        content,
        userId: user_id

      },
    })
    return response.status(201).json()
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { title, content } = request.body

    await prisma.question.update({
      data: {
        title,
        content,
      },
      where: {
        id,
      },
    })
    return response.json()
  }

  async remove(request: Request, response: Response) {
    return response.json()
  }
}

export { QuestionsController }
