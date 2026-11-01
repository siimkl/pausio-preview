import Image, { type StaticImageData } from "next/image";
import boxLargeCutout from "@/public/products/box-l.png";
import boxMediumCutout from "@/public/products/box-m.png";
import boxSmallCutout from "@/public/products/box-s.png";
import boxLargeContext from "@/public/products/box-l-context.png";
import boxMediumContext from "@/public/products/box-m-context.png";
import boxSmallContext from "@/public/products/box-s-context.png";
import timerLock from "@/public/products/timer-lock.png";
import { cn } from "@/lib/utils";

type VisualSize = "lock" | "s" | "m" | "l" | "family";

const productImages: Record<Exclude<VisualSize, "family">, { src: StaticImageData; alt: string }> = {
  lock: { src: timerLock, alt: "Silver electronic timer padlock with an LCD display" },
  s: { src: boxSmallContext, alt: "Compact small lockbox beside a smartphone and coffee mug for scale" },
  m: { src: boxMediumContext, alt: "Medium lockbox beside books and a game controller for scale" },
  l: { src: boxLargeContext, alt: "Large lockbox on the floor beside a sofa cushion for scale" },
};

export function ProductVisual({ size, className, priority = false }: { size: VisualSize; className?: string; priority?: boolean }) {
  if (size === "family") {
    return (
      <figure className={cn("product-visual product-visual--family", className)} aria-label="Pausio.eu product family">
        <Image className="family-box family-box--large" src={boxLargeCutout} alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} sizes="(max-width: 760px) 80vw, 36vw" />
        <Image className="family-box family-box--medium" src={boxMediumCutout} alt="" loading={priority ? "eager" : "lazy"} sizes="(max-width: 760px) 58vw, 28vw" />
        <Image className="family-box family-box--small" src={boxSmallCutout} alt="" loading={priority ? "eager" : "lazy"} sizes="(max-width: 760px) 45vw, 20vw" />
        <Image className="family-lock" src={timerLock} alt="Silver timer padlock and three compatible striped storage-box sizes" loading={priority ? "eager" : "lazy"} sizes="(max-width: 760px) 20vw, 9vw" />
      </figure>
    );
  }

  const image = productImages[size];
  return (
    <figure className={cn("product-visual", size !== "lock" && "product-visual--context", className)}>
      <Image className="product-visual__image" src={image.src} alt={image.alt} loading={priority ? "eager" : "lazy"} sizes="(max-width: 760px) 100vw, 50vw" />
    </figure>
  );
}
