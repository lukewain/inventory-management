import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { CItem, CarouselItems } from "./carousel";
import Link from "next/link";

export function CarouselInfo() {
  return (
    <Carousel className="w-full max-w-xs mx-auto mt-[80px]">
      <CarouselContent>
        {CarouselItems.map((ci: CItem) => (
          <CarouselItem key={ci.header}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold text-center text-white">
                    {ci.content}
                  </span>
                  <Link
                    className="text-xl mt-[70px] bg-white text-black p-2 rounded-md font-bold"
                    href={ci.url}
                  >
                    {ci.buttonContent}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
