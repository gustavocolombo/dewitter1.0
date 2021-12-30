import prismaClient from "../prisma";

export default class CreateMessageService {
  async execute(text: string, topics_id: string, user_id: string) {
    const message = await prismaClient.messages.create({
      data: {
        text,
        topics_id,
        user_id,
      },
      include: {
        user: true,
      },
    });

    return message;
  }
}
