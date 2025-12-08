import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Hero({ data }) {
  // If no data, return nothing
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          
          {/* FIX: Added a wrapper div with 'shrink-0' 
            This forces the box to stay 180px wide and prevents squashing.
          */}
          <div className="relative shrink-0 w-[180px] h-[180px]">
            {data.avatar ? (
              <Image
                src={data.avatar}
                alt={data.fullName || "Profile Picture"}
                fill // fills the 180x180 wrapper
                className="rounded-xl object-cover"
                priority
                sizes="180px"
              />
            ) : (
              // Fallback that looks exactly like the image shape
              <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">
                No Img
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold uppercase">
              {data.fullName || "Your Name"}
            </h1>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {data.longDescription || "No description provided yet."}
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}