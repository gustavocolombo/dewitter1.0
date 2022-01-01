import prismaClient from "../prisma";
import AppError from "../shared/errors/AppError";

export default class AddLikeInMessageService {
  async execute(message_id: string, user_id: string) {
    const user = await prismaClient.users.findFirst({
      where: { id: user_id },
    });

    if (!user) throw new AppError('Usuário não encontrado', 404);

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
