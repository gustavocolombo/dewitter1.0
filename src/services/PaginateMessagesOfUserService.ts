import prismaClient from "../prisma";
import AppError from "../shared/errors/AppError";

export default class PaginateMessagesOfUserService {
  async execute(user_id: string) {
    const user = await prismaClient.users.findUnique({
      where: { id: user_id },
    });

    if (!user) throw new AppError("Usuário não encontrado", 404);

    const messagesOfUser = await prismaClient.messages.findMany({
      where: {
        user: {
          id: user_id,
        },
      },
      skip: 0,
      take: 10,
      orderBy: {
        createdAt: "asc",
      },
    });

    return messagesOfUser;
  }
}
