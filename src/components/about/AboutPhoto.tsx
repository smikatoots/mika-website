import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function AboutPhoto({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority,
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={`h-full w-full object-cover ${className}`}
      sizes={sizes}
      unoptimized
      priority={priority}
    />
  );
}
