import React from "react";
import Nav from "../../components/nav/Nav";
import { Button } from "@/components/ui/button";
import EmptyLottie from "../../components/LottieComponents/Empty.lottie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AuthGuard from "../../components/guard/Auth.guard";

const HomePage = () => {
  return (
    <AuthGuard>
      <Sheet>
        <div className=" w-screen h-screen bg-[#f4f4f5]">
          <Nav />
          <div className="px-52 mx-auto">
            <div className="flex justify-end">
              <SheetTrigger className="mt-5 border bg-basic text-white px-2 py-3 rounded-lg">
                + Create Contact
              </SheetTrigger>
            </div>
            <div className=" flex-col border bg-white flex justify-center items-center h-[600px] w-full mt-5 rounded">
              <EmptyLottie />
              <p className=" font-semibold text-xl text-gray-500">
                There is no list...
              </p>
            </div>
          </div>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Contact Information</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </div>
      </Sheet>
    </AuthGuard>
  );
};

export default HomePage;
