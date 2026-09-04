import ThankYouClient from "./ThankYouClient";
import "./ThankYouPage.css";

export const metadata = {
  title: 'Payment Successful | Welcome to AURUM GOLD EA',
  description: 'Thank you for purchasing AURUM GOLD EA. Your lifetime license is confirmed and your automated gold trading journey begins now.',
};

export default function ThankYouPage() {
  return (
    <main className="ty-page">
      <div className="container ty-page__container">
        <ThankYouClient />
      </div>
    </main>
  );
}
