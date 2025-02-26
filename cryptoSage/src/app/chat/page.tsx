import { AI } from "@/app/action";
import { Chat } from "@/components/llm/chat";
import { AICrypto } from "./action-crypto";

const Home = () => {
  return (
    <AICrypto>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Chat />
      </main>
    </AICrypto>
  );
}
export default Home;