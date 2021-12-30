import prismaClient from "../prisma";

export default class CreateReplyMessage {
  async execute(message_id: string, user_id: string, message_reply: string) {
    const user = await prismaClient.users.findFirst({
      where: { id: user_id },
    });

    if (!user) throw new Error("Usuário não logado");

    const messages = await prismaClient.messages.findUnique({
      where: { id: message_id },
    });

    const updateMessage = await prismaClient.messages.update({
      where: { id: message_id },
      data: {
        text: {
          set: messages?.text + ' + ' + message_reply,
        },
      },
    });

    return updateMessage;
  }
}
