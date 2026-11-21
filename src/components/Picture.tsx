import images from '@/data/images.json';

type Key = keyof typeof images;
type Img = { width: number; height: number; widths?: number[]; blur?: string };

export function Picture({
  name,
  alt,
  sizes = '100vw',
  className,
  priority = false,
  style,
}: {
  name: Exclude<Key, 'logo'>;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const img = images[name] as Img;
  const widths = img.widths ?? [img.width];
  const set = (ext: string) => widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `/img/${name}-${widths[Math.min(1, widths.length - 1)]}.webp`;
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        style={{ backgroundImage: img.blur ? `url(${img.blur})` : undefined, backgroundSize: 'cover', ...style }}
      />
    </picture>
  );
}
