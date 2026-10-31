
import HeroSlider from "@/components/home/hero-slider";
import NewArrivals from "@/components/home/new-arrivals";
import HowItWorks from "@/components/home/how-it-works";
import BookCategories from "@/components/home/book-categories";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <BookCategories />
    </>
  );
}
