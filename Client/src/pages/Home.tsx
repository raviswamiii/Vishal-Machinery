import { AchievementPage } from "../components/AchievementPage.tsx";
import { Hero } from "../components/Hero.tsx";
import { OurMachines } from "../components/OurMachines.tsx";
import { WhyChooseUs } from "../components/WhyChooseUs.tsx";

export const Home = () => {
  return (
    <>
      <Hero />
      <OurMachines />
      <WhyChooseUs />
      <AchievementPage />
    </>
  );
};
