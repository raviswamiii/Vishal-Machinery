import { AchievementPage } from "../components/AchievementPage.tsx";
import { Hero } from "../components/Hero.tsx";
import { OurMachines } from "../components/OurMachines.tsx";
import { WhyChooseUse } from "../components/WhyChooseUse.tsx";

export const Home = () => {
  return (
    <>
      <Hero />
      <OurMachines />
      <WhyChooseUse />
      <AchievementPage />
    </>
  );
};
