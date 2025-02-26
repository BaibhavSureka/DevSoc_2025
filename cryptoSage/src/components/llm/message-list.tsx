import { Separator } from "@/components/ui/separator";
import { UIState } from "@/app/action";

export interface ChatList {
  messages: UIState;
}

export function MessageList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 flex flex-col gap-2 text-white">
      {messages.map((message, index) => (
        <div key={message.id} className="text-white">
          <p className="text-white">{message.display}</p>
          {index < messages.length - 1 && <Separator className="my-4 border-gray-600" />}
        </div>
      ))}
    </div>
  );
}
