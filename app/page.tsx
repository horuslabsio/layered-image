"use client";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useRef, useState } from "react";
import { FEATURES } from "./images";

export default function Home() {
  const [profile, setProfile] = useState({
    0: "/backgrounds/0.png",
    1: "/facial-variations/0.png",
    2: "/clothes/0.png",
    3: "/eyes/0.png",
    4: "",
    5: "/hairs/0.png",
    6: "/eye-brows/0.png",
    7: "",
    8: "",
  });
  const elementRef = useRef(null);

  const selectImage = (type: number, src: string) => {
    setProfile((prev) => {
      let update = { ...prev };
      switch (type) {
        case 0:
          update[0] = src;
          break;
        case 1:
          update[1] = src;
          break;
        case 2:
          update[2] = src;
          break;
        case 3:
          update[3] = src;
          break;
        case 4:
          update[4] = src;
          break;
        case 5:
          update[5] = src;
          break;
        case 6:
          update[6] = src;
          break;
        case 7:
          update[7] = src;
          break;
        case 8:
          update[8] = src;
          break;
        default:
          break;
      }
      return update;
    });
  };

  const removeFeature = (type: number) => {
    setProfile((prev) => {
      const update = { ...prev };
      switch (type) {
        case 4:
          update[4] = "";
          break;
        case 8:
          update[8] = "";
          break;
        case 7:
          update[7] = "";
          break;
        case 5:
          update[5] = "";
          break;

        default:
          break;
      }
      return update;
    });
  };

  const exportImag = async () => {
    if (!elementRef.current) return;
    try {
      const canvas = await html2canvas(elementRef.current, {
        backgroundColor: null,
      });

      const dataURL = canvas.toDataURL();
      const response = await fetch(dataURL);
      const blob = await response.blob();

      const imgUrl = URL.createObjectURL(blob);
      console.log(imgUrl);

      const imgElement = document.createElement("img");
      imgElement.src = imgUrl;
      document.body.appendChild(imgElement);
    } catch (error) {}
  };
  // const draw = () => {
  //   const canvas = document.getElementById("myCanvas");
  //   if (canvas) {
  //     const ctx = canvas.getContext("2d");

  //     // Load multiple images
  //     const image1 = new Image();
  //     const image2 = new Image();
  //     const image3 = new Image();

  //     // Set the source of the images
  //     image1.src = "/backgrounds/0.png"; // Red background image
  //     image2.src = "https://via.placeholder.com/200/00FF00/FFFFFF?text=Image2"; // Green background image
  //     image3.src = "https://via.placeholder.com/100/0000FF/FFFFFF?text=Image3"; // Blue background image

  //     image1.onload = function () {
  //       // Draw the first image (bottom layer)
  //       ctx.drawImage(image1, 0, 0, 2000, 2000);

  //       image2.onload = function () {
  //         // Draw the second image on top of the first
  //         ctx.drawImage(image2, 100, 100);

  //         image3.onload = function () {
  //           // Draw the third image on top of the second
  //           ctx.drawImage(image3, 150, 150);
  //         };
  //       };
  //     };
  //   }
  // };
  return (
    // <main>
    //   <button
    //     onClick={draw}
    //   >click now</button>
    //   <canvas id="myCanvas"></canvas>
    // </main>
    <main className="flex flex-col p-8 md:flex-row-reverse">
      {/* <button onClick={exportImag}>click</button> */}
      <div
        ref={elementRef}
        className="mx-auto w-full max-w-[450px] h-[450px] relative md:sticky md:top-20"
      >
        <Image alt="" src={profile[0]} fill className="w-full h-full" />
        <Image alt="" src={profile[1]} fill className="w-full h-full" />
        <Image alt="" src={profile[2]} fill className="w-full h-full" />
        <Image alt="" src={profile[3]} fill className="w-full h-full" />
        <Image alt="" src={profile[6]} fill className="w-full h-full" />
        {profile[5] && (
          <Image alt="" src={profile[5]} fill className="w-full h-full" />
        )}
        {profile[4] && (
          <Image src={profile[4]} alt="" fill className="w-full h-full" />
        )}
        {profile[7] && (
          <Image src={profile[7]} alt="" fill className="w-full h-full" />
        )}
        {profile[8] && (
          <Image src={profile[8]} alt="" fill className="w-full h-full" />
        )}
      </div>
      <div className="grid md:w-[50vw] gap-4 mt-8 ">
        {FEATURES.map((feat, idx) => {
          const { type, assets, name } = feat;
          return (
            <div className="w-[450px]" key={idx}>
              {name}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {assets.map((img, i) => {
                  return (
                    <div className="bg-stone-200 overflow-clip rounded-[8px]">
                      <img
                        className="cursor-pointer rounded-[8px]"
                        onClick={() => selectImage(type, img)}
                        key={img}
                        src={img}
                        alt=""
                      />
                    </div>
                  );
                })}
                {type === 8 || type === 7 || type === 5 || type === 4 ? (
                  <div
                    onClick={() => removeFeature(type)}
                    className="bg-stone-200  cursor-pointer opacity-75 p-8 overflow-clip rounded-[8px]"
                  >
                    <img src="/remove.png" alt="" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
