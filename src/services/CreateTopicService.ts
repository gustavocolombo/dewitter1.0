import prismaClient from "../prisma";
import AppError from "../shared/errors/AppError";

export default class CreateTopicService {
  async execute(name: string, description: string, user_id: string) {
    const findUser = await prismaClient.users.findFirst({
      where: { id: user_id },
    });

    if (!findUser) throw new AppError("Usuário não encontrado", 404);

    const topic = await prismaClient.topics.create({
      data: {
        name,
        description,
        userId: user_id,
      },
    });

    return topic;
  }
}
