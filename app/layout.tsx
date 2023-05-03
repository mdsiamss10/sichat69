import "./globals.css";

export const metadata = {
  keywords: [
    "siam messeaging app vercel",
    "siam messeaging app",
    "chat application",
    "instant messaging",
    "real-time chat",
    "secure messaging",
    "user-friendly interface",
    "chat with friends",
    "chat with family",
    "chat with colleagues",
    "digital communication",
    "messaging app",
    "stay connected",
    "advanced security",
    "mobile chat app",
    "desktop chat app",
    "best messaging app siam vercel",
    "best messaging app",
  ],
  title:
    "SiChat - The Chat Application That Connects You to the World in Real-Time",
  description:
    "SiChat is a modern chat application built using Next.js 13 and Firebase. With SiChat, you can chat with your friends, family, and colleagues in real-time, all within a beautiful and intuitive interface. The app is fast, secure, and reliable, thanks to the power of Next.js and Firebase. Whether you're looking to stay connected with loved ones or collaborate with teammates, SiChat is the perfect solution. Try it out today and experience the future of chat applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
