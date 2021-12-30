import prismaClient from "../prisma";

export default class CreateTopicService {
  async execute(name: string, description: string, user_id: string) {
    const findUser = await prismaClient.users.findFirst({
      where: { id: user_id },
    });

    if (!findUser) throw new Error("Usuário não encontrado");

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
