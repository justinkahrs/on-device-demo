import { ChatProvider } from "../context/ChatContext";
import { PhoneContainer } from "../components/PhoneContainer/PhoneContainer";
import styles from "./styles.module.css";
import { Header } from "@/components/Header/Header";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appWrap}>
      <ChatProvider>
        <PhoneContainer>
          <Header />
          {children}
        </PhoneContainer>
      </ChatProvider>
    </div>
  );
}
