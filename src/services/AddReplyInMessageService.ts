import prismaClient from "../prisma";

export default class AddReplyInMessageService {
  async execute(user_id: string, message_id: string) {
    const message = await prismaClient.messages.update({
      where: { id: message_id },
      data: {
        replies: {
          increment: 1,
        },
      },
      include: {
        user: true,
      },
    });

    return message;
  }
}
