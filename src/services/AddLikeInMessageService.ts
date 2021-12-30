import prismaClient from "../prisma";

export default class AddLikeInMessageService {
  async execute(message_id: string, user_id: string) {
    const user = await prismaClient.users.findFirst({
      where: { id: user_id },
    });

    if (!user) throw new Error("Usuário não logado");

    const updateLikeMessage = await prismaClient.messages.update({
      where: { id: message_id },
      data: {
        likes: {
          increment: 1,
        },
      },
      include: {
        user: true,
      },
    });

    return updateLikeMessage;
  }
}
