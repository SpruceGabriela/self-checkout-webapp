import { notFound } from "next/navigation";

import { getRestaurantsBySlug } from "@/data/get-restauants-by-slug";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{consumptionMethod: string}>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const RestaurantMenuPage = async ({
  params,
  searchParams
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if(!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await getRestaurantsBySlug(slug);

  return (
    <div>{restaurant?.name}</div>
  );
}
 
export default RestaurantMenuPage;