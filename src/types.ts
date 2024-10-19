import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type DogContextType = {
  allDogs: Dog[];
  activeTab: TactiveTab;
  isLoading: boolean;
  setActiveTab: (tab: TactiveTab) => void;
  createDog: (dog: Omit<Dog, 'id'>) => Promise<unknown>;
  deleteDog: (dog: Dog) => Promise<unknown>;
  updateDog: (dog: Pick<Dog, 'id' | 'isFavorite'>) => Promise<unknown>;
  dogList: Record<TactiveTab, Dog[]>;
};

export type Dog = z.infer<typeof dogSchema>;

export type TactiveTab = "all" | "favorited" | "unfavorited" | "create";
